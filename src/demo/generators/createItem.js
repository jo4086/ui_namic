// generators/createItem.js

import React from 'react'
import propsFilterCore from '../propsFilterCore'
import useDynamicTrigger from '../utils/useDynamicTrigger'
import styledCore from '../styledCore'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const createItem = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, ...restProps }) {
        const resolvedType = type || defaultType
        const resolvedDisplay = display || defaultDisplay
        const resolvedDynamicType = dynamicType || defaultDynamicType
        const mergedStyle = { ...defaultBaseStyle, ...dynamicStyle }

        // console.log('mergedStyle:', mergedStyle)

        const { style, other, className, dynamicTrigger, patchDisplay } = propsFilterCore({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicType: resolvedDynamicType,
            props: restProps,
            dynamicStyle: mergedStyle,
        })
        // console.log('style:', style)
        // console.log('other:', other)

        styledCore(style)

        const { isTriggered, handleDynamicEvent } = useDynamicTrigger(dynamicTrigger)
        const Tag = resolvedType
        const baseProps = {
            className: `${className || ''} ${isTriggered ? 'dynamic' : ''}`.trim(),
            ...other,
            style,
            ...(resolvedDynamicType ? { [resolvedDynamicType]: handleDynamicEvent } : {}),
        }

        const renderTagWithoutChildren = () => <Tag {...baseProps} />
        const renderTagWithChildren = () => <Tag {...baseProps}>{children}</Tag>

        return voidElements.has(resolvedType) ? renderTagWithoutChildren() : renderTagWithChildren()
    }
}

export default createItem
