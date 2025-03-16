// filterPropsCore.js

import filterPseudoProps from '../utils/filter_pseudoProps.js'
import filterStyleProps from '../utils/filter_styleProps.js'
import filterPropsType from '../utils/filter_propsType.js'

const filterPropsCore = (config) => {
    const { props, display, type, pseudo, dynamicType } = config
    const isDynamicType = Boolean(dynamicType)
    const onEvent = props[dynamicType]
    const value = props?.value

    const { keyframeProps, mediaProps, objectProps, stringProps, functionProps } = filterPropsType(props)

    // 1. 스타일 필터링
    const { validCss, patchDisplay, strings } = filterStyleProps({ stringProps, type, display })

    const { pseudoProps, nonPseudoProps, isDynamic } = filterPseudoProps({ objectProps, type, pseudo })

    const styles = {
        ...(patchDisplay && { display: patchDisplay }),
        ...(validCss || {}),
        ...(pseudoProps || {}),
        ...(mediaProps || {}),
        ...(keyframeProps || {}),
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
