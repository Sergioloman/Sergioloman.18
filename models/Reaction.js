const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateGetter')

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId() //this is going to create a new instance of it
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
      //use getter to format timestamp on query
    }
  },
  {
    toJSON: {
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

module.exports =  ReactionSchema;
