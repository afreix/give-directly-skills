const { StatusCodes } = require("http-status-codes");
const express = require("express"),
  router = express.Router(),
  BookRequest = require("../models/bookRequest.model"),
  Book = require("../models/book.model");

// TODO: Prevent user from requesting the same book twice
router.post("/", async (req, res) => {
  bookTitle = req.body.title;
  userEmail = req.body.email;

  if (!bookTitle || !userEmail) {
    res.status(StatusCodes.BAD_REQUEST).send("Title and email are required");
  }

  if (typeof bookTitle !== "string" || typeof userEmail !== "string") {
    res.status(StatusCodes.BAD_REQUEST).send("Title and email must be strings");
  }

  try {
    const bookToRequest = await Book.getBook({ title: bookTitle });
    if (bookToRequest) {
      const bookId = bookToRequest.id;
      const numBookRequests = await BookRequest.getRequestsByBookId(bookId);
      const isAvailable = numBookRequests === 0;
      const createdRequest = await BookRequest.createRequest({
        bookId,
        userEmail,
      });

      console.log("Created request: ", createdRequest);
      res.json({
        id: createdRequest.id,
        available: isAvailable,
        title: bookTitle,
        timestamp: createdRequest.date_created,
      });
    } else {
      res.status(500).send(`Could not find book with title: ${bookTitle}`);
    }
  } catch (err) {
    // TODO: More helpful error messages
    res.status(500).send("Unexpected error!");
  }
});

router.get("/:id?", async (req, res) => {
  const bookRequestId = req.params.id;
  try {
    // Get one request
    if (bookRequestId) {
      // TODO: Potentially share this validation logic
      if (
        !(
          typeof bookRequestId === "string" || typeof bookRequestId === "number"
        )
      ) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send("id must be an int or a string");
      }
      const bookRequest = await BookRequest.getRequest(bookRequestId);
      if (bookRequest) {
        res.json(bookRequest);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send(`Could not find request with id: ${bookRequestId}`);
      }
    }
    // Get all requests
    else {
      const allBookRequests = await BookRequest.getAllRequests();
      if (allBookRequests && allBookRequests.length === 0) {
        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        res.json(allBookRequests);
      }
    }
  } catch (err) {
    // TODO: More helpful error messages
    res.status(500).send("Unexpected error!");
  }
});

router.delete("/:id", async (req, res) => {
  const bookRequestId = req.params.id;
  if (!bookRequestId) {
    res.status(StatusCodes.BAD_REQUEST).send("id is required");
  }

  if (
    !(typeof bookRequestId === "string" || typeof bookRequestId === "number")
  ) {
    res.status(StatusCodes.BAD_REQUEST).send("id must be an int or a string");
  }

  try {
    // TODO: Improve error handling if bookRequestId doesn't exist
    await BookRequest.deleteRequest(bookRequestId);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    // TODO: More helpful error messages
    res.status(500).send("Unexpected error!");
  }
});

module.exports = router;
