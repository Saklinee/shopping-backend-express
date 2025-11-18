// routes/middleware/images.js
const path = require('path');
const fs = require('fs');

// GET /images/:file - return image file or JSON error
function imageRoute(req, res) {
  const file = req.params.file;

  // __dirname is routes/middleware
  // public folder is routes/middleware/public
  const imgPath = path.join(__dirname, 'public', file);

  fs.access(imgPath, fs.constants.F_OK, err => {
    if (err) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.sendFile(imgPath);
  });
}

module.exports = { imageRoute };
