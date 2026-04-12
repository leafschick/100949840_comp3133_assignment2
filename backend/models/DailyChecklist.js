const mongoose = require('mongoose');

const dailyChecklistSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true
    },
    shiftType: {
      type: String,
      required: true,
      trim: true
    },
    checklistItems: {
      type: [String],
      required: true,
      default: []
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DailyChecklist', dailyChecklistSchema);