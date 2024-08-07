const path = require('path')

//Import multer
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const storage = multer.diskStorage({
//     destination: './uploads/profiles',
//     filename: function(req, file, cb) {
//       cb(null, req.body.fullname + path.extname(file.originalname));
//     }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage });
// const upload = multer({ storage: storage });

module.exports = upload;