import { useState } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = player => {
  const [stage, setStage] = useState(createStage());
  let rowsCleared = 0;

  const sweepRows = newStage => {
    return newStage.reduce((ack, row) => {
      if (row.findIndex(cell => cell[0] === 0) === -1) {
        rowsCleared += 1;
        ack.unshift(new Array(stage[0].length).fill([0, 'clear']));
        return ack;
      }
      ack.push(row);
      return ack;
    }, []);
  };

  const updateStage = () => {
    // First flush the stage
    const newStage = stage.map(row =>
      row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
    );

    // Then draw the tetromino
    player.tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y + player.pos.y][x + player.pos.x] = [
            value,
            `${player.collided ? 'merged' : 'clear'}`,
          ];
        }
      });
    });
    if (player.collided) {
      setStage(sweepRows(newStage));
    } else {
      setStage(newStage);
    }
  };

  return [stage, setStage, updateStage, sweepRows, rowsCleared];
};
