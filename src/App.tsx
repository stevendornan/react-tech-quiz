import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'
import QuestionCard from './components/QuestionCard'
import { QuestionState, Difficulty } from './API'
import './App.css'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [quizOver, setQuizOver] = useState(true)
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)

  const startQuiz = async () => {
    setLoading(true)
    setQuizOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty)

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) setScore((prev) => prev + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setQuizOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <h1>REACT TECH QUIZ</h1>
      <div className='quiz-container'>
        {quizOver && (
          <>
            <h2>Select Difficulty:</h2>
            <select
              name='difficulty'
              value={difficulty}
              onChange={(e: any) => setDifficulty(e.target.value)}
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </>
        )}

        {quizOver ? (
          <>
            {userAnswers.length === TOTAL_QUESTIONS &&
            score !== TOTAL_QUESTIONS ? (
              <h2>
                You Scored: {score} out of {TOTAL_QUESTIONS}
              </h2>
            ) : score === TOTAL_QUESTIONS ? (
              <h2>
                Congratulations! You Scored: {score} out of {TOTAL_QUESTIONS}{' '}
              </h2>
            ) : null}
            {userAnswers.length === TOTAL_QUESTIONS &&
            score !== TOTAL_QUESTIONS ? (
              <button className='start' onClick={startQuiz}>
                Try Again?
              </button>
            ) : (
              <button className='start' onClick={startQuiz}>
                Start
              </button>
            )}
          </>
        ) : (
          <>
            {loading && <p>Loading Questions...</p>}

            {!loading && !quizOver && (
              <QuestionCard
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
            )}

            {!quizOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 ? (
              <button className='next' onClick={nextQuestion}>
                Next Question
              </button>
            ) : number === TOTAL_QUESTIONS - 1 ? (
              <button className='next' onClick={nextQuestion}>
                End Quiz
              </button>
            ) : null}
          </>
        )}
      </div>
    </>
  )
}

export default App
