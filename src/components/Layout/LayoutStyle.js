import styled from 'styled-components'
import { styledCore } from '../../core'

export const StyledBox = styled.div`
    ${(props) => (props.$styles ? styledCore(props.$styles) : '')}
`
