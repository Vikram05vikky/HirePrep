class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }
  parse(message) {
    // console.log("MessageParser received:", message);
    this.actionProvider.handleUserMessage(message);
  }
}

export default MessageParser;
