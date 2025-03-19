import FormatUtils from './formatUtils'
import { pseudoClassList, pseudoElementList, onEventList } from './constants'
import { flexCssList, gridCssList, tableCssList, commonCssList, displayListMap } from './constants'

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])

class FilterUtils {
    dataTypeFilter(props) {
        const primitiveProps = {}
        const referenceProps = {}

        const transitionType = new Set(['transition'])

        for (const [key, value] of Object.entries(props)) {
            let formatValue
            if (transitionType.has(key) && typeof value !== 'string') {
                formatValue = value.join(', ')
            } else {
                formatValue = value
            }

            if (typeof formatValue === 'string') {
                primitiveProps[key] = formatValue
            } else {
                referenceProps[key] = formatValue
            }
        }

        return { primitiveProps, referenceProps }
    }
    propsTypeFilter(props, displayGroup) {
        console.log('%cprops:', 'font-size:1.3rem', props)
        console.log('%cdisplay:', 'font-size:1.3rem', displayGroup)
        const selectedList = displayListMap[displayGroup]
        // console.log(commonCssList)
        // console.log(selectedList)
        // const a = `${display}CssList`
        // console.log('a:', a)
        // const displayCssSet = new Set(`${display}CssList`)

        // console.log('displayCssSet:', displayCssSet)
        // console.log('newDisSet:', newDisSet)
        const primitiveProps = {}
        const referenceProps = {}

        for (const [key, value] of Object.entries(props)) {
            console.log('key:', key)
            // console.log('value:', value)
            console.log('typeof(value):', typeof value)
        }

        console.log('props:', props)
    }

    stylesFilter(styleObj, display) {
        const dynamicProps = {}
        const keyFramesProps = {}
        const mediaProps = {}
        const pseudoProps = {}
        const normalProps = {}

        const propMap = {
            dynamic: dynamicProps,
            keyframes: keyFramesProps,
            media: mediaProps,
            pseudo: pseudoProps,
        }

        for (const [key, value] of Object.entries(styleObj)) {
            if (keySet.has(key)) {
                propMap[key][key] = value
            } else {
                normalProps[key] = value
            }
        }

        const transition = FormatUtils.transitionFormat(normalProps)

        if (!!transition) {
            normalProps['transition'] = transition
        }

        // console.log({ normalProps, mediaProps, keyFramesProps, dynamicProps, pseudoProps })

        const result = FormatUtils.propsFormat({ normalProps, mediaProps, keyFramesProps, dynamicProps, pseudoProps })
        const allProps = {
            normalProps,
            mediaProps,
            keyFramesProps,
            dynamicProps,
            pseudoProps,
        }

        return result
    }

    dynamicFilter(object) {
        const exDynamic = object?.dynamic

        if (!!exDynamic) {
            const styleObj = this.stylesFilter(exDynamic)
            const pseudoProps = styleObj?.pseudoProps
            if (!!pseudoProps) {
                const formatPseudo = this.pseudoFilter(pseudoProps)
                // console.log('formatPesudo:', formatPseudo)
                styleObj['pseudoProps'] = formatPseudo
            }

            // console.log('styleObj:', styleObj)
            return { dynamic: styleObj }
        }
    }

    pseudoFilter(styleObj) {
        // console.log(styleObj)
        if (!styleObj) {
            return
        }
        const object = styleObj['pseudo']

        const { pseudoClasses, pseudoElements } = filterHelper.splitPseudoStyles(object)

        // return { pseudoClasses, pseudoElements }
        return filterHelper.splitPseudoStyles(object)
    }

    mediaFilter(styleObj) {}
}

class spreadFilter {}

class filterHelper {
    static splitPseudoStyles = (object) => {
        const pseudoClassSet = new Set(pseudoClassList)
        const pseudoElementSet = new Set(pseudoElementList)

        const pseudoClasses = {}
        const pseudoElements = {}

        for (const [key, value] of Object.entries(object)) {
            if (pseudoElementSet.has(key)) {
                const resultFormat = FormatUtils.transitionFormat(value)

                if (!!resultFormat) {
                    value['transition'] = resultFormat
                }
                pseudoElements[key] = value
            } else if (pseudoClassSet.has(key)) {
                const resultFormat = FormatUtils.transitionFormat(value)

                if (!!resultFormat) {
                    value['transition'] = resultFormat
                }
                pseudoClasses[key] = value
            }
        }

        return { pseudoClasses, pseudoElements }
    }
}

export default new FilterUtils()
