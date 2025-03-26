// core.props-filter.js
import displayValidator from '../utils/validators/display.validator'
import { transitionType, dataType, cssProps, propsGroup, formatting } from '../utils/propsFilterHelper'

const cache = new WeakMap()

const corePropsFilter = (config) => {
    const { display, type, dynamicStyle: styleProps, props: spreadProps, dynamicType } = config

    const mergeProps = { ...spreadProps, ...styleProps }

    const { displayGroup, patchDisplay } = displayValidator(type, display)

    const formatData = transitionType(mergeProps)

    const { primitiveProps, referenceProps } = dataType(formatData)

    const { cssStringProps, normalStringProps } = cssProps(primitiveProps, displayGroup)

    const { cssObjProps, onEventProps, normalObjProps } = propsGroup(referenceProps)

    const filteredProps = {
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

    const onEvent = mergeProps[dynamicType] || null

    const response = formatting(filteredProps, dynamicType, onEvent, patchDisplay)

    return response
}

export default corePropsFilter
