import { useState, useCallback } from 'react'

const useTriggerDynamicClass = (dynamicClass) => {
    const [isTriggered, setIsTriggered] = useState(false)

    const { dynamicType, onEvent } = dynamicClass

    // 이벤트를 처리하고 즉시 결과를 반영
    const handleDynamicEvent = useCallback(
        (event) => {
            if (dynamicType && typeof onEvent === 'function') {
                const inputValue = event.target?.value || null

                if (dynamicType === 'onChange') {
                    inputValue ? setIsTriggered(true) : setIsTriggered(false)
                } else if (dynamicType === 'onClick') {
                    setIsTriggered((prev) => !prev) // 토글
                } else if (dynamicType === 'onMouseEnter') {
                    setIsTriggered(true) // 마우스 진입 시 활성화
                } else if (dynamicType === 'onMouseLeave') {
                    setIsTriggered(false) // 마우스 나갈 때 비활성화
                }

                // 사용자 정의 이벤트 실행
                onEvent(event)
            }
        },
        [dynamicType, onEvent],
    )

    return { isTriggered, handleDynamicEvent }
}

export default useTriggerDynamicClass

/* 
import { useState, useEffect, useCallback } from 'react'

const useTriggerDynamicClass = (dynamicClass) => {
    const [isTriggered, setIsTriggered] = useState(false) // 상태 관리

    const { dynamicType, onEvent, value } = dynamicClass
    console.log(value)

    // 이벤트에 따라 상태를 변경하는 핸들러
    const handleDynamicEvent = useCallback(
        (event) => {
            if (dynamicType && typeof onEvent === 'function') {
                // 조건에 따라 동적 활성화
                if (dynamicType === 'onClick') {
                    setIsTriggered((prev) => !prev) // 토글
                } else if (dynamicType === 'onChange' && value !== undefined) {
                    setIsTriggered(value !== '') // 값에 따라 활성화
                } else if (dynamicType === 'onMouseEnter') {
                    setIsTriggered(true) // 마우스 진입 시 활성화
                } else if (dynamicType === 'onMouseLeave') {
                    setIsTriggered(false) // 마우스 나갈 때 비활성화
                }
                // 사용자 정의 이벤트 실행
                onEvent(event)
            }
        },
        [dynamicType, onEvent, value],
    )

    // 추가적인 조건이 필요하다면 여기에 작성
    useEffect(() => {
        if (dynamicType === 'initial') {
            setIsTriggered(true) // 초기값 활성화
        }
    }, [dynamicType])

    return { isTriggered, handleDynamicEvent }
}

export default useTriggerDynamicClass

*/
