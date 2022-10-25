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
  { name: "Ganondorf" },
  { name: "Mr game & watch" },
  { name: "jigglypuff" },
  { name: "bowser" },
  { name: "captain falcon" },
  { name: "donkey kong" },
  { name: "dr mario" },
  { name: "falco" },
  { name: "fox" },
  { name: "ice climbers" },
  { name: "jigglypuff" },
  { name: "kirby" },
  { name: "link" },
  { name: "luigi" },
  { name: "mario" },
  { name: "marth" },
  { name: "ness" },
  { name: "peach" },
  { name: "pichu" },
  { name: "pikachu" },
  { name: "roy" },
  { name: "samus" },
  { name: "young link" },
  { name: "yoshi" },
  { name: "zelda" },
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
      return (data = `<li>${data.name}</li>`);
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
