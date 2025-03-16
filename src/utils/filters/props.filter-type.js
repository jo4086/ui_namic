const filterMap = {
    keyframes: 'keyframeProps',
    media: 'mediaProps',
}

function propsFilterType(props) {
    const { functionProps, objectProps, keyframesProps, mediaProps, stringProps } = Object.entries(props).reduce(
        (acc, [key, value]) => {
            if (typeof value === 'function') {
                acc.functionProps[key] = value
            } else if (typeof value === 'object' && value !== null) {
                const target = filterMap[key] || 'objectProps'
                acc[target][key] = value
            } else {
                acc.stringProps[key] = value
            }
            return acc
        },
        { functionProps: {}, objectProps: {}, keyframesProps: {}, mediaProps: {}, stringProps: {} }
    )

    return { functionProps, objectProps, keyframesProps, mediaProps, stringProps }
}

export default propsFilterType
