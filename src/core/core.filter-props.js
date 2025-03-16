// core.props-filter.js
import displayValidate from '../utils/validators/display.validate'
import propsFilterType from '../utils/filters/props.filter-type'

// import filterPseudoProps from '../utils/filter_pseudoProps.js'
// import filterStyleProps from '../utils/filter_styleProps.js'
// import filterPropsType from '../utils/filter_propsType.js'

const configs = ['display', 'type', 'dynamic', 'dynamicType', 'props', 'keyframes', 'media', 'pseudo', '']

/**
 * @prop {object}
 *  */

const coreFilterProps = (config) => {
    const { props, display, type, pseudo, dynamic, dynamicType, keyframes, media } = config

    const isDynamicType = Boolean(dynamicType)
    const onEvent = props[dynamicType]
    const value = props?.value

    const { functionProps, objectProps, keyframesProps, mediaProps, stringProps } = propsFilterType(props)

    const { displayCategory, patchDisplay } = displayValidate(type, display)
}

export default coreFilterProps
