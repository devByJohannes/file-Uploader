const express = require('express');
const router = express.Router();
const multer = require('multer');
const Upload = require('../model/uploadModel');

const { fileUploadController } = require('../controller/uploadController');


//Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage});

//The route for uploading 
router.post('/upload',upload.single('file'), fileUploadController);


//The route for getting the API
router.get('/results', async(req, res) => {
    
        try {
            const uploadedData = await Upload.find();
            res.status(200).json(uploadedData);
            console.log('helloworld')
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
}
);

// Example route in Express backend
router.get("/results/:id", async (req, res) => {
    const resultId = req.params.id;
    
    // You'd normally fetch this from a DB:
     const result = await Upload.findById(resultId);
  
    res.json(result || mockResult);
  });
  

module.exports = router;