import { FC } from "react";
import { IQuestion } from "../../types/quiz";
import { QuizAnswer } from "../common/QuizAnswer/QuizAnswer";
import styles from './styles.module.css';

export interface IQuizQuestionProps {
  question: IQuestion;
}

export const QuizQuestion: FC<IQuizQuestionProps> = ({question: {questionText, answers, answerTime=2000}}) => {
  
  return (
    <div>
      <p className={styles.text}>{questionText}</p>
      <div className={styles.answers}>
      {answers.map((answer) => {
        return <QuizAnswer 
          key={answer.text} 
          answer={answer} 
        />
      })}
      </div>
    </div>
  )
}