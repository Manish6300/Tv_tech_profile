const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const getGFS = () => {
  if (!gfs) {
    const conn = mongoose.connection;
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  }
  return gfs;
};

const getGridFSBucket = () => {
  const db = mongoose.connection.db;
  return new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });
};

module.exports = { getGFS, getGridFSBucket };
