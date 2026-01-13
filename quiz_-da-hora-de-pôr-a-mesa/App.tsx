import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { quizQuestions } from './data/questions';
import { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState(GameState.PLAYING);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setGameState(GameState.PLAYING); 
    } else {
      setGameState(GameState.RESULT);
    }
  };

  const restartGame = () => {
    setGameState(GameState.START);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white">
      {gameState === GameState.START && (
        <StartScreen onStart={startGame} />
      )}

      {(gameState === GameState.PLAYING || gameState === GameState.FEEDBACK) && (
        <QuizScreen 
          key={currentQuestionIndex}
          question={quizQuestions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions.length}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
        />
      )}

      {gameState === GameState.RESULT && (
        <ResultScreen 
          score={score} 
          totalQuestions={quizQuestions.length} 
          onRestart={restartGame} 
        />
      )}
    </div>
  );
}

export default App;