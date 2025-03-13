import generateBaseCSS from './generate_base_css.js'
import validKeyframes from '../errors/valid_keyframe.js'

const generateKeyframeCSS = (keyframes) => {
    const keyframeBlocks = []
    const keyframeMap = {}

    Object.entries(keyframes).forEach(([key, value]) => {
        // console.log(key)

        const validValue = validKeyframes(value)

        Object.entries(validValue).forEach(([innerKey, innerValue]) => {
            if (innerKey === 'name') {
                return keyframeBlocks.push(`@keyframes ${innerValue} { `)
                // keyframeBlocks.push(` ${innerValue} {`)
            }
            // keyframeBlocks.push
            let processedKey = innerKey

            if (innerKey === 'from') processedKey = 0

            if (innerKey === 'to') processedKey = 100
            keyframeMap[processedKey] = innerValue
        })
    })
    Object.entries(keyframeMap).forEach(([key, value]) => {
        const content = generateBaseCSS(value)
        keyframeBlocks.push(`
${key}% {
${content}
}`)
    })
    if (keyframeBlocks.length > 0) {
        keyframeBlocks.push(`
    }`)
    }

    // console.log(keyframeBlocks.join('\n'))
    return keyframeBlocks.join('\n')
}

export default generateKeyframeCSS
