import { StyledNavButton } from './NavigateStyle'
import { filterPropsCore } from '../../core'
import { useTriggerDynamicClass } from '../../utils'

const NavButton = ({ dynamicType = undefined, display = 'inline-block', type = 'div', pseudo = undefined, children, ...props }) => {
    const { dynamicClass, filter } = filterPropsCore({ display, type, props, pseudo, dynamicType })

    const { isTriggered, handleDynamicEvent } = useTriggerDynamicClass(dynamicClass)

    return (
        <StyledNavButton as={type} {...filter} className={isTriggered ? 'dynamic' : ''} {...(dynamicType ? { [dynamicType]: handleDynamicEvent } : {})}>
            {children}
        </StyledNavButton>
    )
}

export default NavButton
