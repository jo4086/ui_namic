// Box.jsx

import { StyledBox } from './LayoutStyle'
import { filterPropsCore } from '../../core'
import useTriggerDynamicClass from '../../utils/trigger_dynamicClass'

const Box = ({ dynamicType = undefined, display = 'flex', type = 'div', pseudo = undefined, children, ...props }) => {
    const { dynamicClass, filter } = filterPropsCore({ display, type, props, pseudo, dynamicType })

     const { isTriggered, handleDynamicEvent } = useTriggerDynamicClass(dynamicClass)
    return (
        <StyledBox
            as={type}
            {...filter}
            className={isTriggered ? 'dynamic' : ''}
            {...(dynamicType ? { [dynamicType]: handleDynamicEvent } : {})} // 동적 이벤트 바인딩
        >
            {children}
        </StyledBox>
    )
}

export default Box
