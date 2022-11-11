# cs3219_E

## Manual Initialisation
1. Ensure that redis is install on your machine
1. Rename `.env.sample` file in the root directory and mockData directory to `.env`.
2. Ensure that you have MongoDB, nodejs and redis installed on your machine
3. Open a terminal in this directory, and run the following command: 
`npm i` to install npm packages used
4. Populate your local data base first by running `npm run populate-db`
5. Run the service using `npm start`
6. Run Redis on your machine using `redis-server`
7. Access the service via `http://localhost:3000/photos/get`
8. Your terminal running your server will print the time taken to get the data


## To check that your redis cache is empty:
1. Open a terminal in this directory, and run the following command: `redis-cli`
2. Check if your cache is storing anything using command `KEYS *`
3. To clear your cache, run `FLUSHALL`

Note: Mock Data retrieved from: https://jsonplaceholder.typicode.com/
