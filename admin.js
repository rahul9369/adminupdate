document.addEventListener("DOMContentLoaded", () => {
  const questionForm = document.getElementById("questionForm");
  const questionInput = document.getElementById("questionInput");
  const optionInputs = document.querySelectorAll(".optionInput");
  const correctOption = document.getElementById("correctOption");
  const questionList = document.getElementById("questionList");
  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  function renderQuestions() {
    questionList.innerHTML = "";
    questions.forEach((questionObj, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
              <div>
                  <strong>Question:</strong> ${questionObj.question} <br>
                  <strong>Options:</strong>
                  <ol>
                      <li>${questionObj.options[0]}</li>
                      <li>${questionObj.options[1]}</li>
                      <li>${questionObj.options[2]}</li>
                      <li>${questionObj.options[3]}</li>
                  </ol>
                  <strong>Correct Option:</strong> ${questionObj.correctOption}
              </div>
              <div>
                  <button class="edit-btn" onclick="editQuestion(${index})">Edit</button>
                  <button class="delete-btn" onclick="deleteQuestion(${index})">Delete</button>
              </div>
          `;
      questionList.appendChild(li);
    });
  }

  function addQuestion(questionObj) {
    questions.push(questionObj);
    localStorage.setItem("questions", JSON.stringify(questions));
    renderQuestions();
  }

  function editQuestion(index) {
    const questionObj = questions[index];
    const newQuestion = prompt("Edit your question:", questionObj.question);
    const newOptions = [
      prompt("Edit option 1:", questionObj.options[0]),
      prompt("Edit option 2:", questionObj.options[1]),
      prompt("Edit option 3:", questionObj.options[2]),
      prompt("Edit option 4:", questionObj.options[3]),
    ];
    const newCorrectOption = parseInt(
      prompt("Edit correct option (1-4):", questionObj.correctOption),
      10
    );
    if (
      newQuestion !== null &&
      newOptions.every((opt) => opt !== null) &&
      !isNaN(newCorrectOption) &&
      newCorrectOption >= 1 &&
      newCorrectOption <= 4
    ) {
      questions[index] = {
        question: newQuestion,
        options: newOptions,
        correctOption: newCorrectOption,
      };
      localStorage.setItem("questions", JSON.stringify(questions));
      renderQuestions();
    }
  }

  function deleteQuestion(index) {
    questions.splice(index, 1);
    localStorage.setItem("questions", JSON.stringify(questions));
    renderQuestions();
  }

  questionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = questionInput.value.trim();
    const options = Array.from(optionInputs).map((input) => input.value.trim());
    const correctOptionValue = parseInt(correctOption.value, 10);
    if (
      question &&
      options.every((opt) => opt) &&
      !isNaN(correctOptionValue) &&
      correctOptionValue >= 1 &&
      correctOptionValue <= 4
    ) {
      addQuestion({ question, options, correctOption: correctOptionValue });
      questionInput.value = "";
      optionInputs.forEach((input) => (input.value = ""));
      correctOption.value = "";
    }
  });

  window.editQuestion = editQuestion;
  window.deleteQuestion = deleteQuestion;

  renderQuestions();
});
