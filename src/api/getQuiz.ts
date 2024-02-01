import { IQuestion } from "../types/quiz";
import { historyOfFranceQuiz } from "./data";

export const getQuiz = (): IQuestion[] => {
  return historyOfFranceQuiz.questions;
}