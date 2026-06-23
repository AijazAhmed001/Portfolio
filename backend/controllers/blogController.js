const Blog = require('../models/Blog');

/**
 * GET /api/blogs
 * Get all published blogs
 */
const getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find({ published: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content')
        .lean(),
      Blog.countDocuments({ published: true }),
    ]);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/blogs/:slug
 * Get single blog by slug
 */
const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true }).lean();
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// Seed default blogs
const seedBlogs = async (req, res, next) => {
  try {
    const count = await Blog.countDocuments();
    if (count > 0) return res.status(200).json({ success: true, message: 'Blogs already seeded' });

    const defaultBlogs = [
      {
        title: 'Getting Started with MERN Stack Development',
        excerpt: 'A complete guide to building full-stack applications with MongoDB, Express, React, and Node.js.',
        content: '<p>The MERN stack is one of the most popular technology stacks for building modern web applications...</p>',
        tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
        readTime: '8 min read',
        slug: 'getting-started-with-mern-stack',
        published: true,
      },
      {
        title: 'Mastering React Hooks: useState, useEffect, and Custom Hooks',
        excerpt: 'Deep dive into React Hooks and how they change the way we write React components.',
        content: '<p>React Hooks revolutionized how we write React components by allowing state in functional components...</p>',
        tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
        readTime: '6 min read',
        slug: 'mastering-react-hooks',
        published: true,
      },
      {
        title: 'Building Secure REST APIs with Node.js and Express',
        excerpt: 'Best practices for building production-ready, secure APIs with Node.js, Express, and MongoDB.',
        content: '<p>Security is paramount when building APIs. In this guide, we will explore the best practices...</p>',
        tags: ['Node.js', 'Express', 'Security', 'API'],
        readTime: '10 min read',
        slug: 'building-secure-rest-apis',
        published: true,
      },
    ];

    await Blog.insertMany(defaultBlogs);
    res.status(201).json({ success: true, message: 'Blogs seeded successfully' });
  } catch (error) {
    next(error);
  }
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};

// POST /api/blogs
const createBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body };
    if (!blogData.slug && blogData.title) {
      blogData.slug = slugify(blogData.title);
    }
    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
  } catch (error) {
    next(error);
  }
};

// PUT /api/blogs/:id
const updateBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body };
    if (blogData.title && !blogData.slug) {
      blogData.slug = slugify(blogData.title);
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/blogs/:id
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully', data: blog });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  seedBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
