import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

import { useCalcScore } from './useCalcScore';
import { useStage } from './useStage';

export const useUpdate = (player, resetPlayer, level, updateStage, sweepRows) => {
  // const [stage, setStage] = useState(createStage());
  const [calcScore, score, setScore, rows, setRows] = useCalcScore(level);
  // const [stage, setStage, updateStage, sweepRows, rowsCleared] = useStage(player);

  // This one updates the stage
  useEffect(() => {
    const reDraw = prevStage => {
      // First flush the stage
      // const newStage = prevStage.map(row =>
      //   row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      // );

      // // Then draw the tetromino
      // player.tetromino.forEach((row, y) => {
      //   row.forEach((value, x) => {
      //     if (value !== 0) {
      //       newStage[y + player.pos.y][x + player.pos.x] = [
      //         value,
      //         `${player.collided ? 'merged' : 'clear'}`,
      //       ];
      //     }
      //   });
      // });
      updateStage();

      // Then check if we got some score if collided
      if (player.collided) {
        // return calcScore(newStage);
        // sweepRows();
        resetPlayer();
      }
      // return newStage;
    };
    reDraw()
    // setStage(prev => reDraw(prev));
  }, [
    calcScore,
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  return [score, setScore, rows, setRows];
};
