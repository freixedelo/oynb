import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";

export interface QuestionProps {
  question: String;
  answer: {
    [key: string]: string;
  };
}

function Questions(props: any) {
  let location = useLocation();
  console.log(location.state);
  const [data, setData] = useState({});
  const [currentQuestion, setQuestion] = useState(0);
  const [currentPoints, setPoints] = useState(0);
  const [points, setTotalPoints] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<
    {
      [key: string]: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchQuestions() {
      const result = await fetch("http://localhost:5000/api/questions");
      result.json().then((res) => setData(res));
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    const newresult: string[] = Object.values(data).map((item: any) => {
      console.log("question", [...answers, item.answer]);
      setAnswers((answers) => [...answers, item.answer]);
      return item.question;
    });
    setQuestions(newresult);

    console.log("respostas", answers);
  }, [data]);

  useEffect(() => {
    setQuestion(currentQuestion + 1);
  }, [points]);

  useEffect(() => {
    // TODO ended?
  }, [currentQuestion]);

  function onAnswerPicked(event: any) {
    setPoints(event.target.value);
    console.log(event.target.value);
  }

  function handleNext() {
    setTotalPoints((points) => points + currentPoints);
  }

  function Question(props: QuestionProps) {
    return (
      <>
        <form>
          <div>{props.question}</div>
          <div>
            {props.answer &&
              Object.keys(props.answer).map((key: string) => {
                return (
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        name="answer"
                        value={Number(key)}
                        onChange={onAnswerPicked}
                      />
                      {props.answer[key]}
                    </label>
                  </div>
                );
              })}
          </div>
        </form>
      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Welcome to OYNB</h2>
        </div>
      </header>
      <div>
        <article>
          <Question
            question={questions[currentQuestion]}
            answer={answers[currentQuestion]}
          />
        </article>
        <div>
          <button type="button" onClick={() => handleNext()}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
