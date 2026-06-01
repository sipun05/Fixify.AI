const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String
  },

  category: {
    type: String,
    enum: ['CIVIL', 'ELECTRICAL', 'WATER', 'UNKNOWN'],
    default: 'UNKNOWN'
  },

  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'LOW'
  },

  status: {
    type: String,
    enum: ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'],
    default: 'OPEN'
  },

  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Issue', issueSchema);