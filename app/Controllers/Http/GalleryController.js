"use strict";

const { validate } = use("Validator");
const { upload, publish, loggertest } = use("App/Helpers/StorageHelper");
const Hash = use("Hash");

class GalleryController {
  async create({ request, response }) {
    const timestamp = new Date();
    var filepath = ["tester"];
    var result;
    request.multipart.file("image", {}, async (file) => {
      filepath.push(`${file.type}_${timestamp.getTime()}.${file.extname}`);
      result = await upload(file, filepath.join("/"));
    });
    await request.multipart.process();
    response.json(result);
  }
  async helpTest({ request, response }) {
    loggertest();
    const current = new Date();
    const hashval = current.getTime();
    console.log("hashval", hashval);
    response.send("message");
  }
}

module.exports = GalleryController;
