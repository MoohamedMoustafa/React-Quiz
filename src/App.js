import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from './Loader';
import Error from './Error';
import StartScreen from "./StartScreen";

const initilState = {
  questions: [],
  //"loading", "error", "ready", "active", "finished"
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return{...state, status : "error"}

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initilState);
  const numQuestions = questions.length;
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          dispatch({ type: "dataReceived", payload: data });
        }
      } catch (error) {
        console.error("error fetching questions", error);
        dispatch({type: "dataFailed"})
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}
