const express=require('express');
const router=express.Router();
const path=require('path');
const teacherController = require('../controller/teacherController');

router.use(teacherController);
router.use(express.static(path.join(__dirname, '..' , 'public')));
router.use(express.urlencoded({ extended: true }));

module.exports=router;