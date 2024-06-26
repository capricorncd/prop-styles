import { it, expect, describe } from 'vitest'
import { createPropStyles } from '../src'

describe('libs/style createPropStyles', () => {
  it('default', () => {
    expect(createPropStyles({})).toStrictEqual({})
  })

  it('width', () => {
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
    })
  })

  it('flex', () => {
    expect(createPropStyles({ flex: false })).toStrictEqual({})
    expect(createPropStyles({ flex: true })).toStrictEqual({ display: 'flex' })
  })

  it('grid', () => {
    expect(createPropStyles({ grid: false })).toStrictEqual({})
    expect(createPropStyles({ grid: true })).toStrictEqual({ display: 'grid' })
  })

  it('inlineFlex', () => {
    expect(createPropStyles({ inlineFlex: false })).toStrictEqual({})
    expect(createPropStyles({ inlineFlex: true })).toStrictEqual({
      display: 'inline-flex',
    })
  })

  it('inlineBlock', () => {
    expect(createPropStyles({ inlineBlock: false })).toStrictEqual({})
    expect(createPropStyles({ inlineBlock: true })).toStrictEqual({
      display: 'inline-block',
    })
  })

  it('inline', () => {
    expect(createPropStyles({ inline: false })).toStrictEqual({})
    expect(createPropStyles({ inline: true })).toStrictEqual({
      display: 'inline',
    })
  })

  it('padding', () => {
    expect(
      createPropStyles({
        padding: 10,
        paddingTop: '10em',
        paddingBottom: 10,
        paddingLeft: '10em',
        paddingRight: 10,
        paddingInline: '10em',
        paddingBlock: 10,
      })
    ).toStrictEqual({
      padding: '10px',
      paddingTop: '10em',
      paddingBottom: '10px',
      paddingLeft: '10em',
      paddingRight: '10px',
      paddingInline: '10em',
      paddingBlock: '10px',
    })
  })

  it('p', () => {
    expect(
      createPropStyles({
        p: 10,
        pt: '10em',
        pb: 10,
        pl: '10em',
        pr: 10,
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
    })
  })

  it('margin', () => {
    expect(
      createPropStyles({
        margin: 10,
        marginTop: '10em',
        marginBottom: 10,
        marginLeft: '10em',
        marginRight: 10,
        marginInline: '10em',
        marginBlock: 10,
      })
    ).toStrictEqual({
      margin: '10px',
      marginTop: '10em',
      marginBottom: '10px',
      marginLeft: '10em',
      marginRight: '10px',
      marginInline: '10em',
      marginBlock: '10px',
    })
  })

  it('m', () => {
    expect(
      createPropStyles({
        m: 10,
        mt: '10em',
        mb: 10,
        ml: '10em',
        mr: 10,
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
    })
  })

  it('gap, lineHeight', () => {
    expect(
      createPropStyles({
        gap: 10,
        fontSize: 20,
        lineHeight: '1em',
      })
    ).toStrictEqual({
      gap: '10px',
      fontSize: '20px',
      lineHeight: '1em',
    })
  })

  it('lh', () => {
    expect(
      createPropStyles({
        lh: '1em',
      })
    ).toStrictEqual({
      lineHeight: '1em',
    })
  })

  it('radius', () => {
    expect(createPropStyles({ radius: 20 })).toStrictEqual({
      borderRadius: '20px',
    })
  })

  it('align/justify', () => {
    expect(
      createPropStyles({
        align: 'center',
        justify: 'flex-end',
        alignContent: 'end',
        justifyItems: 'start',
      })
    ).toStrictEqual({
      alignItems: 'center',
      justifyContent: 'flex-end',
      alignContent: 'end',
      justifyItems: 'start',
    })
    expect(
      createPropStyles({
        ai: 'center',
        jc: 'flex-end',
        ac: 'end',
        ji: 'start',
      })
    ).toStrictEqual({
      alignItems: 'center',
      justifyContent: 'flex-end',
      alignContent: 'end',
      justifyItems: 'start',
    })
    expect(createPropStyles({ align: 'start' })).toStrictEqual({
      alignItems: 'start',
    })
  })

  it('column', () => {
    expect(createPropStyles({ column: false })).toStrictEqual({})
    expect(createPropStyles({ column: true })).toStrictEqual({
      flexDirection: 'column',
    })
  })

  it('wrap', () => {
    expect(createPropStyles({ wrap: false })).toStrictEqual({})
    expect(createPropStyles({ wrap: true })).toStrictEqual({
      flexWrap: 'wrap',
    })
    expect(createPropStyles({ wrap: 'revert' })).toStrictEqual({
      flexWrap: 'revert',
    })
  })

  it('breakWord', () => {
    expect(createPropStyles({ breakWord: false })).toStrictEqual({})
    expect(createPropStyles({ breakWord: true })).toStrictEqual({
      overflowWrap: 'break-word',
    })
  })

  it('bold', () => {
    expect(createPropStyles({ bold: false })).toStrictEqual({})
    expect(createPropStyles({ bold: true })).toStrictEqual({
      fontWeight: 'bold',
    })
  })

  it('thin', () => {
    expect(createPropStyles({ thin: false })).toStrictEqual({})
    expect(createPropStyles({ thin: true })).toStrictEqual({
      fontWeight: '500',
    })
  })

  it('nowrap', () => {
    expect(createPropStyles({ nowrap: false })).toStrictEqual({})
    expect(createPropStyles({ nowrap: true })).toStrictEqual({
      whiteSpace: 'nowrap',
    })
  })

  it('whiteSpace', () => {
    expect(createPropStyles({ whiteSpace: 'nowrap' })).toStrictEqual({
      whiteSpace: 'nowrap',
    })
  })

  it('fontWeight', () => {
    expect(createPropStyles({ fontWeight: '100' })).toStrictEqual({
      fontWeight: '100',
    })
    expect(createPropStyles({ fontWeight: 'lighter' })).toStrictEqual({
      fontWeight: 'lighter',
    })
  })

  it('fw', () => {
    expect(createPropStyles({ fw: '100' })).toStrictEqual({
      fontWeight: '100',
    })
    expect(createPropStyles({ fw: 'bolder' })).toStrictEqual({
      fontWeight: 'bolder',
    })
  })

  it('fs', () => {
    expect(createPropStyles({ fs: 20 })).toStrictEqual({ fontSize: '20px' })
    expect(createPropStyles({ fs: '2rem' })).toStrictEqual({ fontSize: '2rem' })
  })

  it('color', () => {
    expect(createPropStyles({ color: 'red' })).toStrictEqual({ color: 'red' })
    expect(createPropStyles({ color: '#fff' })).toStrictEqual({ color: '#fff' })
    expect(createPropStyles({ color: 'rgb(2 2 2)' })).toStrictEqual({
      color: 'rgb(2 2 2)',
    })
    expect(createPropStyles({ color: 'hsl(1deg 100% 100%)' })).toStrictEqual({
      color: 'hsl(1deg 100% 100%)',
    })
  })

  it('background/bg', () => {
    expect(createPropStyles({ background: 'red' })).toStrictEqual({
      background: 'red',
    })
    expect(createPropStyles({ background: '#fff' })).toStrictEqual({
      background: '#fff',
    })
    expect(createPropStyles({ background: 'rgb(2 2 2)' })).toStrictEqual({
      background: 'rgb(2 2 2)',
    })
    expect(
      createPropStyles({ background: 'hsl(1deg 100% 100%)' })
    ).toStrictEqual({
      background: 'hsl(1deg 100% 100%)',
    })

    expect(createPropStyles({ bg: '#fff' })).toStrictEqual({
      background: '#fff',
    })

    expect(createPropStyles({ bg: '#fff', background: 'red' })).toStrictEqual({
      background: 'red',
    })

    expect(createPropStyles({ background: 'red', bg: '#fff' })).toStrictEqual({
      background: '#fff',
    })
  })

  it('scroll', () => {
    expect(createPropStyles({ scroll: false })).toStrictEqual({})
    expect(createPropStyles({ scroll: true })).toStrictEqual({
      overflow: 'auto',
    })
    expect(createPropStyles({ scroll: 'x' })).toStrictEqual({
      overflowX: 'auto',
    })
    expect(createPropStyles({ scroll: 'y' })).toStrictEqual({
      overflowY: 'auto',
    })
  })

  it('border', () => {
    expect(createPropStyles({ border: '1px solid red' })).toStrictEqual({
      border: '1px solid red',
    })
    expect(createPropStyles({ border: '#fff' })).toStrictEqual({
      borderColor: '#fff',
    })
    expect(createPropStyles({ border: 10 })).toStrictEqual({
      borderWidth: '10px',
    })
    expect(createPropStyles({ border: '10' })).toStrictEqual({
      borderWidth: '10px',
    })
    expect(createPropStyles({ border: '10px' })).toStrictEqual({
      borderWidth: '10px',
    })
  })

  it('tempColumns/tempRows/gtc/gtr', () => {
    expect(
      createPropStyles({
        tempColumns: '1 2',
        tempRows: 1,
      })
    ).toStrictEqual({
      gridTemplateColumns: '1fr 2fr',
      gridTemplateRows: '1fr',
    })

    expect(
      createPropStyles({
        tempColumns: 1,
        tempRows: '1 auto 2',
      })
    ).toStrictEqual({
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr auto 2fr',
    })

    expect(
      createPropStyles({
        gtc: 1,
        gtr: '1 auto 2',
      })
    ).toStrictEqual({
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr auto 2fr',
    })
  })

  it('textAlign/ta', () => {
    expect(
      createPropStyles({
        textAlign: 'right',
      })
    ).toStrictEqual({
      textAlign: 'right',
    })

    expect(
      createPropStyles({
        ta: 'center',
      })
    ).toStrictEqual({
      textAlign: 'center',
    })
  })

  it('position', () => {
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
    })

    expect(
      createPropStyles({
        position: 'fixed',
        z: 10,
        t: 20,
        r: 10,
        b: 39,
        l: 20,
      })
    ).toStrictEqual({
      position: 'fixed',
      zIndex: '10',
      top: '20px',
      right: '10px',
      bottom: '39px',
      left: '20px',
    })
  })

  it('inset', () => {
    expect(
      createPropStyles({
        inset: 10,
      })
    ).toStrictEqual({
      inset: '10px',
    })
  })

  it('transform', () => {
    expect(
      createPropStyles({
        transform: 'rotate(30deg)',
      })
    ).toStrictEqual({
      transform: 'rotate(30deg)',
    })
    expect(
      createPropStyles({
        tf: 'rotate(30deg)',
      })
    ).toStrictEqual({
      transform: 'rotate(30deg)',
    })
  })
})
