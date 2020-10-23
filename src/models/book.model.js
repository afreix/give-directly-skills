const { db } = require("../db");

async function getBook({ title }) {
  return db
    .one('SELECT * FROM "books" WHERE "title"=$1', [title])
    .then((data) => {
      console.log("Book: ", data);
      return data;
    })
    .catch((err) => {
      console.error(err)
    });
}

module.exports = {
  getBook,
};
