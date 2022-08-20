interface Props {
  quizId: number;
  question: string;
}
const Question: React.FC<Props> = (props) => {
  return <h1 className="text-lg mb-6">{props.question}</h1>;
};

export default Question;
