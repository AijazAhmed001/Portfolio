const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const localUri = 'mongodb://127.0.0.1:27017/portfolio';

  const tryConnect = async (connectionString, isFallback = false) => {
    try {
      const conn = await mongoose.connect(connectionString, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 4000, // Reduced timeout so fallback attempts happen faster
        socketTimeoutMS: 45000,
      });
      console.log(`✅ MongoDB Connected (${isFallback ? 'Local Fallback' : 'Primary DB'}): ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.error(`❌ MongoDB connection failed on ${isFallback ? 'Local Fallback' : 'Primary DB'}:`, error.message);
      return false;
    }
  };

  // Try primary URI first, fallback if it fails or is a placeholder
  let connected = false;
  if (uri && !uri.includes('YOUR_USERNAME')) {
    connected = await tryConnect(uri, false);
  }

  if (!connected) {
    console.warn(`⚠️  Primary MongoDB unavailable. Attempting to connect to local database at: ${localUri}`);
    connected = await tryConnect(localUri, true);
  }

  if (!connected) {
    console.error('🔴 CRITICAL: Failed to connect to primary or local MongoDB. Portfolio will run in offline mode.');
    // Note: We don't call process.exit(1) here to allow the server to run in offline/memory fallback mode.
  }

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB runtime connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected. Reconnecting...');
  });
};

module.exports = connectDB;
