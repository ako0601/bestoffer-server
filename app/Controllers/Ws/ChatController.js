"use strict";

const Firebase = use("App/Models/Firebase");
const { validate } = use("Validator");
const firebase = new Firebase();
const db = firebase.db();
const noticeReference = db.collection("notice");
const Logger = use("Logger");

class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  async onMessage(message) {
    Logger.debug("Hello Message");
  }
}

module.exports = ChatController;
