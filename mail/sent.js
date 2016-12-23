const MessageStore = require('./message_store.js');

const Sent = {
  render: () => {
    let messages = MessageStore.getSentMessages;
    let ul = document.createElement('ul');
    ul.className = 'messages';

    messages.forEach( el => {
      let messageNode = Sent.renderMessage(el);
      ul.appendChild(messageNode);
    });
    // ul.innerHTML = 'An Inbox Message';
    return ul;
  },

  renderMessage: (message) => {
    let li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<span class='to'>${message.to}</span>
    <span class='subject'>${message.subject}</span>
    <span class='body'>${message.body}</span>`;

    return li;
  }
};

module.exports = Sent;
