import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { IQuestion } from '../types/quiz';

export enum QuizStatus {
  DEFAULT,
  RUNNING,
  FINISHED,
}

export interface IQuizContext {
  data: IQuestion[] | undefined;
  score: number;
  setData: (data: IQuestion[]) => void;
  currentQuestionIdx: number;
  status: QuizStatus;
  setStatus: (newStatus: QuizStatus) => void;
  onAnswer: (isRight: boolean) => void;
  onTimeEnd: () => void;
}

const QuizContext = createContext<IQuizContext | null>(null);

export const useQuizContext = () => useContext(QuizContext);

export const QuizContextWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [data, setData] = useState<IQuestion[]>();
  const [score, setScore] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [status, setStatus] = useState(QuizStatus.DEFAULT);

  useEffect(() => {
    if (status === QuizStatus.DEFAULT) {
      setScore(0);
      setCurrentQuestionIdx(0);
    }
  }, [status]);

  const onFinish = () => {
    setStatus(QuizStatus.FINISHED);
  }

  const changeAnswer = () => {
    if (currentQuestionIdx < data?.length! - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (currentQuestionIdx === data?.length! - 1) {
      onFinish();
    }
  }

  const onTimeEnd = () => {
    changeAnswer();
  }

  const onAnswer = (isRight: boolean) => {
    if (status !== QuizStatus.RUNNING) {
      return;
    }

    if (isRight) {
      setScore(score + 1);
    }

    changeAnswer();
  }

  return <QuizContext.Provider value={{data, score, setData, onAnswer, onTimeEnd, status, setStatus, currentQuestionIdx}}>
    {children}
    </QuizContext.Provider>;
}