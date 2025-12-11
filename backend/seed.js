const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_platform';

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

async function seed() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    // Remove existing sample posts
    await Post.deleteMany({ author: 'Seed' });

    const posts = [
      {
        title: 'Welcome to the Blog',
        content: 'This is the first sample post created by the seed script. Edit or delete it from the app.',
        author: 'Seed',
        tags: ['welcome', 'seed']
      },
      {
        title: 'Second sample post',
        content: 'More content to help you test the UI and API endpoints.',
        author: 'Seed',
        tags: ['sample']
      }
    ];

    const created = await Post.insertMany(posts);
    console.log('Seeded posts:', created.map(p => ({ id: p._id, title: p.title })));
    await mongoose.disconnect();
    console.log('Disconnected after seeding');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
