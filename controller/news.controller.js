//import mongoose from 'mongoose';
var News = require('../models/new.modle');
module.exports.getNews = function(req, res, next) {
    News
      .find() // find tất cả các data
      .limit(4)
      .exec((err, allNews) => {
        News.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
          res.render('news', { allNews});
        });
      });
}
module.exports.singleNews = function(req, res, next) {
    const id = req.params.id;
    News.findById({ _id: id })
        .then((singleNews) => {
            return res.render('newsDetail',{ singleNews: singleNews.toObject() });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This contact does not exist',
                error: err.message,
            });
        });
}

//Add image to server 
