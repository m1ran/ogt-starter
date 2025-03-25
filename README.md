# OGT Starter
Sneat Vuetify Vuejs Laravel admin template

## Installation

Open the terminal in that directory & to install the composer packages, run the following command:
```sh
composer install
```sh

Run the following command to copy .env.example file content into .env file:
```sh
cp .env.example .env

Run the following command to generate the key (You can also edit your database credentials here):
```sh
php artisan key:generate

Run the following command to run migrations and seeds:
````sh
php artisan migrate --seed

By running the following command, you will be able to get all the dependencies in your node_modules folder:
````sh
npm install

You can run the development server via the dev command, which is useful while developing locally. The development server will automatically detect changes to your files and instantly reflect them in any open browser windows:
````sh
npm run dev

To serve the application you need to run the following command in the project directory. (This will give you an address with port number 8000)

Now navigate to the given address you will see your application is running:
````sh
php artisan serve
