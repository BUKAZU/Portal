import styled from 'styled-components'

const ListItem = styled.li `
    opacity: ${props => props.disabled ? '0.3' : '1'};
    display: flex;
    align-items: center;
    cursor: pointer;
    label {
        padding: 4px 0;
        pointer: 'pointer';
    }
    input[:radio]::focus {
        outline: none
    }
`

export default ListItem