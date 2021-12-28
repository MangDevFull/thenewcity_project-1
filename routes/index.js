const express = require('express');
var mail_controller = require('../controller/mail.controller')
const new_controller = require('../controller/news.controller')
const contact = require('../controller/contact.controller')
const news = require('../controller/news.controller')
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Trang chủ' });
});
router.get('/devisive', (req, res, next) => {
    res.render("divisive", { title: 'Phân khu' })
})
router.get('/phankhuE', (req, res, next) => {
    res.render("phankhuE", { title: 'Phân khu E' })
})
router.get('/phankhuF', (req, res, next) => {
    res.render("phankhuF", { title: 'Phân khu F' })
})
router.get('/phankhuD', (req, res, next) => {
    res.render("phankhuD", { title: 'Phân khu D' })
})
router.get('/phankhuC', (req, res, next) => {
    res.render("phankhuC", { title: 'Phân khu C' })
})
router.get('/phankhuB', (req, res, next) => {
    res.render("phankhuB", { title: 'Phân khu B' })
})
router.get('/phankhuA', (req, res, next) => {
    res.render("phankhuA", { title: 'Phân khu A' })
})
router.get('/about', (req, res, next) => {
    res.render("about", { title: 'Giới thiệu' })
})
router.get('/contact', (req, res, next) => {
    res.render("contact", { title: 'Liên hệ' })
})
router.get('/products', (req, res, next) => {
        res.render("product", { title: 'Sản phẩm' })
    })
    // send mail
router.post('/send_mail', mail_controller.send_mail);
router.post('/send_contact', contact.addContact);
router.get('/viewDetail_id=:id', news.singleNews)
//get all news
router.get('/news', new_controller.getNews)
//router.get('/news2', new_controller.getNews1)

//send mail by ajax
router.post('/postMail',mail_controller.send_mail2)


module.exports = router;