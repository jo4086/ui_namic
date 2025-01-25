import generateBaseCSS from '../utils/generate_base_css.js'
import generatePseudoCSS from '../utils/generate_pseudo_css.js'
import generateDynamicCSS from '../utils/generate_dynamic_css.js'
import generateKeyframeCSS from '../utils/generate_keyframe_css.js'

const objectMap = {
    dynamic: 'dynamicProps',
    keyframe: 'keyframeProps',
    media: 'mediaProps',
}

const styledCore = (props) => {
    const stylesProps = props

    // console.log('전달완료:',props)
    console.log('전달완료:', stylesProps)

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
        { keyframeProps: {}, pseudoProps: {}, mediaProps: {}, dnynamicProps: {}, stringProps: {} },
    )

    const dynamicCSS = generateDynamicCSS(dynamicProps)
    const baseCSS = generateBaseCSS(stringProps)
    const pseudoCSS = generatePseudoCSS(pseudoProps)
    generateKeyframeCSS(keyframeProps)

    const finalCSS = [baseCSS, pseudoCSS, dynamicCSS].join('\n')

    // console.log(finalCSS)
    return finalCSS
}

export default styledCore
