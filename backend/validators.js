// Validation middleware for blog posts
const validatePost = (req, res, next) => {
  const { title, content } = req.body;

  // Title validation
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  if (title.length < 3) {
    return res.status(400).json({ error: 'Title must be at least 3 characters long' });
  }

  if (title.length > 200) {
    return res.status(400).json({ error: 'Title must not exceed 200 characters' });
  }

  // Content validation
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content must be a non-empty string' });
  }

  if (content.length < 10) {
    return res.status(400).json({ error: 'Content must be at least 10 characters long' });
  }

  if (content.length > 10000) {
    return res.status(400).json({ error: 'Content must not exceed 10000 characters' });
  }

  // Sanitize inputs
  req.body.title = title.trim();
  req.body.content = content.trim();

  next();
};

const validatePostUpdate = (req, res, next) => {
  const { title, content } = req.body;

  // Allow partial updates - only validate if fields are provided
  if (title !== undefined) {
    if (typeof title !== 'string' || title.length === 0) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    if (title.length < 3 || title.length > 200) {
      return res.status(400).json({ error: 'Title must be between 3 and 200 characters' });
    }
  }

  if (content !== undefined) {
    if (typeof content !== 'string' || content.length === 0) {
      return res.status(400).json({ error: 'Content must be a non-empty string' });
    }
    if (content.length < 10 || content.length > 10000) {
      return res.status(400).json({ error: 'Content must be between 10 and 10000 characters' });
    }
  }

  // Sanitize inputs
  if (req.body.title) req.body.title = req.body.title.trim();
  if (req.body.content) req.body.content = req.body.content.trim();

  next();
};

module.exports = {
  validatePost,
  validatePostUpdate,
};
