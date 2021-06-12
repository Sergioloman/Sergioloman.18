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
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughtText: _id } },
                { new: true }
            )
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
        Thought.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { thoughtText: req.params.thoughtId}},
            { new: true}
        )
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    },

////////////////definetely could use some help here:

    // create reaction
    createReaction(req,res){
        Thought.create(req.body)
        .then(({ _id })=>{
            return Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $push: { reactions: _id}},
            { new: true}
            )
        })
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
        
    },

    // delete reaction
    deleteReaction(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .then(({_id})=>{
            return Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: {reactions: _id}},
                { new:true}
            )
        })
        .then((response) => {
            res.json(response);
          })
          .catch((err) => res.status(500).json(err));
    }


};

module.exports = thoughtController;