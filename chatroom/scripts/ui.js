class ChatUI {
  constructor(list) {
    this.lists = list;
  }

  clear() {
    this.lists.innerHTML = "";
  }

  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
            <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
            </li>
        `;
    this.lists.innerHTML += html;
  }
}
