let button = document.getElementById("button");
document.querySelector("button").addEventListener("click", apiRequest);
// ability to submit with enter for preference/ web accessability
let input = document.getElementById("input");
input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    document.getElementById("button").click();
    input.value = "";
  }
});

async function apiRequest() {
  const characterName = document.querySelector("input").value;
  try {
    const response = await fetch(
      `https://names-and-faces-api.vercel.app/api/${characterName}`
    );

    const data = await response.json();

    const specificMoves = () => {
      Object.entries(data.moves).forEach(([key, value]) => {
        return value;
      });
    };

    document.getElementById("characterName").innerText = data.alias;
    document.getElementById("characterOrigin").innerText = data.origin;
    document.getElementById("characterDescription").innerText =
      data.description;
    document.getElementById("characterVoice").textContent = data.voice;
    document.getElementById("moves").textContent = specificMoves();
    document.getElementById("image").src = `/images/${data.ide}.webp`;
    document.querySelector(".secondImage").src = `/images/${data.ide}.webp`;
    document.getElementById(
      "characterVoiceImage"
    ).src = `/images/${data.voiceId}.webp`;
    document.querySelector("body").style.backgroundColor = `#${data.color}`;
    document.querySelector(
      ".back"
    ).style.backgroundImage = `url(/images/${data.extraImage}.gif)`;
    console.log(data.extraImage);
  } catch (error) {
    console.log(error);
  }
}

// search bar

let characterList = [
  { name: "Ganondorf", value: "Ganondorf" },
  { name: "mr game & watch", value: "mr game & watch" },
  { name: "jigglypuff", value: "jigglypuff" },
  { name: "bowser", value: "bowser" },
  { name: "captain falcon", value: "captain falcon" },
  { name: "donkey kong", value: "donkey kong" },
  { name: "dr mario", value: "dr mario" },
  { name: "falco", value: "falco" },
  { name: "fox", value: "fox" },
  { name: "ganondorf", value: "ganondorf" },
  { name: "ice climbers", value: "ice climbers" },
  { name: "jigglypuff", value: "jigglypuff" },
  { name: "kirby", value: "kirby" },
  { name: "link", value: "link" },
  { name: "luigi", value: "luigi" },
  { name: "mario", value: "mario" },
  { name: "Discord", value: "faridvatani" },
  { name: "marth", value: "marth" },
  { name: "ness", value: "ness" },
  { name: "peach", value: "peach" },
  { name: "pichu", value: " pichu" },
  { name: "pikachu", value: "pikachu" },
  { name: "roy", value: "roy" },
  { name: "samus", value: " samus" },
  { name: "young link", value: "young link" },
  { name: "yoshi", value: "yoshi" },
  { name: "zelda", value: "zelda" },
];

const searchWrapper = document.querySelector(".search");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocomp-box");

inputBox.onkeyup = (event) => {
  let userData = event.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = characterList.filter((data, { name, value }) => {
      return data.name
        .toLocaleLowerCase()
        .startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data, { name, value }) => {
      return (data = `<li>${data.value}</li>`);
    });
    searchWrapper.classList.add("active");
    showSuggestions(emptyArray);
  } else {
    searchWrapper.classList.remove("active");
  }
};

function showSuggestions(list) {
  let listData;
  if (list.length) {
    listData = list.join("");
  } else {
    listData = `<li>Not Found</li>`;
  }
  suggBox.innerHTML = listData;
}

//parallax
