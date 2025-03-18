import FormatUtils from './formatUtils'
import { pseudoClassesMap, pseudoElementsMap } from './constants/pseudo.constant'
const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])

class FilterUtils {
    stylesFilter(styleObj, display) {
        console.group('stylesFilter')
        console.log(display)
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
                console.log('formatPesudo:', formatPseudo)
                styleObj['pseudoProps'] = formatPseudo
            }

            console.log('styleObj:', styleObj)
            return { dynamic: styleObj }
        }
    }

    pseudoFilter(styleObj) {
        console.log(styleObj)
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
        const pseudoClassSet = new Set(pseudoClassesMap)
        const pseudoElementSet = new Set(pseudoElementsMap)

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
