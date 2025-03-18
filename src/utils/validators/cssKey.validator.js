import { commonPropsKeys, flexPropsKeys, gridPropsKeys, tablePropsKeys } from '../constants/cssKey'
const consoleStyle = 'font-size:1.2rem; background-color:rgba(0,150,0,0.2); padding: 2px;'

const cssKeyValidator = (data) => {
    console.group('%ccssKeyValidator.js', 'font-size:1.2rem')
    console.log('%ccssKey:', consoleStyle, data)

    console.groupEnd('')
    console.log('%cEnd', 'font-size:1.2rem; font-weight:bold')
}
export default cssKeyValidator
