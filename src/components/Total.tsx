interface Props {
  quizes: any;
  marks: number;
}
const Total: React.FC<Props> = (props) => {
  const correctAns = props.quizes.map((el: any) => el.correctAnswer);
  const correctBtn = correctAns.map((ans: string) => (
    <button className="px-4 py-1 rounded-md font-medium mb-2 text-start border bg-white">
      {ans}
    </button>
  ));
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 grid place-items-center">
      <div className=" w-4/12 px-5 py-8 bg-white text-center rounded-md bg-total-bg bg-cover">
        <h1 className="text-2xl font-bold mb-4">
          You scored {props.marks} out of {props.quizes.length}.
        </h1>
        <span className="text-indigo-600 font-bold">Correct Answers</span>
        <div className="mt-8 flex flex-row gap-5 flex-wrap justify-center items-center gap-x-5 mb-6">
          {correctBtn}
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition-all font-bold px-4 py-2 text-white rounded-md"
          onClick={() => {
            window.location.reload();
          }}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Total;
