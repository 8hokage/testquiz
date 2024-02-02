import React, { useState, useEffect, useRef, FC } from 'react';
import styles from './styles.module.css';
import cls from 'classnames';
import { IQuizContext, useQuizContext } from '../../../contexts/QuizContext';

export interface ICountdownTimerProps {
  initialSeconds: number;
  onFinish: () => void;
  className?: string;
}

export const CountdownTimer: FC<ICountdownTimerProps> = ({ initialSeconds, onFinish, className }) => {
  const {currentQuestionIdx, onTimeEnd} = useQuizContext() as IQuizContext;
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [currentQuestionIdx, initialSeconds]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIdx]);

  useEffect(() => {
    if (seconds === 0) {
      onTimeEnd();
      clearInterval(timerRef.current);
    }
  }, [onFinish, onTimeEnd, seconds]);

  const remainingSeconds = seconds % 60;

  const formattedTime = `${remainingSeconds.toString().padStart(2, '0')}`;

  return (
    <div className={cls(styles.timer, className)}>{formattedTime}</div>
  );
}