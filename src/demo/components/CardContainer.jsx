import styled from '../utils/styled'
import Box from '../ui/Box'

const CardContainer = styled(Box)({
    padding: '24px',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#ccc',
})

// const CardContainer = styled(Box)(({ theme }) => ({
//     padding: '24px',
//     borderRadius: '16px',
//     backgroundColor: '#fff',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
// }))

export default CardContainer
