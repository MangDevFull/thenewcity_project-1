const express = require('express');
const router = express.Router();
const news = require("../controller/news.handle.controller");
const contact = require("../controller/contact.controller")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

router.use(function (req, res, next) {
    res.locals.layout = './admin/layout';
    next();
});
router.get('/home', contact.getContact)
router.get('/news', news.getNews)
router.get('/viewDetailContact_id=:id', contact.getSingleContact);
router.get('/viewDetailNew_id=:id', news.getSingleNews);
router.delete('/deleteContact', contact.deleteContact_id)
router.delete('/deleteNews', news.delete_new)
router.get('/addnew', (req, res, next) => {
    res.render('admin/addnew.hbs', { title: "Thêm mới tin tức" })
})
//router.post('/addN', news.AddNews)
router.post('/addThumImage', upload.fields([{ name: 'thumb',maxCount:1 }, { name: 'content',maxCount:1 }]),(req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
})
router.post('/addN',news.AddNews)
router.get('/updatenew', (req, res, next) => {
    res.render('admin/updatenew.hbs', { title: "Cập nhật tin tức" })
})
router.put('/updateStatus', contact.updateStatus)

module.exports = router;