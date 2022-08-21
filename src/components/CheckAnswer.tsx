interface Props {
  btn: string;
  checkAns: () => void;
  marks: number | null;
  quizesLength: number;
}
const CheckAnswer: React.FC<Props> = (props) => {
  const checkBtn = (
    <>
      <button
        className={"bg-green-500 text-black font-semibold px-4 py-2 rounded-md"}
        onClick={
          props.btn === "Check Answer"
            ? props.checkAns
            : () => {
                window.location.reload();
              }
        }
      >
        {props.btn}
      </button>
    </>
  );
  return (
    <div className="flex flex-row justify-start gap-x-5 items-center">
      {checkBtn}
      {props.marks !== null ? (
        <p>
          You scored {props.marks} out of {props.quizesLength}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CheckAnswer;
