import { useState, useCallback } from 'react';

export const useCalcScore = () => {
  const [playerScore, setPlayerScore] = useState(0);

  const score = useCallback(stage => {
    let rowsCleared = 0;
    const clonedStage = JSON.parse(JSON.stringify(stage));
    const newStage = clonedStage.reduce((ack, row) => {
      if (row.findIndex(cell => cell[0] === 0) === -1) {
        rowsCleared += 1;
        setPlayerScore(prev => prev + 10 * rowsCleared);
        ack.unshift(new Array(clonedStage[0].length).fill([0, 'clear']));
        return ack;
      }
      ack.push(row);
      return ack;
    }, []);
    return newStage;
  }, []);
  return [score, setPlayerScore, playerScore];
};
