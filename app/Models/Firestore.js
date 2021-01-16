"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const serviceAccount = require("../../secret/bestoffer-be17a-firebase-adminsdk-x4uax-f5170be265.json");

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class Firestore extends Model {
  db() {
    return admin.firestore();
  }
}

module.exports = Firestore;
