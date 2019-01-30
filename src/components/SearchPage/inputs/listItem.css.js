import styled from 'styled-components';

const ListItem = styled.li`
  display: ${props => (props.disabled ? 'none' : 'flex')};
  align-items: center;
  cursor: pointer;
  label {
    padding: 4px 0;
    pointer: 'pointer';
  }
  input[:radio]::focus {
    outline: none;
  }
`;

export default ListItem;
