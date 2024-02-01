export interface IQuiz {
  questions: IQuestion[];
}

export interface IQuestion {
  questionText: string;
  answers: IAnswer[];
  answerTime?: number;
}

export interface IAnswer {
  text: string;
  isRight?: boolean;
}
