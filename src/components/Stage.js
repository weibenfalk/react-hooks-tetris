import React from 'react';
import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';

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
