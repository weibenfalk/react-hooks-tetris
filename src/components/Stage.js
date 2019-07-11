import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const StyledStage = styled.div`
  display: grid;
  margin: 40px 0 0 0;
  grid-template-rows: repeat(${props => props.height}, 3vw);
  grid-template-columns: repeat(${props => props.width}, 3vw);
  grid-gap: 1px;
  justify-content: center;
  align-content: center;
`;

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row, y) => (
      <React.Fragment key={y}>
        {row.map((cell, x) => (
          <Cell key={x} type={cell[0]} />
        ))}
      </React.Fragment>
    ))}
  </StyledStage>
);

export default Stage;
