const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  sno: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  members: { type: Number, required: true },
  totalRupees: { type: Number, required: true },
  remark: { type: String, default: "" }, // Ensure remark field exists
  year: { type: Number, required: true }
});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
