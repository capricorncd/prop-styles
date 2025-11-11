import { it, expect, describe } from 'vitest';
import { createPropStyles } from '../src';

describe('libs/style createPropStyles', () => {
  it('default', () => {
    expect(createPropStyles({})).toStrictEqual({});
  });

  it('display', () => {
    expect(createPropStyles({ display: 'block' })).toStrictEqual({
      display: 'block',
    });
    expect(createPropStyles({ display: 'inline' })).toStrictEqual({
      display: 'inline',
    });
    expect(createPropStyles({ display: 'flex' })).toStrictEqual({
      display: 'flex',
    });

    expect(
      createPropStyles(
        { display: { xs: 'block', default: 'flex' } },
        {},
        {
          breakpoint: 'xs',
        }
      )
    ).toStrictEqual({
      display: 'block',
    });

    expect(
      createPropStyles(
        { display: { xs: 'block', default: 'flex' } },
        {},
        {
          breakpoint: 'sm',
        }
      )
    ).toStrictEqual({
      display: 'flex',
    });

    expect(
      createPropStyles({ display: { xs: 'block', default: 'flex' } })
    ).toStrictEqual({
      display: 'flex',
    });
  });

  it('inline', () => {
    expect(createPropStyles({ inline: true })).toStrictEqual({
      display: 'inline',
    });
  });

  it('width/height', () => {
    expect(
      createPropStyles({
        width: 10,
        minWidth: 10,
        maxWidth: '10rem',
        height: 10,
        minHeight: '10rem',
        maxHeight: 10,
      })
    ).toStrictEqual({
      width: '10px',
      minWidth: '10px',
      maxWidth: '10rem',
      height: '10px',
      minHeight: '10rem',
      maxHeight: '10px',
    });
  });

  it('flex', () => {
    expect(
      createPropStyles({
        flex: 1,
      })
    ).toStrictEqual({
      flex: '1',
    });
    expect(
      createPropStyles({
        flex: '0 0 100%',
      })
    ).toStrictEqual({
      flex: '0 0 100%',
    });

    expect(createPropStyles({ flex: true })).toStrictEqual({
      display: 'flex',
    });
  });

  it('gap', () => {
    expect(
      createPropStyles({
        gap: 10,
        fs: 20,
        lh: '1em',
      })
    ).toStrictEqual({
      gap: '10px',
      fontSize: '20px',
      lineHeight: '1em',
    });
  });

  it('column/fd/ai/ac/ji/jc/wrap', () => {
    expect(createPropStyles({ column: false })).toStrictEqual({});
    expect(createPropStyles({ column: true })).toStrictEqual({
      flexDirection: 'column',
    });

    expect(
      createPropStyles({
        fd: 'column',
        ai: 'center',
        jc: 'flex-end',
        ac: 'end',
        ji: 'start',
        wrap: true,
      })
    ).toStrictEqual({
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      alignContent: 'end',
      justifyItems: 'start',
      flexWrap: 'wrap',
    });
    expect(
      createPropStyles({ column: true, ai: 'start', wrap: true })
    ).toStrictEqual({
      flexDirection: 'column',
      alignItems: 'start',
      flexWrap: 'wrap',
    });

    expect(createPropStyles({ wrap: 'wrap-reverse' })).toStrictEqual({
      flexWrap: 'wrap-reverse',
    });

    expect(createPropStyles({ wrap: false })).toStrictEqual({});
    expect(createPropStyles({ wrap: true })).toStrictEqual({
      flexWrap: 'wrap',
    });
    expect(createPropStyles({ wrap: 'revert' })).toStrictEqual({
      flexWrap: 'revert',
    });
  });

  it('ws', () => {
    expect(createPropStyles({ ws: 'pre-wrap' })).toStrictEqual({
      whiteSpace: 'pre-wrap',
    });

    expect(createPropStyles({ ws: 'nowrap' })).toStrictEqual({
      whiteSpace: 'nowrap',
    });
  });

  it('p', () => {
    expect(
      createPropStyles({
        p: 10,
        pt: '10em',
        pr: 10,
        pb: 10,
        pl: '10em',
        px: '10em',
        py: 10,
      })
    ).toStrictEqual({
      padding: '10px',
      paddingTop: '10em',
      paddingBottom: '10px',
      paddingLeft: '10em',
      paddingRight: '10px',
      paddingInline: '10em',
      paddingBlock: '10px',
    });
  });

  it('m', () => {
    expect(
      createPropStyles({
        m: 10,
        mt: '10em',
        mr: 10,
        mb: 10,
        ml: '10em',
        mx: '10em',
        my: 10,
      })
    ).toStrictEqual({
      margin: '10px',
      marginTop: '10em',
      marginBottom: '10px',
      marginLeft: '10em',
      marginRight: '10px',
      marginInline: '10em',
      marginBlock: '10px',
    });
  });

  it('radius', () => {
    expect(createPropStyles({ radius: 20 })).toStrictEqual({
      borderRadius: '20px',
    });
  });

  it('fs', () => {
    expect(createPropStyles({ fs: 20 })).toStrictEqual({ fontSize: '20px' });
    expect(createPropStyles({ fs: '2rem' })).toStrictEqual({
      fontSize: '2rem',
    });
  });

  it('fw', () => {
    expect(createPropStyles({ fw: 'bold' })).toStrictEqual({
      fontWeight: 'bold',
    });
    expect(createPropStyles({ fw: '100' })).toStrictEqual({
      fontWeight: '100',
    });
    expect(createPropStyles({ fw: 'lighter' })).toStrictEqual({
      fontWeight: 'lighter',
    });
    expect(createPropStyles({ fw: 'bolder' })).toStrictEqual({
      fontWeight: 'bolder',
    });
  });

  it('lh', () => {
    expect(
      createPropStyles({
        lh: '1em',
      })
    ).toStrictEqual({
      lineHeight: '1em',
    });
  });

  it('color', () => {
    expect(createPropStyles({ color: 'red' })).toStrictEqual({ color: 'red' });
    expect(createPropStyles({ color: '#fff' })).toStrictEqual({
      color: '#fff',
    });
    expect(createPropStyles({ color: 'rgb(2 2 2)' })).toStrictEqual({
      color: 'rgb(2 2 2)',
    });
    expect(createPropStyles({ color: 'hsl(1deg 100% 100%)' })).toStrictEqual({
      color: 'hsl(1deg 100% 100%)',
    });

    expect(createPropStyles({ color: '--color-primary' })).toStrictEqual({
      color: 'var(--color-primary)',
    });
  });

  it('bg', () => {
    expect(createPropStyles({ bg: '#fff' })).toStrictEqual({
      background: '#fff',
    });

    expect(createPropStyles({ bg: '--color-primary' })).toStrictEqual({
      background: 'var(--color-primary)',
    });
  });

  it('scroll', () => {
    expect(createPropStyles({ scroll: false })).toStrictEqual({});
    expect(createPropStyles({ scroll: true })).toStrictEqual({
      overflow: 'auto',
    });
    expect(createPropStyles({ scroll: 'x' })).toStrictEqual({
      overflowX: 'auto',
    });
    expect(createPropStyles({ scroll: 'y' })).toStrictEqual({
      overflowY: 'auto',
    });
  });

  it('breakWord', () => {
    expect(createPropStyles({ breakWord: false })).toStrictEqual({});
    expect(createPropStyles({ breakWord: true })).toStrictEqual({
      overflowWrap: 'break-word',
    });
  });

  it('border', () => {
    expect(createPropStyles({ border: '1px solid red' })).toStrictEqual({
      border: '1px solid red',
    });
    expect(createPropStyles({ border: '#fff' })).toStrictEqual({
      borderColor: '#fff',
    });
    expect(createPropStyles({ border: 10 })).toStrictEqual({
      borderWidth: '10px',
    });
    expect(createPropStyles({ border: '10' })).toStrictEqual({
      borderWidth: '10px',
    });
    expect(createPropStyles({ border: '10px' })).toStrictEqual({
      borderWidth: '10px',
    });

    expect(
      createPropStyles({ border: '1px solid --color-border' })
    ).toStrictEqual({
      border: '1px solid var(--color-border)',
    });
  });

  it('gtc/gtr', () => {
    expect(
      createPropStyles({
        gtc: '1 2',
        gtr: 1,
      })
    ).toStrictEqual({
      gridTemplateColumns: '1fr 2fr',
      gridTemplateRows: '1fr',
    });

    expect(
      createPropStyles({
        gtc: 1,
        gtr: '1 auto 2',
      })
    ).toStrictEqual({
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr auto 2fr',
    });

    expect(
      createPropStyles({
        gtc: 1,
        gtr: '1 auto 2',
      })
    ).toStrictEqual({
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr auto 2fr',
    });
  });

  it('ta', () => {
    expect(
      createPropStyles({
        ta: 'right',
      })
    ).toStrictEqual({
      textAlign: 'right',
    });

    expect(
      createPropStyles({
        ta: 'center',
      })
    ).toStrictEqual({
      textAlign: 'center',
    });
  });

  it('position/top/right/bottom/left/zIndex', () => {
    expect(
      createPropStyles({
        position: 'fixed',
        zIndex: 10,
        top: 20,
        right: 10,
        bottom: 39,
        left: 20,
      })
    ).toStrictEqual({
      position: 'fixed',
      zIndex: '10',
      top: '20px',
      right: '10px',
      bottom: '39px',
      left: '20px',
    });
  });

  it('inset', () => {
    expect(
      createPropStyles({
        inset: 10,
      })
    ).toStrictEqual({
      inset: '10px',
    });
  });

  it('transform', () => {
    expect(
      createPropStyles({
        transform: 'rotate(30deg)',
      })
    ).toStrictEqual({
      transform: 'rotate(30deg)',
    });
    expect(
      createPropStyles({
        transform: 'rotate(30deg)',
      })
    ).toStrictEqual({
      transform: 'rotate(30deg)',
    });
  });

  it('nowrap', () => {
    expect(createPropStyles({ nowrap: true })).toStrictEqual({
      whiteSpace: 'nowrap',
    });
    expect(createPropStyles({ nowrap: false })).toStrictEqual({});
  });

  it('whiteSpace', () => {
    expect(
      createPropStyles({
        whiteSpace: 'nowrap',
      })
    ).toStrictEqual({
      whiteSpace: 'nowrap',
    });
  });

  it('shadow', () => {
    expect(
      createPropStyles({
        shadow: true,
      })
    ).toStrictEqual({
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    });

    expect(
      createPropStyles({
        shadow: '0 2px 4px 0 #300',
      })
    ).toStrictEqual({
      boxShadow: '0 2px 4px 0 #300',
    });
  });
});
