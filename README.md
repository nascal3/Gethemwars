# Gethemwars
Get StarWars movies, characters & all that nerdy stuff.

## Project setup
```
npm install
```

### Setup environment variables
Create in root directory a file named _.env_ Add the following variables in it.
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=_GfVvTlnpAk1_Rm_fUD-bBGkSHa8P-ov
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=<database_user>
MYSQL_PASSWORD=<database_user>
MYSQL_DB_NAME=gethewars
BASE_URL=https://swapi.dev/api
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run in docker container
Before running the docker container:
 - Make sure you have a `MYSQL` database setup with the table name `gethewars`. 
 - Setup the database user and password values of your `MYSQL` in the `docker-compose.yml` file.
 - Replace the values `MYSQL_USER=<your_user_name>` and `MYSQL_PASSWORD=<your_password>`.
 - Run the container.
```
docker compose up
```
## API Endpoints
Get a listing of the names of StarWars movies along with their opening crawls.
```
GET - http://<HOST_URL>/starwars
```
Get a listing of the names of StarWars movies characters with filters:
  - Filter by name in ascending order set `criteriaParam` to `name`
  - Filter by gender in ascending order set `criteriaParam` to `gender`
  - Filter by height in ascending order set `criteriaParam` to `height`
```
GET - http://<HOST_URL>/starwars/people/<criteriaParam>/filter
```
To filter all results by gender:
 - Filter by male gender set `selectedGender` to `male`
 - Filter by female gender set `selectedGender` to `female`
```
GET - http://<HOST_URL>/starwars/people/<criteriaParam>/filter?gender=<selectedGender>
```
