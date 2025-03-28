// utils/camelToKebab.js

const camelToKebab = (str) => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export default camelToKebab