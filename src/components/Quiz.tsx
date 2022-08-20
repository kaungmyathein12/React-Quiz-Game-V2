import { decode } from "html-entities";
import Answer from "./Answer";
import Question from "./Question";

interface QuizProps {
  quizzes: {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  selectAns: [];
  toggleActive: (quizid: number, ans: string) => void;
}
const Quiz: React.FC<QuizProps> = (props) => {
  const generateQuiz = props.quizzes.map((quiz) => {
    const newAnswers = quiz.answers.sort();
    return (
      <div key={quiz.id} className="mb-8">
        <Question quizId={quiz.id} question={decode(quiz.question)} />
        <Answer
          answers={newAnswers}
          quizId={quiz.id}
          selectAns={props.selectAns}
          toggleActive={props.toggleActive}
        />
        <hr />
      </div>
    );
  });
  return <div>{generateQuiz}</div>;
};
export default Quiz;
