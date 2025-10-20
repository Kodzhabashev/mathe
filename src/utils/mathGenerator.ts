import { MathProblem } from '../types';

export const generateMathProblem = (
  operation: '+' | '-' | '*' | '/',
  maxNumber: number = 100
): MathProblem => {
  let operand1: number;
  let operand2: number;
  let correctAnswer: number;

  switch (operation) {
    case '+':
      operand1 = Math.floor(Math.random() * maxNumber) + 1;
      operand2 = Math.floor(Math.random() * maxNumber) + 1;
      correctAnswer = operand1 + operand2;
      // Ensure result doesn't exceed maxNumber
      while (correctAnswer > maxNumber) {
        operand1 = Math.floor(Math.random() * maxNumber) + 1;
        operand2 = Math.floor(Math.random() * maxNumber) + 1;
        correctAnswer = operand1 + operand2;
      }
      break;

    case '-':
      operand1 = Math.floor(Math.random() * maxNumber) + 1;
      operand2 = Math.floor(Math.random() * maxNumber) + 1;
      // Ensure positive result
      if (operand1 < operand2) {
        [operand1, operand2] = [operand2, operand1];
      }
      correctAnswer = operand1 - operand2;
      break;

    case '*':
      operand1 = Math.floor(Math.random() * 10) + 1; // Smaller numbers for multiplication
      operand2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = operand1 * operand2;
      // Ensure result doesn't exceed maxNumber
      while (correctAnswer > maxNumber) {
        operand1 = Math.floor(Math.random() * 10) + 1;
        operand2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = operand1 * operand2;
      }
      break;

    case '/':
      correctAnswer = Math.floor(Math.random() * 10) + 1;
      operand2 = Math.floor(Math.random() * 10) + 1;
      operand1 = correctAnswer * operand2;
      // Ensure result doesn't exceed maxNumber
      while (operand1 > maxNumber) {
        correctAnswer = Math.floor(Math.random() * 10) + 1;
        operand2 = Math.floor(Math.random() * 10) + 1;
        operand1 = correctAnswer * operand2;
      }
      break;

    default:
      throw new Error('Invalid operation');
  }

  return {
    id: Date.now() + Math.random(),
    operation,
    operand1,
    operand2,
    correctAnswer,
  };
};

export const generateSessionProblems = (totalProblems: number = 100): MathProblem[] => {
  const problems: MathProblem[] = [];

  // Generate problems divided equally among 4 operations
  const operations: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/'];
  const problemsPerOperation = Math.floor(totalProblems / operations.length);

  operations.forEach(operation => {
    for (let i = 0; i < problemsPerOperation; i++) {
      problems.push(generateMathProblem(operation));
    }
  });

  // Add remaining problems to the first operation if total doesn't divide evenly
  const remainingProblems = totalProblems % operations.length;
  for (let i = 0; i < remainingProblems; i++) {
    problems.push(generateMathProblem(operations[0]));
  }

  // Shuffle the problems
  for (let i = problems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [problems[i], problems[j]] = [problems[j], problems[i]];
  }

  return problems;
};
