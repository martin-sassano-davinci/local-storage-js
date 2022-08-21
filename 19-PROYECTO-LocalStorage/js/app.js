const form = document.querySelector("#formulario");
const tweetsList = document.querySelector("#lista-tweets");
let tweets = [];

form.addEventListener("submit", addTweet);
document.addEventListener("DOMContentLoaded", () => {
  tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  createHTML();
  console.log(tweets);
});

function addTweet(e) {
  e.preventDefault();

  const tweetText = document.querySelector("#tweet").value;

  if (tweetText.trim() === "") {
    errorMessage("You cannot add empty tweet");
  } else {
    const tweetsObj = {
      id: Date.now(),
      tweet: tweetText,
    };
    tweets = [...tweets, tweetsObj];

    createHTML();
  }
}

function errorMessage(e) {
  let p = document.createElement("p");
  p.textContent = e;
  p.classList.add("error");

  const content = document.querySelector("#contenido");
  content.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, 3000);
}

function createHTML() {
  cleanHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const deleteButton = document.createElement("a");
      deleteButton.classList.add("borrar-tweet");
      deleteButton.innerText = "X";
      deleteButton.onclick = () => {
        deleteTweet(tweet.id);
      };
      const li = document.createElement("li");

      li.innerText = tweet.tweet;
      li.appendChild(deleteButton);

      tweetsList.appendChild(li);
    });
  }
  form.reset();
  sincLocalStorage();
}

function cleanHTML() {
  while (tweetsList.firstChild) {
    tweetsList.removeChild(tweetsList.firstChild);
  }
}

function sincLocalStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function deleteTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  createHTML();
}
