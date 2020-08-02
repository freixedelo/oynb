const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/questions", (req, res) => {
  res.send({
    1: {
      question: "How often do you drink?",
      answer: {
        6: "once a week",
        4: "twice a week",
        2: "three times a week",
        0: "everyday",
      },
    },
    2: {
      question: "How much do you drink per week?",
      answer: {
        6: "1 unit",
        4: "3 units",
        2: "6 units",
        0: "12 units",
      },
    },
    3: {
      question: "How much do you spend on alcohol per week?",
      answer: {
        6: "10 pounds",
        4: "20 pounds",
        2: "30 pounds",
        0: "50 pounds",
      },
    },
    4: {
      question: "Do you drink alone?",
      answer: {
        6: "never",
        4: "most of the time",
        2: "occasionally",
        0: "always",
      },
    },
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
