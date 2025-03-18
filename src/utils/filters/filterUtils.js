class FilterUtils {
    stylesFilter(styleObj) {
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

        const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])

        for (const [key, value] of Object.entries(styleObj)) {
            if (keySet.has(key)) {
                propMap[key][key] = value
            } else {
                normalProps[key] = value
            }
        }

        return {
            normalProps,
            mediaProps,
            keyFramesProps,
            dynamicProps,
            pseudoProps,
        }
    }
}

export default new FilterUtils()
