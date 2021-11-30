The purpose of this exercise is to learn the basics of MongoDB

# Set up the exercise

Download MongoDB locally:
(on your terminal)

1. `brew tap mongodb/brew`
2. `brew install mongodb-community@5.0`
3. `mongod`

In order to check the content of your database you can use the terminal with the [command line](https://docs.mongodb.com/manual/reference/mongo-shell/) or use a [GUI](https://www.mongodb.com/products/compass)

1. Download this repository locally
2. `npm i`

3. To run the server:
   `npm run serve`

(Optional) You can use [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for the front-end. If you don't use live server just open the HTML file on your browser.

# Exercise

The purpose is to have a fully functioning todo list that is permanent (the updates will survive a page refresh).

The only file you will need to edit is `server.js`.

The functionality for visualizing posts (server.js line 25), and creating posts (server.js line 32) is already implemented, use those as examples.

1. Update the posts that you have created (server.js line 42)
2. And delete unwanted posts (serve.js line 48)

Use the MongoDB documentation as reference: https://docs.mongodb.com/manual/crud/
