import { useState } from 'react'

const useTriggerDynamicClass = (props) => {
    const [useTriggered, setUseTriggered] = useState(false) // 상태 관리

    const { dynamicTrigger, dynamicType } = props

    // 핸들러 생성 함수
    const createEventHandler = (eventName) => {
        return (event) => {
            switch (eventName) {
                case 'onClick':
                    setUseTriggered((prev) => !prev)
                    break
                case 'onChange':
                    setUseTriggered(event.target.value !== '')
                    break
                case 'onKeyDown':
                    setUseTriggered(true)
                    break
                case 'onMouseEnter':
                    setUseTriggered(true)
                    break
                case 'onMouseLeave':
                    setUseTriggered(false)
                    break
                default:
                    console.warn(`Unhandled dynamic event: ${eventName}`)
            }
        }
    }

    const eventHandler = dynamicTrigger ? createEventHandler(dynamicType) : null

    return {
        useTriggered,
    }
}

export default useTriggerDynamicClass
