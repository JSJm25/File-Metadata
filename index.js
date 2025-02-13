const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const multer = require('multer');
const upload = multer().single('upfile');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static(process.cwd() + '/public'));

app.use((req, res, next) => {
  let date = new Date();
  console.log(`${req.method}, ${req.path} - ${req.ip}  at ${date.toUTCString()}`);
  next();
}); //Log Requests

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload, (req, res) => {

  if (req.file) {

    const { originalname, mimetype, size } = req.file;
    const responseObject = {
      name: originalname,
      type: mimetype,
      size
    }
    res.json(responseObject);

  } else {
    res.json({error: 'No file uploaded'})
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
