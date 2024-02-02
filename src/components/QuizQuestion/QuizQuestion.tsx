import { FC, useEffect, useState } from "react";
import { IAnswer, IQuestion } from "../../types/quiz";
import { QuizAnswer } from "../common/QuizAnswer/QuizAnswer";
import styles from './styles.module.css';
import { CountdownTimer } from "../common/Timer/Timer";
import { IQuizContext, useQuizContext } from "../../contexts/QuizContext";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export interface IQuizQuestionProps {
  question: IQuestion;
}

export const QuizQuestion: FC<IQuizQuestionProps> = ({question: {questionText = '', answers, answerTime=30}}) => {
  const { data, onTimeEnd, onAnswer, currentQuestionIdx } = useQuizContext() as IQuizContext;
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    setAnswerText('');
  }, [currentQuestionIdx]);

  useGSAP(() => {
    if (currentQuestionIdx !== 0) {
      gsap.from('#answer', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 0.2,
        delay: 0.2,
      });
    } else {
      gsap.from('#answer', {
        opacity: 0,
        stagger: 0.04,
        duration: 0.2,
        delay: 0.2,
      });
    }

    gsap.fromTo('#text', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.05,
    });
  }, [currentQuestionIdx]);

  const handleAnswer = (answer: IAnswer) => {
    setAnswerText(answer.text);

    if (currentQuestionIdx === data?.length! - 1) {
      setTimeout(() => {onAnswer(answer.isRight!)}, 300);
      return
    }

    gsap.to('#text', {
      opacity: 0,
      duration: 0.05,
      delay: 0.3,
    });

    gsap.to('#answer', {
      opacity: 0,
      stagger: 0.04,
      duration: 0.2,
      delay: 0.3,
    }).then(() => {
      onAnswer(answer.isRight!);
    });
  }

  return (
    <div>
      <div className={styles.questionsCounter}>
        {`${currentQuestionIdx + 1}/${data!.length}`}
      </div>

      <div id="text" className={styles.questionTextWrapper}>
        <p className={styles.text}>{questionText}</p>
      </div>

      <CountdownTimer 
        className={styles.timer} 
        initialSeconds={answerTime} 
        onFinish={onTimeEnd} 
      />
      <div className={styles.answers}>
      {answers.map((answer) => {
        // ideally answer should have id and i could compare by ids instead of text
        const showRes = (answerText && answer.isRight) || (answerText === answer.text);

        return <QuizAnswer
          id="answer"
          onAnswer={handleAnswer}
          key={answer.text} 
          answer={answer}
          isResultShown={showRes}
        />
      })}
      </div>
    </div>
  )
}