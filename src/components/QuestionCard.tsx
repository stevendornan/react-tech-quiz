import React from 'react'
import { AnswerObject } from '../App'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNr: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div>
    <div className='quiz-header'>
      <p className='number'>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
    </div>

    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button
            disabled={userAnswer ? true : false}
            style={{
              backgroundColor:
                userAnswer?.correctAnswer === answer
                  ? 'green'
                  : userAnswer?.correctAnswer !== answer &&
                    userAnswer?.answer === answer
                  ? 'red'
                  : null,
            }}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default QuestionCard
