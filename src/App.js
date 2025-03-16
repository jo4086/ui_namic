import Box from './components/Layout/Box'
import { useState } from 'react'
import NavButton from './components/Navigate/NavButton'
import './css/test.css'

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

            <Box type="table" display="talbe" className="div_1" onClick={() => setShowPage((prev) => !prev)} dynamicType="onClick" {...BoxStyle2}>
                <Box type="thead"></Box>
            </Box>
            <Box type="div" display="flex" className="div_1" onClick={() => setShowPage((prev) => !prev)} dynamicType="onClick" {...BoxStyle2}>
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

            {/* <div className="container">
                <div className="item2">1</div>
                <div className="item2">2</div>
                <div className="item2">3</div>
                <div className="item2">4</div>
                <div className="item2">5</div>
                <div className="item2">6</div>
                <div className="item2">7</div>
                <div className="item2">8</div>
                <div className="item2">9</div>
                <div className="item2">10</div>
                <div className="item2">11</div>
                <div className="item2">12</div>
            </div> */}

            {/* <div className="container">
                <header className="common header">Header</header>
                <main className="common main">
                    <Box className="section_common section1 ">Box</Box>
                    <section className="section_common section2">section</section>
                    <section className="section_common section3">section</section>
                    <aside className="section_commonsection_common aside">Aside</aside>
                    <footer className="common footer">Footer</footer>
                </main>
            </div> */}
        </>
    )
}

export default App
const BoxStyle2 = {
    // transType: [{ move: '0.5s ease 1' }, { scale: '0.5s ease 1' }],
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
    //  transition: 'color 0.5s ease, padding 0.5s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    hover: {
        color: 'green',
        backgroundColor: 'black',
        //   animation: 'hover s ease-in-out 1',
    },
    position: 'relative',
    after: {
        // all: 'initial',
        position: 'absolute',
        content: '"hello"',
        // color: 'inherit',
        left: '30px',
        top: '3px',
        fontSize: '16px',
        // transition: 'left 0.5s ease, top 0.5s ease, font-size 0.5s ease',
        transition: 'all 0.5s ease',
        // transition: 'all 3s ease',
        //   transition: 'top 0.5s ease, left 0.5s ease,  font-size 0.5s ease',
        //   transition: 'left 0.5s ease, fontSize 0.5s ease, top 0.5s ease',
    },
    before: {
        color: 'red',
        position: 'absolute',
        content: '"Click to Change Opacity"',
        right: '-220px',
        top: '0px',
        transition: 'opacity 0.5s ease',
    },
    dynamic: {
        color: 'blue',
        backgroundColor: 'pink',
        padding: '0 200px',
        after: {
            fontSize: '12px',
            left: '460px',
            top: '6px',
            // transition: 'left 0.5s ease, top 0.5s ease, font-size 0.5s ease',
            transition: 'all 0.5s ease',
            // transition: 'top 0.5s ease, left 0.5s ease,  font-size 0.5s ease',
            // transition: 'top 3s ease, left 3s ease, font-size 3s ease',
            // transition: 'left 0.5s ease, fontSize 0.5s ease, top 0.5s ease',
            // transition: 'all 3s ease',
        },
        before: {
            opacity: '0',
            transition: 'opacity 0.5s ease',
            // transition: 'opacity 2s ease',
        },
        hover: {
            backgroundColor: 'red',
            color: 'white',
        },
    },
    //  media: {
    //      min: 768,
    //      max: 1024,
    //      style: {
    //          width: '200px',
    //          height: '50px',
    //      },
    //  },
    //  animation: 'start 1s ease-in-out 1',

    //  keyframe: {
    //      name: 'start',
    //      0: {
    //          transform: 'translateX(-20%)',
    //          opacity: 0,
    //      },

    //      to: {
    //          opacity: 1,
    //      },
    //  },
    //  keyframe: {
    //      name: 'hover',
    //      0: {
    //          opacity: 1,
    //      },

    //      to: {
    //          transform: 'translateX(-20%)',
    //          opacity: 0,
    //      },
    //  },
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
        //   animation: 'scale 0.5s ease-in-out forwards',
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
    //  keyframe: {
    //      name: 'translate',
    //      0: {
    //          transform: 'translateX(-50%)',
    //          opacity: 0,
    //      },
    //      to: {
    //          opacity: 1,
    //      },
    //  },
}

const boxMedia2 = {
    media: {
        self: [
            {
                min: 768,
                max: 1023,
                styles: {
                    width: '200px',
                    height: '50px',
                    keyframes: {
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
                    },
                },
            },
            { min: 1024, max: 1279, styles: { width: '300px', height: '100px' } },
        ],
        down: [
            { max: 1023, styles: { width: '200px', height: '50px' } },
            { max: 1279, styles: { width: '300px', height: '100px' } },
        ],
        up: [
            { min: 768, styles: { width: '200px', height: '50px' } },
            { min: 1280, styles: { width: '300px', height: '100px' } },
        ],
    },
}

const boxMedia = {
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
}

const BoxAnimation = {
    move: {
        duration: '3s',
        iteration: 1,
        timingFunction: 'ease',
        keyframes: {
            0: { transform: 'translateX(0%)', opacity: 1, easing: 'ease-in' },
            15: { transform: 'translateX(50%)', opacity: 0, easing: 'ease-in-out' },
            70: { transform: 'translateX(75%)', opacity: 0.5, easing: 'linear' },
            100: { transform: 'translateX(50%)', opacity: 0, cursor: 'default', easing: 'ease-out' },
        },
    },
    scale: {
        duration: '3s',
        count: 5,
        timingFunction: 'ease-in',
        frames: [
            { at: 0, css: { transform: 'scale(1)' } },
            { at: 100, css: { transform: 'scale(1.5)' } },
        ],
    },
}

const BoxAnimation4 = {
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
}

// keyframes: {
//     0: { transform: 'translateX(0%)', opacity: 1, easing: 'ease-in' },
//     15: { transform: 'translateX(50%)', opacity: 0, easing: 'ease-in-out' },
//     70: { transform: 'translateX(75%)', opacity: 0.5, easing: 'linear' },
//     100: {transform: 'translateX(50%)', opacity: 0, cursor: 'default', easing: 'ease-out'},
// }

// keyframes: [
//     { at: 0, transform: 'translateX(0%)', opacity: 1 },
//     { at: 15, transform: 'translateX(50%)', opacity: 0 },
//     { at: 70, transform: 'translateX(75%)', opacity: 0.5 },
//     { at: 100, transform: 'translateX(50%)', opacity: 0, cursor: 'default' },
// ],

function createAnimation(name, duration, timing, repeat, keyframes) {
    return { name, duration, timing, repeat, keyframes }
}

const BoxAnimation2 = {
    move: createAnimation('move', '1s', 'ease-in-out', 1, {
        0: { transform: 'translateX(0%)', opacity: 1 },
        100: { transform: 'translateX(50%)', opacity: 0 },
    }),
    scale: createAnimation('scale', '3s', 'linear', 5, {
        0: { transform: 'scale(1)' },
        100: { transform: 'scale(1.5)' },
    }),
}

const commonStyle = { one: '0.5s ease 1' }

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
