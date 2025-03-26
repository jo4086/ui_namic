// utils/styleHash.js
export const styleCache = new Map()

export function getOrCreateStyle(styleObj) {
    const key = JSON.stringify(styleObj) // 더 나은 방법은 sha256 해시
    if (styleCache.has(key)) {
        return styleCache.get(key) // className or cssText
    }

    const className = generateClassName(key) // 예: 'dynamic-abc123'
    const cssText = styleToCssText(`.${className}`, styleObj)
    insertStyleOnce(className, cssText) // 중복 삽입 방지 로직 포함

    const result = { className, cssText }
    styleCache.set(key, result)
    return result
}
