import React, { useState } from 'react';

import { fetchQuizQuestions } from "./components/Api";
import QuestionCard from "./components/QuestionCard";
import { QuestionState, Difficulty } from "./components/Api";
import {GlobalStyle,Wrapper} from "./App.styles";





export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 20;




 const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev )=> prev + 1);

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj])
    }



    };
    const nextQuestion = async () => {
      const nextquestion =number +1;
      if (nextquestion === TOTAL_QUESTIONS){
        setGameOver(true);

      }
      else{
        setNumber(nextquestion);
      }

    };
return (
  <>
  <GlobalStyle/>
      < Wrapper>
        <h1> BOOT CAMP RIDDLE</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>Strat Quiz</button>
        ) : null}
        { !gameOver ? <p className="score"> Score: {score}</p> : null}
        {loading && <p > Laoding Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />)}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (

          <button className="next" onClick={nextQuestion}>Next Question</button>) : null}
      </ Wrapper>
      </>

    )}
 
    export default App;

 




