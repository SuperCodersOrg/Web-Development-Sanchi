const express=require('express');
const router=express.Router();
const path=require('path');
const studentController = require('../controller/studentController');

router.use(studentController);
router.use(express.static(path.join(__dirname, '..' , 'public')));
console.log(path.join(__dirname,'..','public'));
router.use(express.urlencoded({ extended: true }));

module.exports = router;