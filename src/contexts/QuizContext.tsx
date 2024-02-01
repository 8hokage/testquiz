import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { IQuestion } from '../types/quiz';

export enum QuizStatus {
  RUNNING,
  FAILED,
  SUCCEED,
}

export interface IQuizContext {
  data: IQuestion[] | undefined;
  time: NodeJS.Timer | undefined;
  setData: (data: IQuestion[]) => void;
  currentQuestionIdx: number;
  status: QuizStatus;
  onAnswer: (isRight: boolean) => void;
  onTimeEnd: () => void;
}

const QuizContext = createContext<IQuizContext | null>(null);

export const useQuizContext = () => useContext(QuizContext);

export const QuizContextWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [data, setData] = useState<IQuestion[]>();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [status, setStatus] = useState(QuizStatus.RUNNING);
  const timer = useRef<NodeJS.Timeout>();
  const expirationTimeRef = useRef(0);

  useEffect(() => {
    if (!data) {
      return;
    }
    
    clearTimeout(timer.current);
    expirationTimeRef.current = data[currentQuestionIdx].answerTime || 5000;
    timer.current = setTimeout(() => {
      onFailAnswer();
    }, data[currentQuestionIdx].answerTime || 5000);

    return () => {
      clearTimeout(timer.current);
    }
  }, [currentQuestionIdx, data]);

  const onSuccess = () => {
    setStatus(QuizStatus.SUCCEED);
  }

  const onFailAnswer = () => {
    setStatus(QuizStatus.FAILED);
  }

  const onTimeEnd = () => {
    setStatus(QuizStatus.FAILED);
  }

  const onAnswer = (isRight: boolean) => {
    if (status === QuizStatus.FAILED) {
      return;
    }

    if (isRight && currentQuestionIdx < data?.length! ) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (isRight && currentQuestionIdx === data?.length) {
        onSuccess();
    } else {
      onFailAnswer();
    }
  }

  return <QuizContext.Provider value={{data, time: timer.current , setData, onAnswer, onTimeEnd, status, currentQuestionIdx}}>
    {children}
    </QuizContext.Provider>;
}