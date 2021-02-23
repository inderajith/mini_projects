const chatlists = document.querySelector("ul");
const addForm = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const popupmsg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = addForm.message.value;
  chatroom
    .addMessage(message)
    .then(() => addForm.reset())
    .catch((err) => console.log(err));
});

newName.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = newName.name.value;

  chatroom.updateName(name);

  newName.reset();

  popupmsg.innerHTML = `Your name was updated to ${name}`;
  setTimeout(() => (popupmsg.innerHTML = ""), 2000);
});

rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatui.clear();

    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((data) => {
      chatui.render(data);
    });
  }
});

const username = localStorage.username ? localStorage.username : "anonymous";

const chatui = new ChatUI(chatlists);
const chatroom = new Chatroom("general", username);

chatroom.getChats((data) => {
  chatui.render(data);
});
