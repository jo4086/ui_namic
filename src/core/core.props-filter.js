// core.props-filter.js
import displayValidator from '../utils/validators/display.validator'
import cssKeyValidator from '../utils/validators/cssKey.validator'
import propsFilterType from '../utils/filters/props.filter-type'
import filterUtils from '../utils/filterUtils'

// import filterPseudoProps from '../utils/filter_pseudoProps.js'
// import filterStyleProps from '../utils/filter_styleProps.js'
// import filterPropsType from '../utils/filter_propsType.js'

const configs = ['display', 'type', 'dynamic', 'dynamicType', 'props', 'keyframes', 'media', 'pseudo', '']

/**
 * @prop {object}
 *  */

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])

const corePropsFilter = (config) => {
    const { display, type, dynamicStyle: styleProps, props: spreadProps, dynamicType } = config
    console.log('styleProps:', styleProps)
    console.log('spreadProps:', spreadProps)

    const { displayCategory, patchDisplay } = displayValidator(type, display)

    // cssKeyValidator(displayCategory)

    const { normalProps, mediaProps, keyFramesProps, dynamicProps, pseudoProps } = filterUtils.stylesFilter(styleProps, displayCategory)

    const { pseudoClasses, pseudoElements } = filterUtils.pseudoFilter(pseudoProps)
    console.log('result:', pseudoClasses, pseudoElements)

    const dynamis = filterUtils.dynamicFilter(dynamicProps)
    console.log('dynamis', dynamis)

    // const isDynamicType = Boolean(dynamicType)
    // const onEvent = props[dynamicType]
    // const value = props?.value

    // const { functionProps, objectProps, keyframesProps, mediaProps, stringProps } = propsFilterType(props)

    // console.log('get-display:', displayCategory)
    // console.log('patchDisplayCategory:', patchDisplay)
}

export default corePropsFilter

/** 
 * {dy} 
 * - transition Key 발견시 object인지 아닌지 판별후 오브젝트면 스트링으로 변환
 * - 내부에 dynamic Key 발견시 exDynamic 활성화
 * - dynamicType 존재시 exDynamicType 활성화
 * - 두가지 모두 존재: dynamicTrigger 조건 완료

 * {...props}
 * - 내부를 순회하여 필터링
 * 
 * 
 */
