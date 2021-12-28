//import mongoose from 'mongoose';
const Contact = require('../models/contact.modle');
const mongoose = require('mongoose')
const httpMsgs = require("http-msgs");
const { format } = require('date-fns');
//get all new
module.exports.getContact = function (req, res, next) {
    Contact.find()
        .then((allContacts) => {
            allContacts = allContacts.map(contact => contact.toObject());
            return res.render('admin/index', { allContacts });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}
module.exports.getSingleContact = function (req, res, next) {
    const id = req.params.id;
    Contact.findOne({ _id: parseInt(id) })
        .then((singleContact) => {
            return res.render('admin/viewDetailContact', { singleContact: singleContact.toObject() });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This contact does not exist',
                error: err.message,
            });
        });
}
module.exports.addContact = function (req, res, next) {
    const dateFormat = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const contact = new Contact({
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        subject: req.body.subject,
        note: req.body.note,
        create_day: dateFormat,
        status: 'unRead'
    });

    return contact
        .save()
        .then((newcContact) => { })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}
//update status contact
module.exports.updateStatus = function (req, res, next) {
    const data = req.body;
    Contact.updateOne({ _id: parseInt(data.data) }, { 'status': "read" })
        .then(() => {
            httpMsgs.sendJSON(req, res, { 'boolean': true });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}
//Delete contact data
module.exports.deleteContact_id = function (req, res, next) {
    const data = req.body;
    Contact.findByIdAndRemove(data.data)
    .exec()
    .then(()=> {httpMsgs.sendJSON(req, res, { 'boolean': true })})
    .catch((err) => res.status(500).json({
      success: false,
    }));
}