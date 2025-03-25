import { styleFromatter } from '../utils/formatUtils.js'
import { pseudoClassSet, pseudoElementSet } from '../constants/'
import { camelToKebab } from '../utils/caseConverter.js'
import { forEachObject, forEachNestedObject } from './utils/callback.js'

const animationSet = new Set(['animation'])
const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

function styledCore(props) {
    const { dynamic, keyframes, media, pseudo, ...rest } = props

    buildKeyframesBundle(keyframes)
}

export default styledCore

function buildKeyframesBundle(keyframes) {
    /**
     * buildKeyframesBundle - Generates CSS animation and @keyframes from JS object input.
     *
     * 🔹 Main Function
     *   - keyframesAnalyze
     *
     * 🔸 Sub Function
     *   - exAnimation
     *   - nonAnimation
     *   - generateKeyframesCss
     *
     * 🔧 Assist Item
     *   - animationPropertyList
     *   - animationPropertySet
     *   - easingSet
     */

    const exAnimation = (name, value) => {
        const animation = `${name} ${value.animation}`

        return animation
    }

    const nonAnimation = (name, value) => {
        const animationProperty = {}

        forEachObject(value, (innerKey, innerValue) => {
            if (animationPropertySet.has(innerKey)) {
                animationProperty[innerKey] = innerValue
            }
        })

        const orderedValues = animationPropertyList.map((key) => animationProperty[key]).filter((value) => value !== undefined)

        const animation = [name, ...orderedValues].join(' ')

        return animation
    }

    const generateKeyframesCss = (obj) => {
        const result = {}

        forEachNestedObject(obj, (animationName, percent, styles) => {
            const propertyArray = []

            forEachObject(styles, (propKey, propValue) => {
                let patchKey

                if (easingSet.has(propKey)) {
                    patchKey = 'animationTimingFunction'
                } else {
                    patchKey = propKey
                }

                const kebabKey = camelToKebab(patchKey)
                propertyArray.push(`${kebabKey}: ${propValue};`)
            })

            const block = `    ${percent}% {\n        ${propertyArray.join('\n        ')}\n    }`

            if (!result[animationName]) result[animationName] = []
            result[animationName].push(block)
        })

        const patchResult = Object.entries(result)
            .map(([name, blocks]) => `@keyframes ${name} {\n${blocks.join('\n')}\n}`)
            .join('\n\n')

        return patchResult
    }

    function keyframesAnalyze(obj) {
        const animationArray = []
        const patchKeyframes = {}

        forEachObject(obj, (key, value) => {
            const getAnimation = typeof value.animation === 'string' ? exAnimation(key, value) : nonAnimation(key, value)

            animationArray.push(getAnimation)

            patchKeyframes[key] = value.percent
        })

        const animation = 'animation: ' + animationArray.join(', ')
        const css = generateKeyframesCss(patchKeyframes)

        console.log('%cAnimation', 'font-weight:bold', '\n' + animation)
        console.log('%cCSS', 'font-weight:bold', '\n' + css)

        return { animation, css }
    }

    const { animation, css } = keyframesAnalyze(keyframes)

    return { animation, css }
}

const specialKeySet = new Set(['pseudo', 'media', 'keyframes'])

const specialKeySplit = (props) => {
    const result = { pseudoProps: {}, mediaProps: {}, keyframesProps: {} }
    const map = {
        pseudo: result.pseudoProps,
        media: result.mediaProps,
        keyframes: result.keyframesProps,
    }

    // console.log('map:', map)

    for (const [key, value] of Object.entries(props)) {
        if (specialKeySet.has(key)) {
            map[key][key] = value
        }
    }

    const filteredResult = Object.fromEntries(Object.entries(result).filter(([_, value]) => Object.keys(value).length > 0))

    return filteredResult
}

const typeChecker = (data, { type = null }) => {
    switch (type) {
        case 'object':
            return typeof data === 'object' && data !== null && !Array.isArray(data)
        case 'array':
            return Array.isArray(data)
        case 'string':
            return typeof data === 'string'
        default:
            return false
    }
}

const objectToCss = (obj) => {
    const result = Object.entries(obj).map(([key, value]) => {
        const cssKey = camelToKebab(key)
        return `${cssKey}: ${value};`
    })

    return result.join(`\n`)
}

const dynamicKey = (obj) => {
    const { primitiveProps, referenceProps } = dataType(obj)

    const { pseudoProps = null, mediaProps = null, keyframesProps = null } = specialKeySplit(referenceProps)

    const string = objectToCss(primitiveProps)
}

const dataType = (formatData) => {
    const primitiveProps = {}
    const referenceProps = {}

    for (const [key, value] of Object.entries(formatData)) {
        if (typeof value === 'string') {
            primitiveProps[key] = value
        } else {
            referenceProps[key] = value
        }
    }

    return { primitiveProps, referenceProps }
}

const pseudoType = (obj) => {
    console.log('obj:', obj)
}

/* 
    const objectMap = {
        dynamic: 'dynamicProps',
        keyframe: 'keyframeProps',
        media: 'mediaProps',
    }

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

    const dynamicCSS = generateDynamicCSS(dynamicProps)
    const baseCSS = generateBaseCSS(stringProps)
    const pseudoCSS = generatePseudoCSS(pseudoProps)
    const keyframesCSS = generateKeyframeCSS(keyframeProps)

    const finalCSS = [baseCSS, keyframesCSS, pseudoCSS, dynamicCSS].join('\n')

    return finalCSS */

/* 
    
    
     let dynamicString
    let dynamicPseudo
    let dynamicMedia
    let dynamicKeyframes

    function mediaDestructuring(props) {
        const { self, down, up } = props
        // console.log(self)
        // console.log(down)
        // console.log(up)
    }

    mediaDestructuring(media)


    function dynamicDestructuring(dynamic) {
        const { primitiveProps, referenceProps } = dataType(dynamic)

        dynamicString = objectToCss(primitiveProps)
    }

    const isString = typeChecker(rest, { type: 'object' })

    const string = objectToCss(rest)
    dynamicKey(dynamic)
    */
