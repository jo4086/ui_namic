// filterPropsCore.js

import filterPseudoProps from '../utils/filter_pseudoProps.js'
import filterStyleProps from '../utils/filter_styleProps.js'

const filterPropsCore = (config) => {
    const { props, display, type, pseudo, dynamicType } = config
    const isDynamicType = Boolean(dynamicType)
    const onEvent = props[dynamicType]
    const value = props?.value

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
    // console.log(isDynamic)

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
    const dynamicTrigger = isDynamic && isDynamicType

    const dynamicClass = { dynamicTrigger, dynamicType, onEvent, value }

    const filter = {
        ...nonStyles,
        ...stylesProps,
    }

    return { dynamicClass, filter }
}

export default filterPropsCore
