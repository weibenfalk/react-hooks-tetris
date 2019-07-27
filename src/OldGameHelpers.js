export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // Using for loops to be able to return (and break). Not possible with forEach
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (
        // Check:
        // 1. That we're on a tetromino "cell"
        // 2. That we're inside the game areas height (y)
        // 3. That we're inside the game areas width (x)
        // 4. That the actual cell wer'e moving to isn't set to clear
        player.tetromino[y][x] !== 0 &&
        (stage[y + player.pos.y + moveY] &&
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX] &&
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1]) !==
          'clear'
      ) {
        return true;
      }
    }
  }
  return false;
};
