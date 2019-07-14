import { useState, useCallback } from 'react';

export const useCalcScore = level => {
  const [playerScore, setPlayerScore] = useState(0);
  const [clearedLines, setClearedLines] = useState(0);

  const score = useCallback(
    stage => {
      const calculateScore = lines => {
        const linePoints = [40, 100, 300, 1200];
        setPlayerScore(prev => prev + linePoints[lines - 1] * (level + 1));
      };

      let rowsCleared = 0;
      const clonedStage = JSON.parse(JSON.stringify(stage));
      const newStage = clonedStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          rowsCleared += 1;
          ack.unshift(new Array(clonedStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);
      if (rowsCleared > 0) {
        calculateScore(rowsCleared);
        setClearedLines(prev => prev + rowsCleared);
      }
      return newStage;
    },
    [level]
  );
  return [score, setPlayerScore, playerScore, setClearedLines, clearedLines];
};
