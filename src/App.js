import Box from './components/Layout/Box'
import { useState } from 'react'

function App() {
    const [value, setValue] = useState('')
    return (
        <>
            <Box type="input" value={value} onChange={(e) => setValue(e.target.value)} dynamicType="onChange" {...BoxStyle} />
            {/* <Box {...style2}>Hi</Box> */}
        </>
    )
}

const BoxStyle = {
    color: 'black',
    fontSize: '20px',
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
            backgroundColor: 'gray',
            fontWeight: 'bold',
            color: 'pink',
        },
    },
}

const style2 = {
    color: 'red',
    margin: '20px',
    border: '1px solid black',
    width: '200px',
    position: 'relative',

    after: {
        content: '"hihi"',
        position: 'absolute',
        top: '0px',
        right: '0px',
    },
   
}
export default App
