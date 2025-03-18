class FormatUtils {
    transitionFormat = (normalProps) => {
        const exTransition = normalProps?.transition

        if (typeof exTransition == 'object') {
            return exTransition.join()
        }

        return exTransition
    }

    propsFormat = (props) => {
        // console.log('propsFormat:', props)

        const result = Object.fromEntries(Object.entries(props).filter(([_, obj]) => Object.keys(obj).length > 0))

        return result
    }
}

export default new FormatUtils()
