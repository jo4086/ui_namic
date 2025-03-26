import createItem from '../generators/createItem'

const Box = createItem({
    type: 'div',
    display: 'flex',
    baseStyle: {
        border: '1px solid black',
        padding: '20px',
        width: '200px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 4px',
    },
})

export default Box
