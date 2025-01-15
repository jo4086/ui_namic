import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { styledCore } from '../../core'

export const StyledNavButton = styled(Link)`
    width: 60px;
    height: 30px;
    &:hover {
        color: blue;
    }

    ${(props) => (props.$styles ? styledCore(props.$styles) : '')}
`
