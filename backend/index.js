const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const wcPaper = require('./api/wcPaper/');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json({
    extended: true
  }));

app.use('/api/sinergise', wcPaper);

app.listen(8000, () => {
    console.log('Server has started running on port 8000!')
});
