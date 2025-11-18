const path = require('path');
const fs = require('fs');

function imageRoute(req, res) {
  const file = req.params.file;
  const imgPath = path.join(__dirname, '..', 'public', 'images', file);
  fs.access(imgPath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).json({ error: 'Image not found' });
    res.sendFile(imgPath);
  });
}

module.exports = { imageRoute };
