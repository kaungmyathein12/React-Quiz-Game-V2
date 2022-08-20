import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import CheckAnswer from "./components/CheckAnswer";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  const [quizes, setQuizes] = useState([]);
  const [selectAns, setSelectAns] = useState<any>([]);
  const [total, setTotal] = useState<any>({ total: undefined });
  const [answers, setAnswers] = useState<[]>([]);
  const checkAnswer = () => {
    let marks = 0;
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
      const correctAnswer = quizes.map((el: any) => el.correctAnswer);
      const selectedQuizAns = selectAns
        .sort((a: any, b: any) => a.quizId - b.quizId)
        .map((selectAns: any) => selectAns.ans);
      for (let i = 0; i < correctAnswer.length; i++) {
        if (correctAnswer[i] === selectedQuizAns[i]) {
          marks = marks + 1;
        } else {
          if (marks === 0) {
            marks = marks - 1;
          } else if (marks < 0) {
            marks = 0;
          }
        }
      }
      setTotal((prevState: any) => {
        return { ...prevState, total: marks };
      });
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
    <div id="App" className="font-poppins w-4/5 mx-auto py-5">
      <h1 className="text-xl font-semibold mt-4 mb-10">React Quiz Game</h1>
      <Quiz
        quizzes={quizes}
        toggleActive={toggleActive}
        selectAns={selectAns}
      />
      <CheckAnswer
        checkAns={checkAnswer}
        marks={total.total}
        quizesLength={quizes.length}
      />
    </div>
  );
};

export default App;
