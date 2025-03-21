import Box from './components/Layout/Box'
import { useState, useEffect } from 'react'
import NavButton from './components/Navigate/NavButton'
import './css/test.css'
import { Box as A } from '@mui/material'

function App() {
    const [value, setValue] = useState('')
    const [showPage, setShowPage] = useState(false)
    const spreadMui = {
        m: 5,
        bgcolor: 'yellow',
    }

    return (
        <>
            {/* <Box>hello</Box> */}
            <Box className="Container" onClick={() => setShowPage((prev) => !prev)} dynamicStyle={BoxStyle4} dynamicType="onClick" type="div" display="flex" {...spreadStyle}>
                hello
            </Box>
            <Box type="div" display="flex" className="div_1" onClick={() => setShowPage((prev) => !prev)} dynamicType="onClick" {...BoxStyle4}>
                Click to Apply Dynamic Style
            </Box>

            {/* <A {...spreadMui} sx={{ m: 10, bgcolor: 'green' }}>
                mui Box1
            </A>
            <A sx={{ m: 10, bgcolor: 'pink' }} {...spreadMui}>
                mui Box2
            </A>
            <A {...spreadMui}>mui Box3</A>
            <A sx={{ m: 10 }} {...spreadMui}>
                mui Box4
            </A>
            <A style={{ margin: '80px' }}> mui Box3</A> */}
        </>
    )
}

export default App

const commonStyle = { one: '0.5s ease 1' }

const spreadStyle = {
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
    // transition: 'color 0.5s ease 1',
    transition: [`color ${commonStyle.one}`, `background-color ${commonStyle.one}`],
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
    media: {
        down: [
            { max: 600, width: '200px', height: '50px' },
            { max: 959, width: '300px', height: '100px' },
        ],
        down: [
            { min: 960, width: '200px', height: '50px' },
            { min: 1279, width: '300px', height: '100px' },
        ],
    },

    pseudo: {
        hover: {
            color: 'green',
            backgroundColor: 'black',
        },
        after: {
            position: 'absolute',
            content: '"hello"',
            left: '30px',
            top: '3px',
            fontSize: '16px',
            transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
        },
    },
}

const BoxStyle4 = {
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
    transition: [`color ${commonStyle.one}`, `background-color ${commonStyle.one}`],
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',

    keyframes: {
        move: {
            duration: '3s',
            iteration: 1,
            timingFunction: 'ease',
            percent: {
                0: { transform: 'translateX(0%)', opacity: 1, easing: 'ease-in' },
                15: { transform: 'translateX(50%)', opacity: 0, easing: 'ease-in-out' },
                70: { transform: 'translateX(75%)', opacity: 0.5, easing: 'linear' },
                100: { transform: 'translateX(50%)', opacity: 0, cursor: 'default', easing: 'ease-out' },
            },
        },
        scale: {
            animation: '3s 5 ease-in',
            percent: {
                0: { transform: 'scale(1)' },
                100: { transform: 'scale(1.5)' },
            },
        },
    },

    media: {
        self: [
            { min: 768, max: 1023, width: '200px', height: '50px' },
            { min: 1024, max: 1279, width: '300px', height: '100px' },
        ],
        down: [
            { max: 1023, width: '200px', height: '50px' },
            { max: 1279, width: '300px', height: '100px' },
        ],
        up: [
            { min: 768, width: '200px', height: '50px' },
            { min: 1280, width: '300px', height: '100px' },
        ],
    },

    pseudo: {
        hover: {
            color: 'green',
            backgroundColor: 'black',
        },
        after: {
            position: 'absolute',
            content: '"hello"',
            left: '30px',
            top: '3px',
            fontSize: '16px',
            transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
        },
        before: {
            color: 'red',
            position: 'absolute',
            content: '"Click to Change Opacity"',
            right: '-220px',
            top: '0px',
        },
    },

    dynamic: {
        color: 'blue',
        backgroundColor: 'pink',
        padding: '0 200px',

        pseudo: {
            hover: {
                backgroundColor: 'red',
                color: 'white',
            },
            after: {
                position: 'absolute',
                content: '"hello"',
                left: '30px',
                top: '3px',
                fontSize: '16px',
                transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
            },
            before: {
                opacity: '0',
            },
        },
    },
}
