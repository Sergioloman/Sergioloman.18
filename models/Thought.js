const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "you must write a thought"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
    },
    username: {
      //Which user created this thought
      type: String,
      // String
      required: true,
      // Required
    },
    reactions: [ReactionSchema],
    //Array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
