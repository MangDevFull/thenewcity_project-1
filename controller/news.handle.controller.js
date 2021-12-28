var News = require('../models/new.modle');
var save = require('summernote-nodejs');
const mongoose = require('mongoose')
const httpMsgs = require("http-msgs");
const { format } = require('date-fns');
module.exports.getNews = function(req, res, next) {
    News.find()
        .then((allNews) => {
            allNews = allNews.map(news => news.toObject());
            return res.render('admin/news', { allNews });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}
module.exports.getSingleNews= function (req, res, next) {
    const id = req.params.id;
    News.findById({ _id: id })
        .then((singleNews) => {
            return res.render('admin/viewDetailNews',{ singleNews: singleNews.toObject() });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This contact does not exist',
                error: err.message,
            });
        });
}
module.exports.AddNews = function(req, res, next) {
    const dateFormat = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const data = req.body;
    console.log(data.title)
    console.log(dateFormat)
    const news = new News({
        _id: mongoose.Types.ObjectId(),
        title: data.title,
        description: data.des,
        content: data.content,
        thumb : data.thumb,
        image_content : data.imgC,
        create_day : dateFormat
      });
      return news
        .save()
        .then(() => {
            httpMsgs.sendJSON(req,res,{'boolean' : true})
          })
        .catch((error) => {
            console.log(error);
          res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
        });
}
module.exports.delete_new = function (req, res, next) {
    const data = req.body;
    News.findByIdAndRemove(data.data)
    .exec()
    .then(()=> {httpMsgs.sendJSON(req, res, { 'boolean': true })})
    .catch((err) => res.status(500).json({
      success: false,
    }));
}