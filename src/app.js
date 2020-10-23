require('dotenv').config()
const bookRequests = require("./controllers/bookRequests.controller")
const express = require('express')
const app = express()
const port = 3000

/**
 * Assumptions:
 *  - Book title's are unique
 *  - We only have one available book per title
 * 
 * Errors:
 *  - Users should not be allowed to request a book if they have already requested it
 *  - Users cannot request books that do not exist
 *  - Users cannot view requests for books that do not exist
 *  - Users cannot delete requests that do not exist
 * 
 * Limitations:
 *  - Our API doesn't handle returning books, so a queue of requests will build up for any given book.
 *    The first user to request a book will be the only user for which it is available
 */

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

// Parse JSON bodies for this app
app.use(express.json());
app.use('/request', bookRequests)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})