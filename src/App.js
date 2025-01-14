import Box from './components/Layout/Box'
import { useState } from 'react'

// 아예 App.js의 리턴문 바깥에 두거나
const BoxStyle = {
    color: 'black',
    fontSize: '20px',
    boxSizing: 'border-box',
    border: '1px solid black',
    outline: '0px',
    width: '500px',
    margin: '30px auto 0 30px',
    backgroundColor: 'white',
    justifyContent: 'center',
    hover: {
        color: 'white',
        backgroundColor: 'black',
    },
    position: 'relative',
    after: {
        position: 'absolute',
        content: '"hello"',
        left: '0px',
        top: '0px',
    },
    dynamic: {
        color: 'blue',
        hover: {
            backgroundColor: '#cccccc',
            fontStyle: 'italic',
            color: 'red',
        },
    },
}

function App() {
    const [value, setValue] = useState('')
    const [showPage, setShowPage] = useState(false)

    return (
        <>
            <Box type="input" value={value} onChange={(e) => setValue(e.target.value)} dynamicType="onChange" {...BoxStyle} />
            <Box type="div" onClick={() => setShowPage((prev) => !prev)} dynamicType="onClick" {...BoxStyle2}>
                Click to Apply Dynamic Style
            </Box>
            <Box
                type="div"
                dynamicType="onMouseEnter"
                dynamic={{
                    color: 'green',
                    hover: { backgroundColor: 'yellow' },
                }}
                onMouseEnter={() => console.log('Mouse Entered!')}
                onMouseLeave={() => console.log('Mouse Left!')}>
                Hover Over Me
            </Box>
        </>
    )
}

/*
리턴문이 끝난 뒤 두개가 가능하단 말이였어

function App () => {
    여기에 스타일 코드를 적지않고

    return(
    <>
        <div>
    </>
    )
}
    
*/
const BoxStyle2 = {
    userSelect: 'none',
    color: 'black',
    fontSize: '20px',
    border: '1px solid black',
    outline: '0px',
    width: '500px',
    margin: '30px auto 0 30px',
    backgroundColor: 'white',
    justifyContent: 'end',
    padding: '0 20px',
    boxSizing: 'border-box',
    textAlign: 'right',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    hover: {
        color: 'green',
        backgroundColor: 'black',
    },
    position: 'relative',
    after: {
        position: 'absolute',
        content: '"hello"',
        left: '30px',
        top: '3px',
        fontSize: '16px',
        transition: 'all 0.5s ease',
    },
    before: {
        position: 'absolute',
        content: '"Click to Change Opacity"',
        right: '-220px',
        top: '0px',
    },
    dynamic: {
        color: 'blue',
        backgroundColor: 'pink',
        padding: '0 200px',
        after: {
            fontSize: '12px',
            left: '460px',
            top: '6px',
            transition: 'all 0.5s ease',
        },
        before: {
            opacity: '0',
            transition: 'all 0.5s ease',
        },
        hover: {
            backgroundColor: 'red',
            color: 'white',
        },
    },
}

export default App
