const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength: 6,
        select:false,
    },
    phone:{
      type:String,
      required:[true, "Phone is required"],
      minlength:11,
      maxlength:11
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either user or admin",
      },
      default: "user",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin:{
      type: Date,
      default: Date.now,
    },
    isActive:{
      type:Boolean,
      default: true
    }
  },
  {
    versionKey: false,
  }
);

// now hash the password this will add salt in the passord so if database is hacked password will not be stolen
userSchema.pre("save", async function(next){

    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});


// a password compare function
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model("User", userSchema);

module.exports = User;
