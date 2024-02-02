import { FC } from "react";
import { IAnswer } from "../../../types/quiz";
import styles from './styles.module.css';
import cls from 'classnames';

export interface IQuizAnswerProps {
  answer: IAnswer;
  onAnswer: (answer: IAnswer) => void;
  isResultShown: boolean;
  id: string,
}

export const QuizAnswer: FC<IQuizAnswerProps> = ({ answer, onAnswer, isResultShown, id}) => {
  const onChoseAnswer = () => {
    onAnswer(answer);
  }

  return (
    <div 
      id={id} 
      className={cls(styles.answer, {
        [styles.right]: isResultShown && answer.isRight,
        [styles.wrong]: isResultShown && !answer.isRight,
      })} 
      tabIndex={0} 
      onClick={onChoseAnswer}
    >
      {answer.text}
    </div>
  );
}