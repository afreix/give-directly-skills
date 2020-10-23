const { db } = require("../db");

async function createRequest({ bookId, userEmail }) {
  return db
    .one(
      'INSERT INTO "book_requests" (book_id, user_email) VALUES($1, $2) RETURNING id, date_created',
      [bookId, userEmail]
    )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("ERROR:", error);
    });
}

async function getRequest(id) {
  return db
    .one(`
      SELECT "br".*, "b"."title" FROM "book_requests" "br"
      JOIN "books" "b" ON
        "br"."book_id" = "b"."id"
      WHERE "br"."id"=$1`, [id])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("ERROR:", error);
    });
}

async function getRequestsByBookId(bookId) {
  return db
    .one('SELECT COUNT(*) FROM "book_requests" WHERE "book_id"=$1', [bookId], c => +c.count)
    .then((numRequests) => {
      return numRequests;
    })
    .catch((error) => {
      console.error("ERROR:", error);
    });
}

async function getAllRequests() {
  return db
    .any(`
      SELECT "br".*, "b"."title" FROM "book_requests" "br"
      JOIN "books" "b" ON
        "br"."book_id" = "b"."id"
      `, [])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("ERROR:", error);
    });
}

async function deleteRequest(id) {
  return db
    .result(
      'DELETE FROM "book_requests" WHERE "id"=$1',
      [id],
      (r) => r.rowCount
    )
    .then((rowCount) => rowCount);
}

module.exports = {
  createRequest,
  getRequest,
  getRequestsByBookId,
  getAllRequests,
  deleteRequest,
};
