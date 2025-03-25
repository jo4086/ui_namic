import generateBaseCSS from './generate_base_css.js'
import generatePseudoCSS from './generate_pseudo_css.js'

const generateDynamicCSS = (dynamicProps) => {
    // console.log('Dynamic Props:\n', dynamicProps, '\n')

    const dynamicStyles = dynamicProps.dynamic || {}
    const baseStyles = {}
    const pseudoStyles = {}

    Object.entries(dynamicStyles).forEach(([key, value]) => {
        if (typeof value === 'object') {
            pseudoStyles[key] = value
        } else {
            baseStyles[key] = value
        }
    })

    const dynamicKey = '.dynamic'

    const pseudoCSSBlocks = generatePseudoCSS(pseudoStyles)

    const dynamicPseudoCSS = pseudoCSSBlocks
        .split(/(?=\n&[:]{1,2}[^:])/g)
        .map((cssBlock) => {
            if (cssBlock.trim().startsWith('&')) {
                return cssBlock.replace('&', `&${dynamicKey}`)
            }
            return cssBlock
        })
        .join('\n')

    const baseCSS = generateBaseCSS(baseStyles)
    const dynamicBaseCSS = `&.dynamic {
${baseCSS}
}`

    const combinedCSS = [dynamicBaseCSS, dynamicPseudoCSS].join('\n\n')

    return combinedCSS
}

export default generateDynamicCSS
