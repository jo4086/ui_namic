import filterPseudoProps from '../utils/filter_pseudoProps.js'
import filterStyleProps from '../utils/filter_styleProps.js'

const filterPropsCore = (config) => {
    // console.log(config)
    const { props, display, type, pseudo, dynamicType } = config
    const isValue = Boolean(props?.value || false)

    console.log('filterDynamic', dynamicType)
    const objectProps = {}
    const stringProps = {}
    const functionProps = {}

    Object.entries(props).forEach(([key, value]) => {
        if (typeof value === 'function') {
            functionProps[key] = value
        } else if (typeof value === 'object' && value !== null) {
            objectProps[key] = value
        } else {
            stringProps[key] = value
        }
    })

    const { validCss, validDisplay, strings } = filterStyleProps({ stringProps, type, display })

    const { pseudoProps, nonPseudoProps, isDynamic } = filterPseudoProps({ objectProps, type, pseudo })

    const styles = {
        ...(validDisplay && { display: validDisplay }),
        ...(validCss || {}),
        ...(pseudoProps || {}),
    }

    const nonStyles = {
        ...(functionProps || {}),
        ...(nonPseudoProps || {}),
        ...strings,
    }

    const stylesProps = {
        $styles: styles,
    }
    const dynamicTrigger = isDynamic && isValue

    const filter = {
        ...nonStyles,
        ...stylesProps,
    }

    // console.log(result)

    return { dynamicTrigger, filter }
}

export default filterPropsCore
