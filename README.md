# give-directly-skills
Basic Library API for GiveDirectly Skills Test

# Installation Instructions
Copy this into a `.env` file in the root of the project (I know making this public defeats the purpose of gitignoring `.env` but I wanted to demonstrate that I know the benefits of a `.env` file)

```
DB_HOST="localhost"
DB_PORT="5432"
DB_DATABASE="books_library"
DB_USER="postgres"
DB_PASSWORD="test_pass"
```

Run all commands from the root directory.
- Run `docker-compose up`. This should stand up the dockerized Postgresql DB, initalize the schema, and add seed data
- Run `yarn install && node src/app.js` to get the express js server running (Library REST API)
