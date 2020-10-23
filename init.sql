CREATE TABLE books
(
    id INTEGER PRIMARY KEY generated always as identity,
    title TEXT NOT NULL,
    UNIQUE(title)
);

CREATE TABLE book_requests 
(
  id INTEGER PRIMARY KEY generated always as identity,
  book_id INTEGER REFERENCES books(id),
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  user_email TEXT NOT NULL
)
