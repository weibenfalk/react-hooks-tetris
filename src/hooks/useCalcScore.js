import { useState, useCallback } from 'react';

export const useCalcScore = level => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);

  const calcScore = useCallback(
    stage => {
      const linePoints = [40, 100, 300, 1200];
      let rowsCleared = 0;

      const newStage = stage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          rowsCleared += 1;
          ack.unshift(new Array(stage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

      if (rowsCleared > 0) {
        // This is how original Tetris score is calculated
        setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
        setRows(prev => prev + rowsCleared);
      }
      return newStage;
    },
    [level]
  );
  return [calcScore, score, setScore, rows, setRows];
};
