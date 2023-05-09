const User = require("../models/User");

/*
Problem Statement:
You need to develop an async error handler function and modify existing controllers to handle errors more efficiently and consistently in your Express application. The async error handler function and modified controllers should have the following behavior:

Async Error Handler Function:
You need to implement an async error handler function that accepts a route handler or controller function as input and returns a new function that can be used as middleware in Express.
The async error handler function should handle any errors that occur within the provided route handler or controller function and provide a consistent error response.
If an error occurs during the execution of the function, the async error handler function should catch the error and set the response status code to 500 (Internal Server Error).
The async error handler function should send a JSON response with an error message of "Internal server error" to avoid exposing sensitive information.

Modified Controllers:
You need to modify the existing controllers in your Express application, specifically the getAllUsers and getUserByID functions.
The try-catch blocks in the controllers should be removed, as the error handling will be delegated to the async error handler function.
The modified controllers should utilize the async error handler function to handle any errors that occur during their execution.
The controllers should perform their intended functionality, such as retrieving users from the database or finding a user by ID.
If no users are found in the getAllUsers controller, it should return a response with a status code of 404 (Not Found) and an error message of "User not found".
If a user is not found in the getUserByID controller, it should return a response with a status code of 404 (Not Found) and an error message of "User not found".


By implementing the async error handler function and modifying the controllers according to the above specifications, you will be able to handle and respond to errors consistently in your Express application, improving error handling and providing a better user experience.
*/
const handleAsyncErrors = (fn) => {
    //Wrtie your code here
};

//Make all the necessary changes by removing try-catch
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByID = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
};
  
module.exports = {
  getAllUsers,
  getUserByID,
};
