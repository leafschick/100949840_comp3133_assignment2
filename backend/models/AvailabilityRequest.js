const mongoose = require('mongoose');

const availabilityRequestSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true
    },
    availableDays: {
      type: [String],
      required: true,
      default: []
    },
    preferredShift: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('AvailabilityRequest', availabilityRequestSchema);