/**
 * Auth Middleware
 * Verifies that requests are coming from an authenticated administrator by checking
 * the Bearer token in the Authorization header against the ADMIN_PASSWORD environment variable.
 */
const verifyAdmin = (req, res, next) => {
  // Allow GET requests to pass through without authentication (anyone can read)
  if (req.method === 'GET' && !req.path.startsWith('/admin') && req.path !== '/') {
    return next();
  }

  // Admin access check for edit/write operations (POST, PUT, DELETE) or admin endpoints
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin password/token is missing'
    });
  }

  const token = authHeader.split(' ')[1];
  if (token !== adminPassword) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid admin password'
    });
  }

  next();
};

module.exports = verifyAdmin;
