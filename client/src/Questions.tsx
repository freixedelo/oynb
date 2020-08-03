import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";

interface QuestionProps {
  question: String;
  answer: {
    [key: string]: string;
  };
}

interface LocationState {
  name: string;
}

function Questions(props: any) {
  let location = useLocation<LocationState>();
  const { name } = location.state;
  const [data, setData] = useState({});
  const [currentQuestion, setQuestion] = useState(0);
  const [currentPoints, setPoints] = useState(0);
  const [selectedOption, setOption] = useState("");
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
      setAnswers((answers) => [...answers, item.answer]);
      return item.question;
    });
    setQuestions(newresult);
  }, [data]);

  function onAnswerPicked(event: any) {
    setPoints(Number(event.target.value));
    setOption(event.target.value);
    console.log(event.target.value);
  }

  function handleNext() {
    setTotalPoints(points + currentPoints);
    setOption("");
    setQuestion(currentQuestion + 1);
  }

  function Question(props: QuestionProps) {
    return (
      <>
        <div>{name + ", " + props.question}</div>
        <div>
          {props.answer &&
            Object.keys(props.answer).map((key: string, index) => {
              return (
                <div className="radio" key={index}>
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={Number(key)}
                      checked={selectedOption === key}
                      onChange={(event) => onAnswerPicked(event)}
                    />
                    {props.answer[key]}
                  </label>
                </div>
              );
            })}
        </div>

        <div>
          <button type="button" onClick={() => handleNext()}>
            NEXT
          </button>
        </div>
      </>
    );
  }

  function Outcome() {
    return (
      <>
        <div>Thank You {name}</div>
        <div>You scored {points} out of 24 possible.</div>
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
          {currentQuestion < questions.length ? (
            <Question
              question={questions[currentQuestion]}
              answer={answers[currentQuestion]}
            />
          ) : (
            <Outcome />
          )}
        </article>
      </div>
    </div>
  );
}

export default Questions;
