

const path = require('path');
const express = require('express');
const File = require('../models/file');
const  MulterGoogleCloudStorage = require('multer-google-storage');
const  multer = require('multer');
const Router = express.Router();

/*
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './src/files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});*/

const uploadHandler = multer({
    storage: MulterGoogleCloudStorage.storageEngine({
    autoRetry:true,
    bucket:"researchupload",
    projectId: "conference-316016",
    keyFilename:"./conference-316016-451340383f6e.json",
    filename:(req,file,cb)=>{
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }

  })
})


/*
Router.post('/upload', uploadHandler.any(), function (req, res) {
  console.log(req.files);
  res.json(req.files);
});*/


Router.post(
  '/upload',
  uploadHandler.single('file'),
   (req, res) => {
    try {
      console.log(req.files)

      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });

      console.log(file)

       file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
console.log(file.file_path);
    res.sendFile( file.file_path);
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

module.exports = Router;