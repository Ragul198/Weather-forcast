const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
searchSchema.index({ location: 'text' });
searchSchema.index({ timestamp: -1 });

module.exports = mongoose.models.Search || mongoose.model('Search', searchSchema);
