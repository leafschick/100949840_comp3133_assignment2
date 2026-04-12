const mongoose = require('mongoose');

const incidentReportSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true
    },
    incidentDate: {
      type: String,
      required: true
    },
    incidentType: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('IncidentReport', incidentReportSchema);