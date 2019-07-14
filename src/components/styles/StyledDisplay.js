import styled from 'styled-components';

export const StyledDisplay = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin: 0 0 20px 20px;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
`;
