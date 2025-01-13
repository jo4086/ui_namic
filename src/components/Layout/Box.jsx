import { StyledBox } from './LayoutStyle'
import { filterPropsCore } from '../../core'
import useTriggerDynamicClass from '../../utils/trigger_dynamicClass'

const Box = ({ dynamicType=undefined, display = 'flex', type = 'div', pseudo = undefined, children, ...props }) => {
    const { dynamicClass, filter } = filterPropsCore({ display, type, props, pseudo, dynamicType })
    console.log(filter)

    useTriggerDynamicClass(dynamicClass)
    
    return (
        <StyledBox as={type} {...filter} >
            {children}
        </StyledBox>
    )
}

export default Box
