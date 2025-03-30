import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  prompt: {
    type: String,
    required: true
  },
  originalContent: {
    type: String,
    required: true
  },
  humanizedContent: {
    type: String
  },
  contentType: {
    type: String,
    enum: ['general', 'academic', 'business', 'creative', 'technical'],
    required: true
  },
  wordCount: {
    type: Number,
    required: true
  },
  humanityLevel: {
    type: Number,
    min: 0,
    max: 100
  },
  aiDetectionScore: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
contentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Content = mongoose.model('Content', contentSchema);

export default Content; 