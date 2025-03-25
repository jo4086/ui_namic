import generateBaseCSS from './generate_base_css.js'

const pseudoElementKeys = ['before', 'after', 'first-line', 'first-letter', 'placeholder', 'selection', 'marker']

const generatePseudoCSS = (pseudoProps) => {
    const pseudoElementSet = new Set(pseudoElementKeys)

    const pseudoElementBlocks = []
    const pseudoClassBlocks = []

    Object.entries(pseudoProps).forEach(([key, value]) => {
        const cssContent = generateBaseCSS(value)
        if (pseudoElementSet.has(key)) {
            pseudoElementBlocks.push(`&::${key} {
${cssContent}
}`)
        } else {
            pseudoClassBlocks.push(`&:${key} {
${cssContent}
}`)
        }
    })

    const combinedPseudoCSS = [...pseudoClassBlocks, ...pseudoElementBlocks].join('\n')

    return combinedPseudoCSS
}

export default generatePseudoCSS
