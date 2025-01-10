import { StyledBox } from './LayoutStyle'
import { filterPropsCore } from '../../core'

const Box = ({ dynamicType, display = 'flex', type = 'div', pseudo = undefined, children, ...props }) => {
    const { dynamicTrigger, filter } = filterPropsCore({ display, type, props, pseudo, dynamicType })
    console.log(filter)

    return (
        <StyledBox as={type} {...filter} className={dynamicTrigger ? 'dynamic' : ''}>
            {children}
        </StyledBox>
    )
}

export default Box
