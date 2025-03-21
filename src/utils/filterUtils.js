import FormatUtils from './formatUtils'
import { pseudoClassList, pseudoElementList, onEventList } from './constants'
import { displayListMap } from './constants'
import { displaySetMap } from './constants'

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])
const transitionType = new Set(['transition'])
const onEventSet = new Set(onEventList)

const pseudoClassSet = new Set(pseudoClassList)
const pseudoElementSet = new Set(pseudoElementList)

// const traverse = (current) => {
//     for (const [k, v] of Object.entries(current)) {
//         if (transitionType.has(k)) {
//             if (Array.isArray(v)) {
//                 current[k] = v.join(', ') // 배열 → 문자열로 덮어쓰기
//             }
//             // string이면 그대로 두니까 else는 필요 없음
//         } else if (typeof v === 'object' && v !== null) {
//             traverse(v) // 재귀 탐색
//         }
//     }
// }

// traverse(props)

// for (const [key, value] of Object.entries(props)) {
//     let formatValue
//     if (transitionType.has(key) && typeof value !== 'string') {
//         formatValue = value.join(', ')
//     } else {
//         formatValue = value
//     }

//     if (typeof formatValue === 'string') {
//         primitiveProps[key] = formatValue
//     } else {
//         referenceProps[key] = formatValue
//     }
// }

class FilterUtils {
    splitPropsByType(props, display) {
        const formatData = filterHelper.formatTransition(props)

        const { primitiveProps, referenceProps } = filterHelper.dataTypeSplit(formatData)

        const { cssStringProps, normalStringProps } = filterHelper.cssPropsSplit(primitiveProps, display)

        const { cssObjProps, onEventProps, normalObjProps } = filterHelper.splitPropsGroup(referenceProps)

        const result = {
            styleProps: {
                ...cssStringProps,
                ...cssObjProps,
            },
            onEventProps,
            normalProps: {
                ...normalStringProps,
                ...normalObjProps,
            },
        }

        return result
    }

    // dataTypeFilter(props) {
    //     const primitiveProps = {}
    //     const referenceProps = {}

    //     for (const [key, value] of Object.entries(props)) {
    //         let formatValue
    //         if (transitionType.has(key) && typeof value !== 'string') {
    //             formatValue = value.join(', ')
    //         } else {
    //             formatValue = value
    //         }

    //         if (typeof formatValue === 'string') {
    //             primitiveProps[key] = formatValue
    //         } else {
    //             referenceProps[key] = formatValue
    //         }
    //     }

    //     return { primitiveProps, referenceProps }
    // }
    propsTypeFilter(props, displayGroup) {
        console.log('%cprops:', 'font-size:1.3rem', props)
        console.log('%cdisplay:', 'font-size:1.3rem', displayGroup)
        const selectedList = displayListMap[displayGroup]
        const primitiveProps = {}
        const referenceProps = {}

        for (const [key, value] of Object.entries(props)) {
            console.log('key:', key)
            console.log('typeof(value):', typeof value)
        }

        console.log('props:', props)
    }

    stylesFilter(styleObj, display) {
        const dynamicProps = {}
        const keyFramesProps = {}
        const mediaProps = {}
        const pseudoProps = {}
        const normalProps = {}

        const propMap = {
            dynamic: dynamicProps,
            keyframes: keyFramesProps,
            media: mediaProps,
            pseudo: pseudoProps,
        }

        for (const [key, value] of Object.entries(styleObj)) {
            if (keySet.has(key)) {
                propMap[key][key] = value
            } else {
                normalProps[key] = value
            }
        }

        const transition = FormatUtils.transitionFormat(normalProps)

        if (!!transition) {
            normalProps['transition'] = transition
        }

        const result = FormatUtils.propsFormat({ normalProps, mediaProps, keyFramesProps, dynamicProps, pseudoProps })
        const allProps = {
            normalProps,
            mediaProps,
            keyFramesProps,
            dynamicProps,
            pseudoProps,
        }

        return result
    }

    dynamicFilter(object) {
        const exDynamic = object?.dynamic

        if (!!exDynamic) {
            const styleObj = this.stylesFilter(exDynamic)
            const pseudoProps = styleObj?.pseudoProps
            if (!!pseudoProps) {
                const formatPseudo = this.pseudoFilter(pseudoProps)
                styleObj['pseudoProps'] = formatPseudo
            }

            return { dynamic: styleObj }
        }
    }

    pseudoFilter(styleObj) {
        if (!styleObj) {
            return
        }
        const object = styleObj['pseudo']

        const result = filterHelper.splitPseudoStyles(object)
        console.log('pseudoClasses:', result.pseudoClasses)
        console.log('pseudoElements:', result.pseudoElements)

        return result
    }

    mediaFilter(styleObj) {}
}

class spreadFilter {}

class filterHelper {
    static formatTransition(object) {
        const traverse = (current) => {
            for (const [key, value] of Object.entries(current)) {
                if (transitionType.has(key)) {
                    if (Array.isArray(value)) {
                        current[key] = value.join(', ') // 배열 → 문자열로 덮어쓰기
                    }
                    // string이면 그대로 두니까 else는 필요 없음
                } else if (typeof value === 'object' && value !== null) {
                    traverse(value) // 재귀 탐색
                }
            }
        }
        traverse(object)

        return object
    }

    static dataTypeSplit(props) {
        const primitiveProps = {}
        const referenceProps = {}

        for (const [key, value] of Object.entries(props)) {
            if (typeof value === 'string' || transitionType.has(key) === true) {
                primitiveProps[key] = value
            } else {
                referenceProps[key] = value
            }
        }

        return { primitiveProps, referenceProps }
    }

    static cssPropsSplit(props, display) {
        const cssStringProps = {}
        const normalStringProps = {}
        const cssSet = displaySetMap[display]

        for (const [key, value] of Object.entries(props)) {
            if (cssSet.has(key)) {
                cssStringProps[key] = value
            } else {
                normalStringProps[key] = value
            }
        }

        return { cssStringProps, normalStringProps }
    }

    static splitPropsGroup(props) {
        const cssObjProps = {}
        const onEventProps = {}
        const normalObjProps = {}

        for (const [key, value] of Object.entries(props)) {
            if (keySet.has(key)) {
                cssObjProps[key] = value
            } else if (onEventSet.has(key)) {
                onEventProps[key] = value
            } else {
                normalObjProps[key] = value
            }
        }

        return {
            cssObjProps,
            onEventProps,
            normalObjProps,
        }
    }

    static splitPseudoStyles = (object) => {
        const pseudoClasses = {}
        const pseudoElements = {}

        for (const [key, value] of Object.entries(object)) {
            if (pseudoElementSet.has(key)) {
                const resultFormat = FormatUtils.transitionFormat(value)

                if (!!resultFormat) {
                    value['transition'] = resultFormat
                }
                pseudoElements[key] = value
            } else if (pseudoClassSet.has(key)) {
                const resultFormat = FormatUtils.transitionFormat(value)

                if (!!resultFormat) {
                    value['transition'] = resultFormat
                }
                pseudoClasses[key] = value
            }
        }

        return { pseudoClasses, pseudoElements }
    }
}

export default new FilterUtils()
