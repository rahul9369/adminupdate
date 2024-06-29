document.addEventListener("DOMContentLoaded", () => {
  const quizQuestions = document.getElementById("quizQuestions");
  const timerElement = document.getElementById("timer");
  let time = 0;
  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  function renderQuiz() {
    quizQuestions.innerHTML = "";
    questions.forEach((questionObj, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
              <div>
                  <strong>${index + 1}. ${questionObj.question}</strong>
                  <ol>
                      ${questionObj.options
                        .map(
                          (option, i) => `
                          <li>
                              <label>
                                  <input type="radio" name="question${index}" value="${
                            i + 1
                          }">
                                  ${option}
                              </label>
                          </li>
                      `
                        )
                        .join("")}
                  </ol>
              </div>
          `;
      quizQuestions.appendChild(li);
    });
  }

  function startTimer() {
    setInterval(() => {
      time++;
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timerElement.innerText = `Time: ${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }, 1000);
  }

  window.submitQuiz = function () {
    let score = 0;
    questions.forEach((questionObj, index) => {
      const selectedOption = document.querySelector(
        `input[name="question${index}"]:checked`
      );
      if (
        selectedOption &&
        parseInt(selectedOption.value, 10) === questionObj.correctOption
      ) {
        score++;
      }
    });
    alert(`You scored ${score} out of ${questions.length}`);
  };

  renderQuiz();
  startTimer();
});
