import { FC, useState } from "react"
import { IQuestion, IQuiz } from "../../types/quiz";
import { QuizQuestion } from "../QuizQuestion/QuizQuestion";
import { IQuizContext, useQuizContext } from "../../contexts/QuizContext";


export interface IQuizProps {

}

export const Quiz: FC<IQuizProps> = () => {
  const {data, currentQuestionIdx} = useQuizContext() as IQuizContext;

  return (
    <div>
      <div>time</div>
      <QuizQuestion 
        question={data![currentQuestionIdx]} 
      />
    </div>
  );
}