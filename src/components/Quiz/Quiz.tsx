import { FC, useEffect, useState } from "react"
import { QuizQuestion } from "../QuizQuestion/QuizQuestion";
import { IQuizContext, QuizStatus, useQuizContext } from "../../contexts/QuizContext";
import styles from './styles.module.css';
import { SuccessModal } from "../common/SuccessModal/SuccessModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Quiz: FC = () => {
  const {data, currentQuestionIdx, status, setStatus} = useQuizContext() as IQuizContext;
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    gsap.from('#quiz', {
      opacity: 0,
      duration: 0.2,
    })
  });

  useEffect(() => {
    setStatus(QuizStatus.RUNNING);
  }, [setStatus]);

  useEffect(() => {
    if (status !== QuizStatus.RUNNING) {
      setIsOpen(true);
    }
  }, [status])
  
  const onFinish = () => {
    setIsOpen(false);

    gsap.to('#quiz', {
      opacity: 0,
      duration: 0.05,
    }).then(() => {
      setStatus(QuizStatus.DEFAULT);
    })
  }

  return (
    <div id="quiz" className={styles.quiz}>
      <QuizQuestion
        question={data![currentQuestionIdx]} 
      />
      <SuccessModal onAction={onFinish} isOpen={isOpen} />
    </div>
  );
}