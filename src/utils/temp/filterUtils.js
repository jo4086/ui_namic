import { onEventList } from './constants'
import { displaySetMap } from './constants'
import { formatHelper, splitPropsByTypeHelper } from './helpers'
// console.log(splitPropsByTypeHelper)

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])
const transitionType = new Set(['transition'])
const onEventSet = new Set(onEventList)

const filterHelper = {
    formatTransition: (object) => {
        const traverse = (current) => {
            for (const [key, value] of Object.entries(current)) {
                if (transitionType.has(key)) {
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
            if (typeof value === 'string' || transitionType.has(key) === true) {
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
    },
}

const filterUtils = {
    splitPropsByType: (props, display) => {
        // const formatData = formatHelper.transitionType(props)
        const formatData = splitPropsByTypeHelper.formatTransition(props)

        const { primitiveProps, referenceProps } = splitPropsByTypeHelper.dataTypeSplit(formatData)

        const { cssStringProps, normalStringProps } = splitPropsByTypeHelper.cssPropsSplit(primitiveProps, display)

        const { cssObjProps, onEventProps, normalObjProps } = splitPropsByTypeHelper.splitPropsGroup(referenceProps)

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
    },
}

export default filterUtils
