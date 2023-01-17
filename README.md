# MudaZero-BE

run DB migrate

```
npx knex migrate:latest --knexfile db/knexfile
npx knex seed:run --knexfile db/knexfile
```

run docker local

```
 1. install docker
 2. run $ docker build -t <tag name> .
 3. run $ docker run -d --publish <your local port>:<docker port>
```
