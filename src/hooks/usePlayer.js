import { useState, useCallback } from 'react';

import { randomTetromino } from '../tetrominos';
import { checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false,
  });

  function rotate(matrix, dir) {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((___, index) =>
      matrix.map(column => column[index])
    );
    // Reverse each row to get a rotaded matrix
    if (dir > 0) return mtrx.map(row => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(dir, stage) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    const pos = clonedPlayer.position.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.position.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: 0, y: 0 },
      tetromino: randomTetromino().shape,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, playerRotate];
};
