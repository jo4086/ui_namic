import Box from './components/Layout/Box'
import { useState } from 'react'
import NavButton from './components/Navigate/NavButton'

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
            {/* <Box type="input" value={value} onChange={(e) => setValue(e.target.value)} dynamicType="onChange" {...BoxStyle} /> */}
            <Box type="div" onClick={() => setShowPage((prev) => !prev)} dynamicType="onClick" {...BoxStyle2}>
                Click to Apply Dynamic Style
            </Box>
            <Box type="div" onClick={() => setShowPage((prev) => !prev)} dynamicType="onClick" {...BoxStyle3}>
                Click to Apply Dynamic Style
            </Box>
            {/* <Box
                type="div"
                dynamicType="onMouseEnter"
                dynamic={{
                    color: 'green',
                    hover: { backgroundColor: 'yellow' },
                }}
                onMouseEnter={() => console.log('Mouse Entered!')}
                onMouseLeave={() => console.log('Mouse Left!')}>
                Hover Over Me
            </Box> */}
            {/* <NavButton to='/origin' >Link</NavButton> */}
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
        animation: 'hover 1s ease-in-out 1',
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
    media: {
        min: 768,
        max: 1024,
        style: {
            width: '200px',
            height: '50px',
        },
    },
    animation: 'start 1s ease-in-out 1',

    keyframe: {
        name: 'start',
        0: {
            transform: 'translateX(-20%)',
            opacity: 0,
        },

        to: {
            opacity: 1,
        },
    },
    keyframe: {
        name: 'hover',
        0: {
            opacity: 1,
        },

        to: {
            transform: 'translateX(-20%)',
            opacity: 0,
        },
    },
}

const BoxStyle3 = {
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
        animation: 'scale 0.5s ease-in-out forwards',
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
    media: {
        min: 768,
        max: 1024,
        style: {
            width: '200px',
            height: '50px',
        },
    },
    animation: 'translate 1s 1',

    keyframe: {
        name: 'scale',
        0: {
            transform: 'translateX(0%)',
            opacity: 1,
        },
        to: {
            transform: 'translateX(50%)',
            opacity: 0,
            cursor: 'default',
        },
    },
    keyframe: {
        name: 'translate',
        0: {
            transform: 'translateX(-50%)',
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    },
}

export default App
