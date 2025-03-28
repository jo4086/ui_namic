// styledCore.js

import camelToKebab from './utils/camelToKebab.js'
import { forEachObject, forEachNestedObject } from './utils/callback.js'
import { getOrCreateStyle } from './utils/styleHash.js'
import { insertStyleOnce } from './utils/insertStyleOnce.js'

const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

function styledCore(props) {
    const { dynamic, keyframes, media, pseudo, ...rest } = props

    // console.log('rest:', rest)

    const generatedClassName = generateClassName(props)

    // console.log('generatedClassName:', generatedClassName)

    const { animation, css } = buildKeyframesBundle(keyframes)
    const cssBlock = buildCssBlock(rest)

    buildMediaBundle(media)

    console.log('cssBlock\n' + cssBlock)
    // console.log('animation:', animation)
    // console.log('css:', css)

    const fullCssText = `${cssBlock}\n\n.${generateClassName} {\n    ${animation}}`

    insertStyleOnce(generateClassName, fullCssText)
}

export default styledCore

const optionList = ['vertical', 'horizontal', 'hover']
const optionMap = {
    vertical: 'orientation: portrait',
    horizontal: 'orientation: landscape',
}

function generateClassName(key) {
    return 'dynamic-' + btoa(key).slice(0, 6)
}

// 3차버전
function buildMediaBundle(media) {
    if (!media) return []

    const positionMap = {
        up: 'min-width',
        down: 'max-width',
    }

    const result = []

    const ensurePx = (value) => (typeof value === 'number' ? `${value}px` : value)

    const processBlock = (type, list) => {
        return list.map((item) => {
            let conditions = []
            let style = { ...item }

            if (type === 'between') {
                const { up, down, ...rest } = item
                if (up) conditions.push(`(min-width: ${ensurePx(up)})`)
                if (down) conditions.push(`(max-width: ${ensurePx(down)})`)
                style = rest
            } else {
                const { point, ...rest } = item
                const condition = `(${positionMap[type]}: ${ensurePx(point)})`
                conditions.push(condition)
                style = rest
            }

            return { condition: conditions, style }
        })
    }

    forEachObject(media, (key, value) => {
        if (key === 'between' || key === 'up' || key === 'down') {
            const blocks = processBlock(key, value)
            result.push(...blocks)
        }

        if (key === 'advanced') {
            const advancedBlocks = value.map(({ query, ...style }) => ({
                condition: [query],
                style,
            }))
            result.push(...advancedBlocks)
        }
    })

    console.log(result)

    return result
}

/* 2차 버전
function buildMediaBundle(media) {
    if (!media) return []

    const positionMap = {
        up: 'min-width',
        down: 'max-width',
    }

    const result = []

    const processBlock = (type, list) => {
        return list.map((item) => {
            let conditions = []
            let style = { ...item }

            if (type === 'between') {
                const { up, down, ...rest } = item
                if (up) conditions.push(`(min-width: ${ensurePx(up)})`)
                if (down) conditions.push(`(max-width: ${ensurePx(down)})`)
                style = rest
            } else {
                const { point, ...rest } = item
                const condition = `(${positionMap[type]}: ${ensurePx(point)})`
                conditions.push(condition)
                style = rest
            }

            return { condition: conditions, style }
        })
    }

    const ensurePx = (value) => (typeof value === 'number' ? `${value}px` : value)

    forEachObject(media, (key, value) => {
        if (key === 'between' || key === 'up' || key === 'down') {
            const blocks = processBlock(key, value)
            result.push(...blocks)
        }
    })

    console.log(result)

    return result
} */

// function buildMediaBundle(media) {
//     if (!media) return []

//     console.log('media.self =>', media.self, '\nmedia.down =>', media.down, '\nmedia.up =>', media.up)

//     const allItems = [...(media.self || []), ...(media.down || []), ...(media.up || [])]

//     const conditionMap = new Map()

//     allItems.forEach((item) => {
//         const { min, max, ...style } = item

//         const key = [min !== undefined ? `min:${min}` : '', max !== undefined ? `max:${max}` : ''].filter(Boolean).join('&')

//         if (!conditionMap.has(key)) {
//             conditionMap.set(key, [])
//         }

//         conditionMap.get(key).push(style)
//     })

//     const result = []

//     for (const [key, styleGroup] of conditionMap.entries()) {
//         const [minPart, maxPart] = key.split('&')
//         const conditions = []
//         if (minPart) conditions.push(`(min-width: ${minPart.split(':')[1]}px)`)
//         if (maxPart) conditions.push(`(max-width: ${maxPart.split(':')[1]}px)`)

//         const mergedStyle = Object.assign({}, ...styleGroup)

//         result.push({
//             condition: conditions.join(' and '),
//             style: mergedStyle,
//         })
//     }

//     console.log('result:', result)

//     return result
// }

function buildCssBlock(string) {
    const blocks = []

    forEachObject(string, (key, value) => {
        const kebabKey = camelToKebab(key)

        const block = `${kebabKey} : ${value};`
        blocks.push(block)
    })

    const result = blocks.join('\n')

    return result
}

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
                let brackPoints

                if (easingSet.has(propKey)) {
                    brackPoints = 'animationTimingFunction'
                } else {
                    brackPoints = propKey
                }

                const kebabKey = camelToKebab(brackPoints)
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
        const brackPointsframes = {}

        forEachObject(obj, (key, value) => {
            const getAnimation = typeof value.animation === 'string' ? exAnimation(key, value) : nonAnimation(key, value)

            animationArray.push(getAnimation)

            brackPointsframes[key] = value.percent
        })

        const animation = 'animation: ' + animationArray.join(', ')
        const css = generateKeyframesCss(brackPointsframes)

        // console.log('%cAnimation', 'font-weight:bold', '\n' + animation)
        // console.log('%cCSS', 'font-weight:bold', '\n' + css)

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
