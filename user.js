const polls = JSON.parse(localStorage.getItem("polls")) || [];
const pollsPerPage = 1; // Number of days' polls to show per page
let currentPage = 1;

function renderPolls(page) {
  const start = (page - 1) * pollsPerPage;
  const end = start + pollsPerPage;
  const pollsToShow = polls.slice(start, end);

  const pollsContainer = document.getElementById("pollsContainer");
  pollsContainer.innerHTML = "";

  pollsToShow.forEach((poll, pollIndex) => {
    const pollDiv = document.createElement("div");
    pollDiv.innerHTML = `
            <h2>${poll.question}</h2>
            <ul>
                ${poll.options
                  .map(
                    (option, optionIndex) => `
                    <li>
                        ${option}
                        <button class="editOption" data-poll="${pollIndex}" data-option="${optionIndex}">Edit</button>
                        <button class="deleteOption" data-poll="${pollIndex}" data-option="${optionIndex}">Delete</button>
                    </li>
                `
                  )
                  .join("")}
            </ul>
            <button class="deletePoll" data-poll="${pollIndex}">Delete Poll</button>
        `;
    pollsContainer.appendChild(pollDiv);
  });

  document.querySelectorAll(".editOption").forEach((button) => {
    button.addEventListener("click", editOption);
  });

  document.querySelectorAll(".deleteOption").forEach((button) => {
    button.addEventListener("click", deleteOption);
  });

  document.querySelectorAll(".deletePoll").forEach((button) => {
    button.addEventListener("click", deletePoll);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(polls.length / pollsPerPage);
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderPolls(currentPage);
    });

    paginationDiv.appendChild(pageButton);
  }
}

function editOption(event) {
  const pollIndex = event.target.dataset.poll;
  const optionIndex = event.target.dataset.option;
  const newOption = prompt(
    "Edit the option:",
    polls[pollIndex].options[optionIndex]
  );

  if (newOption) {
    polls[pollIndex].options[optionIndex] = newOption;
    localStorage.setItem("polls", JSON.stringify(polls));
    renderPolls(currentPage);
  }
}

function deleteOption(event) {
  const pollIndex = event.target.dataset.poll;
  const optionIndex = event.target.dataset.option;

  polls[pollIndex].options.splice(optionIndex, 1);
  localStorage.setItem("polls", JSON.stringify(polls));
  renderPolls(currentPage);
}

function deletePoll(event) {
  const pollIndex = event.target.dataset.poll;

  polls.splice(pollIndex, 1);
  localStorage.setItem("polls", JSON.stringify(polls));
  renderPolls(currentPage);
  renderPagination();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPolls(currentPage);
  renderPagination();
});
