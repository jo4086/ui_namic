import generateBaseCSS from '../utils/generate_base_css.js'
import generatePseudoCSS from '../utils/generate_pseudo_css.js'
import generateDynamicCSS from '../utils/generate_dynamic_css.js'
import generateKeyframeCSS from '../utils/generate_keyframe_css.js'

const styledCore = (props) => {
    const stylesProps = props

    const objectMap = {
        dynamic: 'dynamicProps',
        keyframe: 'keyframeProps',
        media: 'mediaProps',
    }

    // console.log('전달완료:',props)
    // console.log('전달완료:', stylesProps)

    const { dynamicProps, pseudoProps, keyframeProps, mediaProps, stringProps } = Object.entries(stylesProps).reduce(
        (acc, [key, value]) => {
            if (typeof value === 'object') {
                const target = objectMap[key] || 'pseudoProps'
                acc[target][key] = value
            } else {
                acc.stringProps[key] = value
            }
            return acc
        },
        { keyframeProps: {}, pseudoProps: {}, mediaProps: {}, dynamicProps: {}, stringProps: {} }
    )

    // const dynamicProps = {}
    // const objectProps = {}
    // const stringProps = {}

    // Object.entries(stylesProps).forEach(([key, value]) => {
    //     if (typeof value === 'object') {
    //         key === 'dynamic' ? (dynamicProps[key] = value) : (objectProps[key] = value)
    //     } else {
    //         stringProps[key] = value
    //     }
    // })
    // console.log('objectProps: ', objectProps)

    const dynamicCSS = generateDynamicCSS(dynamicProps)
    const baseCSS = generateBaseCSS(stringProps)
    const pseudoCSS = generatePseudoCSS(pseudoProps)
    const keyframesCSS = generateKeyframeCSS(keyframeProps)

    const finalCSS = [baseCSS, keyframesCSS, pseudoCSS, dynamicCSS].join('\n')

    console.log(finalCSS)
    return finalCSS
}

export default styledCore

//      const { objectProps, dynamicProps, pseudoProps, keyframeProps, mediaProp    s, stringProps } = Object.entries(stylesProps).reduce((acc, [key, value]) =>     {
//  12         if (typeof value === 'object') {
//  13             key ===
//  14         }
//  15     })

/*
const filterMap = {
    keyframe: 'keyframeProps',
    media: 'mediaProps',
}

*/
