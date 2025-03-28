// pages/Demo.jsx
import Box from '../ui/Box'
import Button from '../ui/Button'
import CardContainer from '../components/CardContainer'

const BoxStyle = {
    width: '200px',

    keyframes: {},
}

const commonStyle = { one: '0.5s ease 1' }

const BoxStyle4 = {
    userSelect: 'none',
    color: 'black',
    fontSize: '20px',
    border: '1px solid black',
    outline: 0,
    // outline: '0px',
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
        range: [
            { min: 768, max: 1023, width: '200px', height: '50px' },
            { min: 1024, max: 1279, width: '300px', height: '100px' },
        ],
        down: [
            { point: 1023, width: '200px', height: '50px' },
            { point: 1279, width: '300px', height: '100px' },
            { point: 1439, width: '400px', height: '150px' },
        ],
        up: [
            { point: 768, width: '200px', height: '50px' },
            { point: 1280, width: '300px', height: '100px' },
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

const restProps = {
    height: '100px',
    width: '500px',
}

const Demo = () => {
    return (
        <>
            <Box dynamicStyle={BoxStyle4} {...restProps}></Box>
        </>
        /*     <CardContainer>
            <Box dynamicStyle={BoxStyle} {...restProps} type="input">
                Block Level Flex Box
            </Box>

            <Button>Click</Button>
        </CardContainer> */
    )
}

export default Demo
