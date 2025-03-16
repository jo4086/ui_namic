import displayMiddleware from './style_displayKeys.js'
import styleCssKeys from './style_cssKeys.js'

const filterStyleProps = (props) => {
    const { stringProps, type, display } = props

    const { displayCategory, patchDisplay } = displayMiddleware(type, display)

    const { validCss, strings } = styleCssKeys({ stringProps, type, patchDisplay, displayCategory })

    return {
        patchDisplay,
        validCss,
        strings,
    }
}

export default filterStyleProps
