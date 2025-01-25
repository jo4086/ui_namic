const generateBaseCSS = (baseProps) => {
    return Object.entries(baseProps)
        .map(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
            return `${cssKey}: ${value};`
        })
        .join('\n')
}

export default generateBaseCSS


/*
    const baseCSS = Object.entries(baseProps)
        .map(([key, value]) => {
            if (key === 'animation') {
                const aniValue = `${value}`
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                return `${cssKey}: ${aniValue};`
            }

            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
            return `${cssKey}: ${value};`
        })
        .join('\n')

    return baseCSS
*/