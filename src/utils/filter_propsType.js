const filterMap = {
    keyframe: 'keyframeProps',
    media: 'mediaProps',
}

const filterPropsType = (props) => {
    const { keyframeProps, mediaProps, objectProps, stringProps, functionProps } = Object.entries(props).reduce(
        (acc, [key, value]) => {
            if (typeof value === 'function') {
                acc.functionProps[key] = value
            } else if (typeof value === 'object' && value !== null) {
                const target = filterMap[key] || 'objectProps' // 기본값은 'pseudoProps'
                acc[target][key] = value
            } else {
                acc.stringProps[key] = value
            }
            return acc
        },
        { keyframeProps: {}, mediaProps: {}, objectProps: {}, stringProps: {}, functionProps: {} },
    )
// test
    return { functionProps, stringProps, keyframeProps, mediaProps, objectProps }
}

export default filterPropsType

// let objectProps = {} // 초기화
// const stringProps = {}
// const functionProps = {}
// const keyframeProps = {}
// const mediaProps = {}

// Object.entries(props).forEach(([key, value]) => {
//     if (typeof value === 'function') {
//         functionProps[key] = value
//     } else if (typeof value === 'object' && value !== null) {
//         objectProps[key] = value
//     } else {
//         stringProps[key] = value
//     }
// })

// const { keyframeProps, mediaProps, pseudoProps } = Object.entries(objectProps).reduce(
//     (acc, [key, value]) => {
//         const target = filterMap[key] || 'pseudoProps' // 기본값은 'pseudoProps'
//         acc[target][key] = value
//         return acc
//     },
//     { keyframeProps: {}, mediaProps: {}, pseudoProps: {} },
// )

const BoxStyle1 = {
    keyframe: {
        0: {
            transform: 'translateX(-100%)',
            opacity: 0,
        },
        50: {
            transform: 'translateX(-50%)',
            opacity: 0.5,
        },
        100: {
            transform: 'translateX(0)',
            opacity: 1,
        },
    },
}

const BoxStyle2 = {
    keyframe: {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    },
}

const Boxstyle3 = {
    media: {
        min: 768,
        max: 1024,
        style: {
            width: '200px',
            height: '50px',
            
        }
    }
}
