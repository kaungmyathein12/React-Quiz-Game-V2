import { nanoid } from "nanoid";
interface Props {
  answers: string[];
  quizId: number;
  selectAns: [];
  toggleActive: (quizid: number, ans: string) => void;
}
const Answer: React.FC<Props> = (props) => {
  const answerBtn = props.answers.map((ans) => {
    const active = props.selectAns.find(
      (el: any) => el.quizId === props.quizId && el.ans === ans
    );
    return (
      <button
        key={nanoid()}
        className={
          (active ? "bg-indigo-600 text-white" : "bg-[#e2e2e2]") +
          " px-4 py-1 rounded-md font-medium border mb-2 text-start"
        }
        onClick={() => {
          props.toggleActive(props.quizId, ans);
        }}
      >
        {ans}
      </button>
    );
  });
  return (
    <div className="flex flex-row gap-5 flex-wrap items-center gap-x-5 mb-6">
      {answerBtn}
    </div>
  );
};
export default Answer;
