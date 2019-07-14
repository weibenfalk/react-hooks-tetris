import React, { useState } from 'react';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { createStage, checkCollision } from '../gameHelpers';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useUpdate } from '../hooks/useUpdate';
import { useCalcScore } from '../hooks/useCalcScore';

import Stage from './Stage';
import Display from './Display';

const Tetris = () => {
  const [level, setLevel] = useState(0);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Custom Hooks
  const [
    calculateScore,
    setPlayerScore,
    playerScore,
    setClearedLines,
    clearedLines,
  ] = useCalcScore(level);
  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useUpdate(player, calculateScore, resetPlayer);

  console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPosition({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setPlayerScore(0);
    setLevel(0);
    setClearedLines(0);
    setGameOver(false);
  };

  const stopGame = () => {
    setDropTime(null);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (clearedLines > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // TODO: NEED TO FIND A BETTER FORMULA FOR THIS
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.position.y < 1) {
        console.log('GAME OVER!!!');
        stopGame();
        setGameOver(true);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
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
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <div>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${playerScore}`} />
              <Display text={`Lines: ${clearedLines}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <button type="button" onClick={startGame}>
            Start Game
          </button>
          <button type="button" onClick={stopGame}>
            Stop Game
          </button>
        </div>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
