import { onEventSet, displaySetMap } from './constants'

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])
const transitionSet = new Set(['transition'])

const classNameSet = new Set(['className'])

export const transitionType = (props) => {
    const traverse = (current) => {
        const copy = { ...current }
        for (const [key, value] of Object.entries(copy)) {
            if (transitionSet.has(key) && Array.isArray(value)) {
                copy[key] = value.join(', ')
            } else if (typeof value === 'object' && value !== null) {
                copy[key] = traverse(value)
            }
        }
        return copy
    }
    const mergeForm = traverse(props)
    return mergeForm
}

export const dataType = (formatData) => {
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

export const propsGroup = (referenceProps) => {
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

export const cssProps = (primitiveProps, display) => {
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

export const formatting = (filteredProps, dynamicType, onEvent, patchDisplay) => {
    const { normalProps: normal, styleProps: style, onEventProps: event } = filteredProps || {}

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
}

const propsFilterHelper = {
    transitionType,
    dataType,
    propsGroup,
    cssProps,
    formatting,
}

export default propsFilterHelper
