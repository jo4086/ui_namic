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

    buildMediaBundle(media)

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

function buildMediaBundle(media) {
    if (!media) return []

    let upCount = 0
    let downCount = 0
    const upBlocks = {}
    const downBlocks = {}
    function buildMediaQueryConditions(data) {
        const conditions = []

        if (data.up !== undefined) {
            upCount += 1
            const up = typeof data.up === 'number' ? `${data.up}px` : data.up

            console.log('upCount:', upCount)

            const upBlock = {
                property: 'between',
                direction: 'up',
                value: data.up,
            }

            console.log('a:', upBlock)

            upBlocks[upCount] = upBlock

            // upBlocks.push()

            conditions.push(`(min-width: ${up})`)
        }

        if (data.down !== undefined) {
            downCount += 1
            const down = typeof data.down === 'number' ? `${data.down}px` : data.down

            console.log('downCount:', downCount)

            const downBlock = {
                property: 'between',
                direction: 'down',
                value: data.down,
            }

            downBlocks[downCount] = downBlock

            conditions.push(`(max-width: ${down})`)
        }

        if (data.point !== undefined) {
            if (data.position === 'up') {
                upCount += 1

                const upBlock = {
                    property: 'up',
                    direction: 'up',
                    value: data.point,
                }

                upBlocks[upCount] = upBlock

                console.log('position Up:', upBlock)
            } else if (data.position === 'down') {
                downCount += 1

                const downBlock = {
                    property: 'down',
                    direction: 'down',
                    value: data.point,
                }

                downBlocks[downCount] = downBlock
            }
            const point = typeof data.point === 'number' ? `${data.point}px` : data.point

            console.log('position:', data.position)

            conditions.push(`(${data.matchPosition}: ${point})`)
        }

        console.log('upBlocks:', upBlocks)
        console.log('downBlocks:', downBlocks)

        return conditions
    }

    function generateBetweenBlock(between) {
        const mediaBundle = []

        const builtBlock = between.map((item) => {
            const { up = null, down = null, ...style } = item

            const condition = buildMediaQueryConditions({ up, down })

            return { condition, style }
        })
        mediaBundle.push(...builtBlock)

        return mediaBundle
    }

    function generateUpDownBlock(position, data) {
        const positionMap = {
            up: 'min-width',
            down: 'max-width',
        }

        const mediaBundle = []

        const builtBlock = data.map((item) => {
            const { point = null, ...style } = item

            const matchPosition = positionMap[position]

            const condition = buildMediaQueryConditions({ matchPosition, position, point })

            return { condition, style }
        })

        mediaBundle.push(...builtBlock)

        return mediaBundle
    }

    const result = []

    const betweenSet = new Set(['between'])
    const upDownSet = new Set(['up', 'down'])

    forEachObject(media, (key, value) => {
        if (betweenSet.has(key)) {
            const betweenBlock = generateBetweenBlock(value)

            result.push(betweenBlock)
        }

        if (upDownSet.has(key)) {
            const upDownBlock = generateUpDownBlock(key, value)

            result.push(upDownBlock)
        }
    })

    console.log('result:', result)
}

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

// const media = {
//     between: [
//         { up: 768, down: 1023, width: '200px', height: '50px' },
//         { up: 1024, down: 1279, width: '300px', height: '100px' },
//     ],
//     down: [
//         { point: 1023, width: '200px', height: '50px' },
//         { point: 1279, width: '300px', height: '100px' },
//         { point: 1439, width: '400px', height: '150px' },
//     ],
//     up: [
//         { point: 768, width: '200px', height: '50px' },
//         { point: 1280, width: '300px', height: '100px' },
//     ],
//     advanced: [{ query: 'screen, (min-width: 768px) and (max-width: 1023px)', width: '300px' }],
// }

// const media = {
//     [up('768')]: { width: '200px', height: '50px' },
//     [down('1023')]: { width: '200px', height: '50px' },
//     [down('779')]: { width: '150px', height: '25px' },
//     [between('768')('1023')]: { width: '200px', height: '50px' },
//     [query('screen, (min-width: 768px) and (max-width: 1023px)')]: { width: '300px', height: '200px' },
// }
