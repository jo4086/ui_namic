import filterPseudoProps from '../utils/filter_pseudoProps.js'
import filterStyleProps from '../utils/filter_styleProps.js'
import useTriggerDynamicClass from '../utils/trigger_dynamicClass.js'

const filterPropsCore = (config) => {
    const { props, display, type, pseudo, dynamicType } = config
    const isDynamicType = Boolean(dynamicType)
    const onEvent = props[dynamicType]
    console.log('isDynamicType?', isDynamicType)
    console.log('dynamicType:', dynamicType)
    console.log('onEvent:', onEvent)

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
    console.log(isDynamic)

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

    const dynamicClass = { dynamicTrigger, dynamicType }

    const filter = {
        ...nonStyles,
        ...stylesProps,
    }

    return { dynamicClass, filter }
}

export default filterPropsCore
