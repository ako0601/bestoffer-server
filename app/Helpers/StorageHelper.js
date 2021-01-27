"use strict";
const Firebase = use("App/Models/Firebase");
const firebase = new Firebase();
const storage = firebase.storage();
const Logger = use("Logger");

const upload = async (file, filename) => {
  console.log("some message");
  const gsFile = storage.file(filename);
  return new Promise((resolve, reject) => {
    file.stream
      .pipe(
        gsFile.createWriteStream({
          gzip: true,
          metadata: {
            contentType: file.stream.headers["content-type"],
            cacheControl: "public, max-age=30",
          },
        })
      )
      .on("error", () => {
        gsFile.exists().then((data) => {
          console.log("file exist", data[0]);
          reject({ status: false, exist: data[0] });
        });
      })
      .on("finish", () => {
        Logger.debug("upload done");
        gsFile.makePublic().then((data) => {
          var result = {
            status: true,
            apiResponse: data[0],
            url: `https://storage.googleapis.com/${storage.name}/${filename}`,
          };
          resolve(result);
        });
      });
  });
};

const publish = async (filename) => {
  var res;
  const gsFile = storage.file(filename);
  gsFile.exists().then((data) => {
    console.log("some message 444", data[0]);
  });
  await gsFile.makePublic().then((data) => {
    res = {
      apiResponse: data[0],
      url: `https://storage.googleapis.com/${storage.name}/${file.name}`,
    };
  });
  return res;
};

const loggertest = async () => {
  Logger.info("info message");
  Logger.debug("debug message");
};

module.exports = {
  upload,
  publish,
  loggertest,
};
