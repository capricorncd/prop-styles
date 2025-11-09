#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(new URL(import.meta.url).pathname, '..', '..');

const argv = process.argv.slice(2);

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (arg === '--dry-run') out.dry = true;
    else if (arg.startsWith('--packages='))
      out.packages = arg.split('=')[1].split(',');
    else if (arg.startsWith('--bump=')) out.bump = arg.split('=')[1];
    else if (arg.startsWith('--set=')) out.set = arg.split('=')[1];
    else if (arg.startsWith('--suffix=')) out.suffix = arg.split('=')[1];
    else if (arg === '--help' || arg === '-h') out.help = true;
  }
  return out;
}

function usage() {
  console.log(`
Usage: node scripts/update-version.mjs [--packages=core,vue] [--bump=major|minor|patch] [--set=1.2.3] [--suffix=beta] [--dry-run]

Examples:
  npm run uv -- --bump=patch       # bump patch for all libs
  npm run uv -- --packages=core,vue --bump=minor --suffix=beta
  npm run uv -- --set=1.2.3        # set exact version for all libs
  npm run uv -- --packages=@prop-styles/core --bump=major --suffix=rc

Notes:
  - When bumping major, minor and patch are reset to 0. When bumping minor, patch resets to 0.
  - --suffix will append the value to version number, e.g. 1.0.0-beta
`);
}

function parseVersion(v) {
  const raw = String(v);
  const m = raw.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!m) return { major: 0, minor: 0, patch: 0, raw };
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: Number(m[3]),
    pre: m[4],
    raw,
  };
}

function fmtVersion({ major, minor, patch, pre = '' }) {
  return `${major}.${minor}.${patch}${pre ? '-' + pre : ''}`;
}

async function readJson(file) {
  const txt = await fs.readFile(file, 'utf8');
  return JSON.parse(txt);
}

async function writeJson(file, obj, dry) {
  const txt = JSON.stringify(obj, null, 2) + '\n';
  if (dry) {
    console.log(`[dry] would write ${file} with version ${obj.version}`);
  } else {
    await fs.writeFile(file, txt, 'utf8');
    console.log(`Updated ${file}`);
  }
}

async function main() {
  const opts = parseArgs(argv);
  if (opts.help) return usage();

  const libsDir = path.join(ROOT, 'libs');
  const entries = await fs.readdir(libsDir, { withFileTypes: true });
  const pkgDirs = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      const pkgPath = path.join(libsDir, e.name, 'package.json');
      try {
        await fs.access(pkgPath);
        pkgDirs.push({ name: e.name, pkgPath });
      } catch (e) {
        // ignore
      }
    }
  }

  // read all package.jsons
  const packages = [];
  for (const pd of pkgDirs) {
    const pkg = await readJson(pd.pkgPath);
    packages.push({ dirName: pd.name, pkgPath: pd.pkgPath, pkg });
  }

  // determine targets
  let targets = packages;
  if (opts.packages && opts.packages.length) {
    const want = new Set(opts.packages.map((s) => s.trim()));
    targets = packages.filter(
      (p) => want.has(p.dirName) || want.has(p.pkg.name)
    );
  }
  if (!targets.length) {
    console.log('No target packages found to update.');
    return;
  }

  for (const t of targets) {
    const cur = t.pkg.version || '0.0.0';
    let newVer = cur;
    if (opts.set) {
      const v = parseVersion(opts.set);
      v.pre = opts.suffix || '';
      newVer = fmtVersion(v);
    } else if (opts.bump) {
      const v = parseVersion(cur);
      if (opts.bump === 'major') {
        v.major += 1;
        v.minor = 0;
        v.patch = 0;
      } else if (opts.bump === 'minor') {
        v.minor += 1;
        v.patch = 0;
      } else {
        v.patch += 1;
      }
      v.pre = opts.suffix || '';
      newVer = fmtVersion(v);
    } else {
      console.log(`No --set or --bump provided for ${t.pkg.name}, skipping.`);
      continue;
    }

    console.log(`Updating ${t.pkg.name}: ${cur} -> ${newVer}`);
    t.pkg.version = newVer;
    await writeJson(t.pkgPath, t.pkg, opts.dry);

    // update references in other packages
    for (const other of packages) {
      let changed = false;
      [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
      ].forEach((field) => {
        if (!other.pkg[field]) return;
        for (const dep of Object.keys(other.pkg[field])) {
          if (dep === t.pkg.name) {
            other.pkg[field][dep] = newVer;
            changed = true;
          }
        }
      });
      if (changed) {
        await writeJson(other.pkgPath, other.pkg, opts.dry);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
