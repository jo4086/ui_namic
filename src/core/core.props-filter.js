// core.props-filter.js
import displayValidator from '../utils/validators/display.validator'
import filterUtils from '../utils/filterUtils'

const corePropsFilter = (config) => {
    const { display, type, dynamicStyle: styleProps, props: spreadProps, dynamicType } = config

    const mergeProps = { ...spreadProps, ...styleProps }

    const { displayGroup, patchDisplay } = displayValidator(type, display)

    const result = filterUtils.splitPropsByType(mergeProps, displayGroup)

    const hasDynamicStyle = Boolean(result?.styleProps?.dynamic)
    const hasDynamicType = Boolean(dynamicType)

    const onEvent = mergeProps[dynamicType] || null
    const dynamicTrigger = hasDynamicStyle && hasDynamicType

    const dynamicClass = { dynamicTrigger, dynamicType, onEvent }
    const style = {
        ...result.styleProps,
    }
    const other = {
        ...result.onEventProps,
        ...result.normalProps,
    }

    // console.log('style:', style)
    // console.log('other:', other)

    return { style, other, dynamicClass }
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
