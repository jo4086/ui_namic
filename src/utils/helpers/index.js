/** helper/index.js
 * --- naming rule
 *
 * export const `${name}Helper` = { function1: () => {}, function2: () => {}, ...}
 *
 * --- INDEX
 *
 * split
 *     .dataType
 *     .cssProps
 *     .propsGroup
 *
 * caseConvert
 *     .camelToKebab
 *     .camelToSnake
 *     .camelToPascal
 *
 * format
 *     .transitionType
 *     .coreProps
 */

import { displaySetMap } from '../constants'
import { onEventSet } from '../constants'

const classNameSet = new Set(['className'])
const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])
const transitionSet = new Set(['transition'])

export const splitHelper = {
    dataType: (props) => {
        const primitiveProps = {}
        const referenceProps = {}

        for (const [key, value] of Object.entries(props)) {
            if (typeof value === 'string' || transitionSet.has(key) === true) {
                primitiveProps[key] = value
            } else {
                referenceProps[key] = value
            }
        }

        return { primitiveProps, referenceProps }
    },

    cssProps: (props, display) => {
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
    },

    propsGroup: (props) => {
        const cssObjProps = {}
        const onEventProps = {}
        const normalObjProps = {}

        console.time('has')
        for (const [key, value] of Object.entries(props)) {
            if (keySet.has(key)) {
                cssObjProps[key] = value
            } else if (onEventSet.has(key)) {
                onEventProps[key] = value
            } else {
                normalObjProps[key] = value
            }
        }

        console.timeEnd('has')

        return {
            cssObjProps,
            onEventProps,
            normalObjProps,
        }
    },
}

export const splitPropsByTypeHelper = {
    formatTransition: (object) => {
        const traverse = (current) => {
            for (const [key, value] of Object.entries(current)) {
                if (transitionSet.has(key)) {
                    if (Array.isArray(value)) {
                        current[key] = value.join(', ')
                    }
                } else if (typeof value === 'object' && value !== null) {
                    traverse(value) // 재귀 탐색
                }
            }
        }
        traverse(object)

        return object
    },

    dataTypeSplit: (props) => {
        const primitiveProps = {}
        const referenceProps = {}

        for (const [key, value] of Object.entries(props)) {
            if (typeof value === 'string' || transitionSet.has(key) === true) {
                primitiveProps[key] = value
            } else {
                referenceProps[key] = value
            }
        }

        return { primitiveProps, referenceProps }
    },

    cssPropsSplit: (props, display) => {
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
    },

    splitPropsGroup: (props) => {
        const cssObjProps = {}
        const onEventProps = {}
        const normalObjProps = {}

        console.time('has')
        for (const [key, value] of Object.entries(props)) {
            if (keySet.has(key)) {
                cssObjProps[key] = value
            } else if (onEventSet.has(key)) {
                onEventProps[key] = value
            } else {
                normalObjProps[key] = value
            }
        }

        console.timeEnd('has')

        return {
            cssObjProps,
            onEventProps,
            normalObjProps,
        }
    },
}

export const caseConverter = {
    camelToKebab: (str) => {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase()
    },
}

export const formatHelper = {
    transitionType: (object) => {
        const traverse = (current) => {
            for (const [key, value] of Object.entries(current)) {
                if (transitionSet.has(key)) {
                    if (Array.isArray(value)) {
                        current[key] = value.join(', ')
                    }
                } else if (typeof value === 'object' && value !== null) {
                    traverse(value) // 재귀 탐색
                }
            }
        }
        traverse(object)

        return object
    },

    coreProps: (data) => {
        const { result, dynamicType, onEvent, patchDisplay } = data

        const { normalProps: normal, styleProps: style, onEventProps: event } = result || {}

        const { className, ...restNormal } = normal || {}
        const filteredNormal = Object.fromEntries(Object.entries(restNormal).filter(([key]) => !classNameSet.has(key)))

        const format = {
            style,
            className,
            patchDisplay,
            other: {
                ...filteredNormal,
                ...event,
            },
            dynamicTrigger: {
                dynamicType,
                onEvent,
            },
        }

        return format
    },
}
