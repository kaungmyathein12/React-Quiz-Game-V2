import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import CheckAnswer from "./components/CheckAnswer";
import Quiz from "./components/Quiz";
import Total from "./components/Total";

const App: React.FC = () => {
  const [quizes, setQuizes] = useState([]);
  const [selectAns, setSelectAns] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalBox, setTotalBox] = useState<boolean>(true);

  const checkAnswer = () => {
    let checkArrayAreEqual;
    const selectQuizIdList = selectAns.map(
      (selectAns: any) => selectAns.quizId
    );
    const quizIdList = quizes.map((el: any) => el.id);
    if (quizIdList.length === selectQuizIdList.length) {
      checkArrayAreEqual = selectQuizIdList.every((val: any) =>
        quizIdList.includes(val)
      );
    } else {
      checkArrayAreEqual = false;
    }
    if (checkArrayAreEqual) {
      setTotal(() => 0);
      const correctAnswer = quizes.map((el: any) => el.correctAnswer);
      const selectedAns = selectAns.map((el: any) => el.ans);
      selectedAns.forEach((ans: any) => {
        const final = correctAnswer.includes(ans);
        if (final) {
          setTotal((prevtotal: any) => prevtotal + 1);
        }
      });
      setTotalBox(() => true);
    }
  };
  const toggleActive = (quizId: number, ans: string) => {
    const hadObj = selectAns.find(
      (el: { quizId: number }) => el.quizId === quizId
    );
    if (hadObj) {
      const filtered = selectAns.filter(
        (el: { quizId: number }) => el.quizId !== quizId
      );
      return setSelectAns([...filtered, { quizId, ans }]);
    }
    setSelectAns([...selectAns, { quizId, ans }]);
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://the-trivia-api.com/api/questions?categories=film_and_tv,history,general_knowledge&limit=4"
      );
      setQuizes(
        res.data.map((quiz: any) => ({
          ...quiz,
          id: nanoid(),
          answers: [...quiz.incorrectAnswers, quiz.correctAnswer],
        }))
      );
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div id="App" className="relative h-screen overflow-hidden">
      {totalBox && <Total quizes={quizes} marks={total} />}
      <div className="font-poppins w-4/5 mx-auto py-5 h-screen overflow-y-auto scrollbar-hide">
        <h1 className="text-xl font-semibold mt-4 mb-10">React Quiz Game</h1>
        <Quiz
          quizes={quizes}
          toggleActive={toggleActive}
          selectAns={selectAns}
        />
        <CheckAnswer checkAns={checkAnswer} />
      </div>
    </div>
  );
};

export default App;
