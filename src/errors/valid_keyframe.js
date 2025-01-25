const validKeyframes = (keyframes) => {

    const fromBool = []
    const toBool = []
    Object.entries(keyframes).forEach(([key, value]) => {
        if (isNaN(key)) {
            if (key === 'from') fromBool.push(true)
            else toBool.push(true)
        } else if (key === '0') {
            fromBool.push(false)
        } else if (key === '100') toBool.push(false)
    })

    // from/0 중복 여부 확인
    if (fromBool.includes(true) && fromBool.includes(false)) {
        throw new Error('Invalid keyframes: "from" and "0%" cannot be defined together.')
    }

    // to/100 중복 여부 확인
    if (toBool.includes(true) && toBool.includes(false)) {
        throw new Error('Invalid keyframes: "to" and "100%" cannot be defined together.')
    }

    return keyframes // 유효하면 그대로 반환
}
export default validKeyframes
