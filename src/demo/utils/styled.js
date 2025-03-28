// utils/styled.js

// import React from 'react'
import createItem from '../generators/createItem'

const styled = (Base) => (styleFn) => {
    const Component = typeof Base === 'string' ? createItem({ type: Base }) : Base

    return function StyledComponent(props) {
        const styleFromFn = typeof styleFn === 'function' ? styleFn(props) : styleFn || {}

        const combinedStyle = {
            ...styleFromFn,
            ...props.dynamicStyle, // props 쪽이 우선
        }

        return <Component {...props} dynamicStyle={combinedStyle} />
    }
}

export default styled

// const styled2 = (Base) => (styleFn) => {
//     return (props) => {
//         const baseStyle = styleFn(props)
//         const mergedStyle = { ...baseStyle, ...props.dynamicStyle }

//         return <Base {...props} dynamicStyle={mergedStyle} />
//     }
// }

function styleds(BaseComponent) {
    return function wrapStyle(styleFn) {
        return function StyledComponent(props) {
            const styleFromFn = styleFn?.(props) || {}
            const combinedStyle = {
                ...styleFromFn,
                ...props.dynamicStyle,
            }

            return <BaseComponent {...props} dynamicStyle={combinedStyle} />
        }
    }
}

const styledss = (BaseComponent) =>
    function wrapStyle(styleFn) {
        return function StyledComponent(props) {
            const styleFromFn = styleFn?.(props) || {}
            const combinedStyle = {
                ...styleFromFn,
                ...props.dynamicStyle,
            }

            return <BaseComponent {...props} dynamicStyle={combinedStyle} />
        }
    }

const styledsss = (BaseComponent) => (styleFn) => {
    return function StyledComponent(props) {
        const styleFromFn = styleFn?.(props) || {}
        const combinedStyle = {
            ...styleFromFn,
            ...props.dynamicStyle, // 유저가 직접 전달한 게 우선
        }

        return <BaseComponent {...props} dynamicStyle={combinedStyle} />
    }
}
