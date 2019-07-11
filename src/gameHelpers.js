export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (_player, stage, { x: moveX, y: moveY }) => {
  // Using for loops to be able to return (and break). Not possible with forEach
  for (let y = 0; y < _player.tetromino.length; y += 1) {
    for (let x = 0; x < _player.tetromino[y].length; x += 1) {
      if (
        _player.tetromino[y][x] !== 0 &&
        (stage[y + _player.position.y + moveY] &&
          stage[y + _player.position.y + moveY][
            x + _player.position.x + moveX
          ] &&
          stage[y + _player.position.y + moveY][
            x + _player.position.x + moveX
          ][1]) !== 'clear'
      ) {
        return true;
      }
    }
  }
  return false;
};
