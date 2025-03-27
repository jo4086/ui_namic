import createItem from '../generators/createItem'

const Button = createItem({
    type: 'button',
    display: 'inline-flex',
    baseStyle: {
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
})

export default Button
