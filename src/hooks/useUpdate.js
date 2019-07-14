import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useUpdate = (player, score, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  // This one updates the stage
  useEffect(() => {
    const reDraw = _stage => {
      // First flush the stage
      const newStage = _stage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // Then check if we got some score
      if (player.collided) {
        resetPlayer();
        return score(newStage);
      }
      return newStage;
    };

    setStage(prev => reDraw(prev));
  }, [player.collided, player.position, player.tetromino, resetPlayer, score]);

  return [stage, setStage];
};
