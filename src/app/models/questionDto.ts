import { Answer } from "./answer";

export interface QuestionDto {
  question: string,
  correctAnswer: string,
  otherAnswer1: string,
  otherAnswer2: string,
  otherAnswer3: string,
  explanation: string,
}