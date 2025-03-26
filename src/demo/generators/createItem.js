// src/demo/generators/createItem.js

import React from 'react'
import propsFilterCore from '../propsFilterCore'
import useDynamicTrigger from '../utils/useDynamicTrigger'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const createItem = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, ...restProps }) {
        const resolvedType = type || defaultType
        const resolvedDisplay = display || defaultDisplay
        const resolvedDynamicType = dynamicType || defaultDynamicType
        const mergedStyle = { ...defaultBaseStyle, ...dynamicStyle }

        const { style, other, className, dynamicTrigger, patchDisplay } = propsFilterCore({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicType: resolvedDynamicType,
            props: restProps,
            dynamicStyle: mergedStyle,
        })

        const { isTriggered, handleDynamicEvent } = useDynamicTrigger(dynamicTrigger)
        const Tag = resolvedType
        const baseProps = {
            className: `${className || ''} ${isTriggered ? 'dynamic' : ''}`.trim(),
            ...other,
            style,
            ...(resolvedDynamicType ? { [resolvedDynamicType]: handleDynamicEvent } : {}),
        }

        const renderVoidTag = () => <Tag {...baseProps} />
        const renderValidTag = () => <Tag {...baseProps}>{children}</Tag>

        return voidElements.has(resolvedType) ? renderVoidTag() : renderValidTag()
    }
}

export default createItem
