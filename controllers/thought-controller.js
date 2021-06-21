const { User, Thought} = require("../models");

const thoughtController = {
    //get all thoughts
    getThoughts(req, res){
        Thought.find({})
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    },
    //get a sinngle thought
    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    },
    // create a new thought ( push thoughts to associated user)
    createNewThought(req,res){
        Thought.create(req.body)
        .then(({_id})=>{
            return User.findOneAndUpdate(//updating thoughts array in user 
                { username: req.body.username},// use the id of the comment as a param
                { $push: { thoughts: _id } },// pushing to the thoughts field from user model
                { new: true }
            )// we could use req.body.userId to identify the request
            //then push it to toughts :_id
        })
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    },
    // update a thought by _id
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { new: true, runValidators:true}
        )
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));

    },
    // delete a thought by id
    deleteThought(req,res){
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId}
        )
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    },

////////////////definetely could use some help here:

    // create reaction
    createReaction(req,res){
        console.log(req.body),
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $push: [{reactions: req.body}]},                          
            { new: true}
            )
        .then((response) => {
            console.log(response),
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
        
    },

    // delete reaction
    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: { reactionId: req.params.reactionId}}},
            { new:true}
            )
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    }


};

module.exports = thoughtController;