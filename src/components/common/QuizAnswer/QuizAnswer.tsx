import { FC, useState } from "react";
import { IAnswer } from "../../../types/quiz";
import styles from './styles.module.css';
import { IQuizContext, QuizStatus, useQuizContext } from "../../../contexts/QuizContext";
import cls from 'classnames';

export interface IQuizAnswerProps {
  answer: IAnswer;
}

export const QuizAnswer: FC<IQuizAnswerProps> = ({ answer: {text, isRight = false}}) => {
  const {onAnswer, status} = useQuizContext() as IQuizContext;
  const [isWrong, setIsWrong] = useState(false);
  const onChoseAnswer = () => {
    if (!isRight && status !== QuizStatus.FAILED) {
      setIsWrong(true);
    }
    onAnswer(isRight)
  }

  return <div className={cls(styles.answer, {
    [styles.wrong]: isWrong,
  })} tabIndex={0} onClick={onChoseAnswer}>
    {text}
  </div>
}