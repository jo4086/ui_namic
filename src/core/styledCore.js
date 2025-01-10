import generateBaseCSS from '../utils/generate_base_css.js'
import generatePseudoCSS from '../utils/generate_pseudo_css.js'
import generateDynamicCSS from '../utils/generate_dynamic_css.js'

const styledCore = (props) => {
    const stylesProps = props

    // console.log('전달완료:',props)
    // console.log('전달완료:',stylesProps)

    const dynamicProps = {}
    const objectProps = {}
    const stringProps = {}

    Object.entries(stylesProps).forEach(([key, value]) => {
        if (typeof value === 'object') {
            key === 'dynamic' ? (dynamicProps[key] = value) : (objectProps[key] = value)
        } else {
            stringProps[key] = value
        }
    })

    const dynamicCSS = generateDynamicCSS(dynamicProps)
    const baseCSS = generateBaseCSS(stringProps)
    const pseudoCSS = generatePseudoCSS(objectProps)

    const finalCSS = [baseCSS, pseudoCSS, dynamicCSS].join('\n')

    // console.log(baseCSS)
    console.log(finalCSS)
    return finalCSS
}

export default styledCore
