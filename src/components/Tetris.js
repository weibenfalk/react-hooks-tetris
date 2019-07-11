import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useUpdate } from '../hooks/useUpdate';
import { useCalcScore } from '../hooks/useCalcScore';

import Stage from './Stage';

const Tetris = () => {
  console.log('re-render');
  const [dropTime, setDropTime] = useState(null);
  const [level, setLevel] = useState(1);

  // Custom Hooks
  const [calculateScore, setPlayerScore, playerScore] = useCalcScore();
  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useUpdate(player, calculateScore, resetPlayer);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPosition({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    // Activate the interval again when user releases down arrow.
    if (keyCode === 40) {
      setDropTime(1000);
    }
  };

  const drop = () => {
    // if (playerScore > 50) setDropTime(700);
    // if (playerScore > 100) setDropTime(500);
    // if (playerScore > 150) setDropTime(400);
    // if (playerScore > 200) setDropTime(300);
    // if (playerScore > 250) setDropTime(200);
    // if (playerScore > 300) setDropTime(100);

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setPlayerScore(0);
  };

  const stopGame = () => {
    setDropTime(null);
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (keyCode === 37) {
      movePlayer(-1);
    } else if (keyCode === 39) {
      movePlayer(1);
    } else if (keyCode === 40) {
      dropPlayer();
    } else if (keyCode === 81 || keyCode === 38) {
      playerRotate(-1, stage);
    } else if (keyCode === 87) {
      playerRotate(1, stage);
    }
  };

  return (
    <div role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <button type="button" onClick={startGame}>
        Start Game
      </button>
      <button type="button" onClick={stopGame}>
        Stop Game
      </button>
      <div>Score: {playerScore}</div>
      <Stage stage={stage} />
    </div>
  );
};

export default Tetris;
