document
  .getElementById("pollForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const pollQuestion = document.getElementById("pollQuestion").value;
    const pollOption1 = document.getElementById("pollOption1").value;
    const pollOption2 = document.getElementById("pollOption2").value;

    const pollData = {
      question: pollQuestion,
      options: [pollOption1, pollOption2],
      timestamp: new Date().toISOString().split("T")[0], // Only the date part
    };

    let polls = JSON.parse(localStorage.getItem("polls")) || [];
    polls.push(pollData);
    localStorage.setItem("polls", JSON.stringify(polls));

    alert("Poll created successfully!");
    document.getElementById("pollForm").reset();
  });
