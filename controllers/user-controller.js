const { User, Thought } = require("../models");

const userController = {
  // get all users
  getUsers(req, res) {
    User.find({})
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  // get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createNewUser(req, res) {
    console.log(req.body)
    User.create(req.body)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(500).json(err));
  },
  //add friends
  
  addFriend(req,res){
          User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: {friends: req.params.friendId}},
              { new: true }
            )
              .then((response) => {
                res.json(response);
              })
              .catch((err) => res.status(500).json(err));  
      },
  
  //delete friends
  deleteFriend(req,res){
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: req.params.friendId}},
        { new: true}
      )
        .then((response) => {
          res.json(response);
        })
        .catch((err) => res.status(500).json(err));  
},

};






module.exports = userController;
