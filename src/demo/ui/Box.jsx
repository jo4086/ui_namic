// ui/Box.jsx

import createItem from '../generators/createItem'
import globalStyle from './globalStyle'

const Box = createItem({
    type: 'div',
    display: 'flex',
    baseStyle: {
        ...globalStyle,
        border: '1px solid black',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 4px',
    },
})

export default Box
