import { useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const ShadowComponent = () => {
    const hostRef = useRef(null) // Shadow DOM 붙일 대상 ref
    const shadowRef = useRef(null) // Shadow Root 저장용

    useEffect(() => {
        if (hostRef.current && !shadowRef.current) {
            // Shadow DOM 생성 (open 모드)
            shadowRef.current = hostRef.current.attachShadow({ mode: 'open' })

            // Shadow DOM 내부에 React 렌더링
            const shadowRoot = createRoot(shadowRef.current)
            shadowRoot.render(
                <div>
                    <style>{`
            h1 { color: red; }
            p { font-size: 14px; }
          `}</style>
                    <h1>Hello from Shadow DOM</h1>
                    <p>This content is encapsulated.</p>
                </div>
            )
        }
    }, [])

    return (
        <div ref={hostRef}></div> // Shadow DOM 붙일 대상
    )
}

export default ShadowComponent
