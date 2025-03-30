import express from 'express';
import OpenAI from 'openai';
import { auth } from '../middleware/auth.js';
import Content from '../models/Content.js';
import { z } from 'zod';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Validation schemas
const generateContentSchema = z.object({
  prompt: z.string().min(1),
  contentType: z.enum(['general', 'academic', 'business', 'creative', 'technical']),
  wordCount: z.number().min(100).max(1000),
  title: z.string().min(1)
});

const humanizeContentSchema = z.object({
  contentId: z.string(),
  humanityLevel: z.number().min(0).max(100)
});

// Generate content
router.post('/generate', auth, async (req, res) => {
  try {
    const { prompt, contentType, wordCount, title } = generateContentSchema.parse(req.body);

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional content writer. Generate ${contentType} content with approximately ${wordCount} words.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: Math.ceil(wordCount * 1.5), // Approximate tokens needed
      temperature: 0.7
    });

    const generatedContent = completion.choices[0].message.content;

    // Save content to database
    const content = new Content({
      userId: req.user.userId,
      title,
      prompt,
      originalContent: generatedContent,
      contentType,
      wordCount
    });

    await content.save();

    res.status(201).json({
      message: 'Content generated successfully',
      content
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Error generating content' });
  }
});

// Humanize content
router.post('/humanize', auth, async (req, res) => {
  try {
    const { contentId, humanityLevel } = humanizeContentSchema.parse(req.body);

    // Find content
    const content = await Content.findOne({
      _id: contentId,
      userId: req.user.userId
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Generate humanized version using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a content humanizer. Rewrite the following content to make it sound more natural and human-like, with a humanity level of ${humanityLevel}%. Maintain the same information but use more conversational language, add some personality, and make it less AI-like.`
        },
        {
          role: "user",
          content: content.originalContent
        }
      ],
      temperature: 0.8
    });

    const humanizedContent = completion.choices[0].message.content;

    // Update content with humanized version
    content.humanizedContent = humanizedContent;
    content.humanityLevel = humanityLevel;
    content.aiDetectionScore = Math.max(0, 100 - humanityLevel); // Simple calculation
    await content.save();

    res.json({
      message: 'Content humanized successfully',
      content
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Error humanizing content' });
  }
});

// Get user's content history
router.get('/history', auth, async (req, res) => {
  try {
    const contents = await Content.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content history' });
  }
});

// Get single content item
router.get('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
});

// Delete content
router.delete('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content' });
  }
});

export default router; 