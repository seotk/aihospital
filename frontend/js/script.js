const btn_send = document.querySelector("#btnSendMessage");
const chatMessage = document.querySelector(".chat_message");
const disease = document.querySelector("#disease");
const chatCon = document.querySelector(".chat_con");
const guideChat = document.querySelector(".guide_chat");
const loder = document.querySelector(".loder");
const restart = document.querySelector(".restart");
const chatInputDiv = document.querySelector(".chatInput");
const Warning = document.querySelector(".Warning");
// 임시
// guideChat.style.display = "none";
chatCon.style.display = "none";
loder.style.display = "none";
chatInputDiv.style.display = "none";

disease.focus();

let userMessages = [];
let assistantMessages = [];

const sendMessage = async () => {
  guideChat.style.display = "none";
  loder.style.display = "flex";

  let myDisease = disease.value;

  const chatInput = document.querySelector(".chatInput input");
  const chatMessageDiv = document.createElement("div");
  chatMessageDiv.classList.add("chat_message");
  if (myDisease) {
    chatMessageDiv.innerHTML = `<p class="userMessages"><span>사용자</span><br /><br />${myDisease}</p>`;
  }
  if (chatInput.value) {
    chatMessageDiv.innerHTML = `<p class="userMessages"><span>사용자</span><br /><br />${chatInput.value}</p>`;
  }
  console.log(chatInput.value);
  chatCon.appendChild(chatMessageDiv);
  userMessages.push(chatInput.value);
  chatInput.value = "";
  const response = await fetch(
    "https://t65mk8lr63.execute-api.ap-northeast-2.amazonaws.com/props/guide",
    {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        myDisease: myDisease,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
  // chatMessage.innerHTML += `${data.replace(/\n/g, "<br />")}`;
  // //    / /g =전체
  assistantMessages.push(data.assistant);
  const astrologerMessage = document.createElement("div");
  astrologerMessage.classList.add("chat_message");
  astrologerMessage.innerHTML = `<p class="assistant"><span>GPT</span><br /><br />${data.assistant.replace(
    /\n/g,
    "<br/>"
  )}</p>`;
  chatCon.appendChild(astrologerMessage);

  chatCon.style.display = "block";
  chatCon.scrollTop = chatCon.scrollHeight;
  loder.style.display = "none";
  chatInputDiv.style.display = "flex";
  Warning.style.display = "none";
};

btn_send.addEventListener("click", sendMessage);
document.querySelector("#btn").addEventListener("click", sendMessage);
restart.addEventListener("click", () => {
  window.location.reload();
});
// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((err) => console.log(err));
