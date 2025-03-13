import styled from 'styled-components'
import { styledCore } from '../../core'

export const StyledBox = styled.div`
    ${(props) => (props.$styles ? styledCore(props.$styles) : '')}
`

const keyframes = [
    {
        name: 'move',
        duration: '1s',
        count: 2,
        timingFunction: 'ease-out',
        frames: [
            { at: 0, css: { transform: 'translateX(0%)' } },
            { at: 15, css: { transform: 'translateX(50%)', opacity: 0 } },
            { at: 40, css: { transform: 'translateX(75%)', opacity: 0.5 } },
            { at: 100, css: { transform: 'translateX(100%)', opacity: 1 } },
        ],
    },
    {
        name: 'scale',
        duration: '3s',
        count: 1,
        timingFunction: 'ease',
        keyframes: [
            { at: 0, css: { transform: 'scale(1)' } },
            { at: 15, css: { transform: 'scale(1.5)', opacity: 0 } },
            { at: 40, css: { transform: 'scale(2)', opacity: 0.5 } },
            { at: 100, css: { transform: 'scale(3)', opacity: 1 } },
        ],
    },
]

const keyframe = {
    move: {
        duration: '3s',
        count: 1,
        timingFunction: 'ease',
        styles: [
            { at: 0, transform: 'translateX(0%)', opacity: 1 },
            { at: 15, transform: 'translateX(50%)', opacity: 0 },
            { at: 70, transform: 'translateX(75%)', opacity: 0.5 },
            { at: 100, transform: 'translateX(50%)', opacity: 0, cursor: 'default' },
        ],
    },
    scale: {
        duration: '3s',
        count: 1,
        timingFunction: 'ease',
        keyframes: [
            { at: 0, css: { transform: 'scale(1)' } },
            { at: 15, css: { transform: 'scale(1.5)', opacity: 0 } },
            { at: 40, css: { transform: 'scale(2)', opacity: 0.5 } },
            { at: 100, css: { transform: 'scale(3)', opacity: 1 } },
        ],
    },
}

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
