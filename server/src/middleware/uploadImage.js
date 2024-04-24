// const multer = require("multer");
// const pathModule = require("path"); // Change the variable name for the path module

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'C:/Users/user/Desktop/cravings/server/src/uploads');
//   },
//   filename: function (req, file, cb) {
//     // You can customize the filename as per your requirements
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// // Create multer instance with configured storage
// function uploadFile(uploadPath, folder = "user") { // Change the parameter name
//   const upload = multer({ storage }).fields([
//     {
//       name: "image",
//       maxCount: 1,
//     }
//   ]);



//   async function uploadToLocalFolder(req, res, next) {
//     try {
//       if (req.files?.image) {
//         req.image = pathModule.join("uploads", req.files?.image[0].filename);
//       }

//       next();
//     } catch (e) {
//       console.error("Error during file upload:", e);
//       next(e);
//     }
//   }

//   return [upload, uploadToLocalFolder];
// }

// module.exports = uploadFile;

const multer = require("multer");
const path = require("path");

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/user/Desktop/cravings/server/src/uploads'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Generate a unique filename for the uploaded file
  },
});

// Create multer instance with configured storage
const upload = multer({ storage }).fields([
  { name: "image", maxCount: 1 } // Allow only one file with the field name "image"
]);

// Middleware function to process uploaded file path
async function uploadToLocalFolder(req, res, next) {
  try {
    if (req.files?.image) {
      req.image = path.join("uploads", req.files.image[0].filename); // Set the uploaded file path in the request object
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error during file upload:", error);
    next(error); // Pass the error to the Express error handling middleware
  }
}

// Export middleware functions
module.exports = { upload, uploadToLocalFolder };