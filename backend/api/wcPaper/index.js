const { Router } = require('express');
const {
  getArea
} = require('./wcPaper');

const router = Router();

router.post('/', getArea);






module.exports = router;