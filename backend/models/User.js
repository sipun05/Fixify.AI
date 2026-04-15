const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: {
    type: String,
    enum: ['user', 'technician', 'admin'],
    default: 'user'
  },
  firebase_uid: { type: String },
  community_id: { type: String },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    block: String,
    unit: String
  },
  karma_points: { type: Number, default: 0 },
  issue_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  created_at: { type: Date, default: Date.now }
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);