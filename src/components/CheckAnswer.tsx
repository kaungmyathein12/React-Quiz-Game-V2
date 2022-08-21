interface Props {
  checkAns: () => void;
}
const CheckAnswer: React.FC<Props> = (props) => {
  const checkBtn = (
    <>
      <button
        className={"bg-green-500 text-black font-semibold px-4 py-2 rounded-md"}
        onClick={props.checkAns}
      >
        Check Answer
      </button>
    </>
  );
  return (
    <div className="flex flex-row justify-start gap-x-5 items-center">
      {checkBtn}
    </div>
  );
};
export default CheckAnswer;
