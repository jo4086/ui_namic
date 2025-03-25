import { onEventSet, displaySetMap } from './constants'

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])
const transitionSet = new Set(['transition'])

function splitPropsByType(props, display) {
    const formatData = transitionType(props)

    const { primitiveProps, referenceProps } = dataType(formatData)

    const { cssStringProps, normalStringProps } = cssProps(primitiveProps, display)

    const { cssObjProps, onEventProps, normalObjProps } = propsGroup(referenceProps)

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

export default splitPropsByType

// assist functions
const transitionType = (props) => {
    const traverse = (current) => {
        const copy = { ...current }
        for (const [key, value] of Object.entries(copy)) {
            if (transitionSet.has(key) && Array.isArray(value)) {
                copy[key] = value.join(', ')
            } else if (typeof value === 'object' && value !== null) {
                copy[key] = traverse(value) // 재귀적으로 복사
            }
        }
        return copy
    }
    const result = traverse(props)
    return result
}

const dataType = (formatData) => {
    const primitiveProps = {}
    const referenceProps = {}

    for (const [key, value] of Object.entries(formatData)) {
        if (typeof value === 'string' || transitionSet.has(key) === true) {
            primitiveProps[key] = value
        } else {
            referenceProps[key] = value
        }
    }

    return { primitiveProps, referenceProps }
}

const propsGroup = (referenceProps) => {
    const cssObjProps = {}
    const onEventProps = {}
    const normalObjProps = {}

    console.time('has')
    for (const [key, value] of Object.entries(referenceProps)) {
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
}

const cssProps = (primitiveProps, display) => {
    const cssStringProps = {}
    const normalStringProps = {}
    const cssSet = displaySetMap[display]

    for (const [key, value] of Object.entries(primitiveProps)) {
        if (cssSet.has(key)) {
            cssStringProps[key] = value
        } else {
            normalStringProps[key] = value
        }
    }

    return { cssStringProps, normalStringProps }
}
