const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    //Array of _id values referencing the Thought model
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    //Array of _id values referencing the User model
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);
module.exports = User;
