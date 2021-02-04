"use strict";

const Firebase = use("App/Models/Firebase");
const { validate } = use("Validator");
const firebase = new Firebase();
const db = firebase.db();
const chatReference = db.collection("chat");
const Logger = use("Logger");

class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  async onMessage(message) {
    this.socket.emit("result", {
      result: "message well received",
    });
    Logger.debug("message received message " + JSON.stringify(message));
  }
}

module.exports = ChatController;
