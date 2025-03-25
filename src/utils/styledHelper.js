import { camelToKebab } from './caseConverter'

export const objectToCss = (obj) => {
    const result = Object.entries(obj).map(([key, value]) => {
        const cssKey = camelToKebab(key)
        return `${cssKey}: ${value};`
    })

    console.log('result\n' + result.join(`\n`))

    return result
}
