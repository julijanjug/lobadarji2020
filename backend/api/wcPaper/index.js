const { Router } = require('express');
const {
  getArea
} = require('./wcPaper');

const router = Router();

router.get('/', getArea);






module.exports = router;