// styledCore.js

import camelToKebab from './utils/camelToKebab.js'
import { forEachObject, forEachNestedObject } from './utils/callback.js'

const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

function styledCore(props) {
    const { dynamic, keyframes, media, pseudo, ...rest } = props

    // console.log('rest:', rest)

    const { animation, css } = buildKeyframesBundle(keyframes)
    const cssBlock = buildCssBlock(rest)

    buildMediaBundle2(media)

    // console.log('cssBlock\n' + cssBlock)
    // console.log('animation:', animation)
    // console.log('css:', css)
}

export default styledCore

const optionList = ['vertical', 'horizontal', 'hover']
const optionMap = {
    vertical: 'orientation: portrait',
    horizontal: 'orientation: landscape',
}

// function formatKey(data) {
//     const result = {}

//     forEachObject(data, (key, value) => {
//         let formatValue
//         typeof value === 'number' ? (formatValue = value + 'px') : (formatValue = value)
//         let formatKey = `${key}-width`

//         result[formatKey] = formatValue
//     })

//     return result
// }
function buildMediaBundle2(media) {
    if (!media) return []

    function formattedPoint(data) {
        const conditions = []

        if (data.min !== undefined) {
            const min = typeof data.min === 'number' ? `${data.min}px` : data.min
            conditions.push(`(min-width: ${min})`)
        }

        if (data.max !== undefined) {
            const max = typeof data.max === 'number' ? `${data.max}px` : data.max
            conditions.push(`(max-width: ${max})`)
        }

        if (data.point !== undefined) {
            const point = typeof data.point === 'number' ? `${data.point}px` : data.point

            conditions.push(`()`)
        }

        return conditions.join(' and ')
    }

    function generateRangeBlock(range) {
        const result = []

        const bulitBlock = range.map((item) => {
            const { min = null, max = null, ...style } = item
            const condition = formattedPoint({ min, max })
            return { condition, style }
        })
        result.push(...bulitBlock)

        return result
    }

    function generateUpDownBlock(position, data) {
        const positionMap = {
            up: 'min-width',
            down: 'max-width',
        }

        // console.log('upDown', upDown)
        console.log('position:', position)

        const result = []

        console.log('data:', data)

        const bulitBlock = data.map((item) => {
            const { point = null, ...style } = item

            console.log('style:', style)
        })
    }

    const result = []

    const rangeSet = new Set(['range'])
    const upDownSet = new Set(['up', 'down'])

    forEachObject(media, (key, value) => {
        if (rangeSet.has(key)) {
            const rangeBlock = generateRangeBlock(value)

            console.log('rangeBlock:', rangeBlock)
        }

        if (upDownSet.has(key)) {
            console.log('upDownSet key:', key)
            generateUpDownBlock(key, value)
        }
    })

    for (const [key, value] of Object.entries(media)) {
        if (rangeSet.has(key)) {
            const builtRange = value.map((item) => {
                const { min = null, max = null, ...style } = item
                const condition = formattedPoint({ min, max })
                return { condition, style }
            })
            result.push(...builtRange)
        }

        if (upDownSet.has(key)) {
            // console.log('upDownSet key:', key)
        }
    }

    console.log('result:', result)

    // const buildRangePoint = range.map((key, i) => {
    //     console.log('min:', key.min, 'max:', key.max)

    //     const { min = [], max = [] } = key
    //     console.log('min:', min, 'max:', max)
    // })

    // const buildDownPoint = down.map((key, i) => {
    //     const { point = null, ...style } = key
    // })

    // const buildUpPoint = up.map((key, i) => {
    //     const { point = null, ...style } = key
    //     console.log('style:', style)
    //     console.log('point:', point)
    // })
}

function buildMediaBundle(media) {
    if (!media) return []

    console.log('media.self =>', media.self, '\nmedia.down =>', media.down, '\nmedia.up =>', media.up)

    const allItems = [...(media.self || []), ...(media.down || []), ...(media.up || [])]

    const conditionMap = new Map()

    allItems.forEach((item) => {
        const { min, max, ...style } = item

        const key = [min !== undefined ? `min:${min}` : '', max !== undefined ? `max:${max}` : ''].filter(Boolean).join('&')

        if (!conditionMap.has(key)) {
            conditionMap.set(key, [])
        }

        conditionMap.get(key).push(style)
    })

    const result = []

    for (const [key, styleGroup] of conditionMap.entries()) {
        const [minPart, maxPart] = key.split('&')
        const conditions = []
        if (minPart) conditions.push(`(min-width: ${minPart.split(':')[1]}px)`)
        if (maxPart) conditions.push(`(max-width: ${maxPart.split(':')[1]}px)`)

        const mergedStyle = Object.assign({}, ...styleGroup)

        result.push({
            condition: conditions.join(' and '),
            style: mergedStyle,
        })
    }

    console.log('result:', result)

    return result
}

function buildCssBlock(string) {
    // console.log('string:', string)

    const blocks = []

    forEachObject(string, (key, value) => {
        const kebabKey = camelToKebab(key)

        // console.log('kebabKey:', kebabKey)

        const block = `${kebabKey} : ${value};`
        // console.log('block', block)
        blocks.push(block)
    })

    const result = blocks.join('\n')
    // console.log(blocks.join('\n'))

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
