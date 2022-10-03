const { mongoose } = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
      uniquue: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid phone Number",
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a emergency contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone Number",
      },
    },
    tradeLicenceNumber: {
      type: Number,
      required: [true, "Please provide your trade licence number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide your permanent address"],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
          "rajshahi",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymenshing",
        ],
        message: "{VALUE} is not acorrect division!",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
