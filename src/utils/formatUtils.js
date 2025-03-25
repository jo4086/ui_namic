import { caseConverter } from './helpers'

const classNameSet = new Set(['className'])

const formatter = {
    transition: (normalProps) => {
        const exTransition = normalProps?.transition

        if (typeof exTransition == 'object') {
            return exTransition.join()
        }

        return exTransition
    },

    coreProps: (data) => {
        const { result, dynamicType, onEvent, patchDisplay } = data

        const { normalProps: normal, styleProps: style, onEventProps: event } = result || {}

        const { className, ...restNormal } = normal || {}
        const filteredNormal = Object.fromEntries(Object.entries(restNormal).filter(([key]) => !classNameSet.has(key)))

        const format = {
            style,
            className,
            patchDisplay,
            other: {
                ...filteredNormal,
                ...event,
            },
            dynamicTrigger: {
                dynamicType,
                onEvent,
            },
        }

        return format
    },
}

export const styleFromatter = {
    baseCode: (code) => {
        const result = Object.entries(code).map(([key, value]) => {
            const cssKey = caseConverter.camelToKebab(key)
            return `${cssKey}: ${value};`
        })

        console.log('result\n' + result.join(`\n`))

        return result
    },
}

export default formatter
