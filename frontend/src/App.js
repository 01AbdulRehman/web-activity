import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking...');

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE}/health`);
      setBackendStatus('✅ Connected');
    } catch (error) {
      setBackendStatus('❌ Disconnected');
      console.error('Backend health check failed:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/posts`, {
        title,
        content,
        author: author || 'Anonymous',
        tags: [],
      });

      setPosts([response.data, ...posts]);
      setTitle('');
      setContent('');
      setAuthor('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📝 Blog Platform</h1>
        <p className="status">Backend Status: {backendStatus}</p>
      </header>

      <main className="container">
        <section className="create-post-section">
          <h2>Create New Post</h2>
          <form onSubmit={handleCreatePost} className="post-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                placeholder="Post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                id="author"
                type="text"
                placeholder="Your name (optional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                placeholder="Post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Publish Post
            </button>
          </form>
        </section>

        <section className="posts-section">
          <h2>All Posts</h2>
          {loading ? (
            <p className="loading">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="no-posts">No posts yet. Create one to get started!</p>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <article key={post._id} className="post-card">
                  <h3>{post.title}</h3>
                  <p className="post-meta">
                    By <strong>{post.author}</strong> on{' '}
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                  </p>
                  <p className="post-content">{post.content}</p>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
