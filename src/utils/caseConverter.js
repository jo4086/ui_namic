export const camelToKebab = (str) => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
