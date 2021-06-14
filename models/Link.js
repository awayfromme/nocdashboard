const mongoose = require('mongoose');
const { NULL } = require('node-sass');


// Schema
const Schema = mongoose.Schema;
const LinkSchema = new Schema(
{
LinkId: String,
Text: String,
Description: String,
URL: String,
CreatedAt: Date,
}
);

const Link = mongoose.model('Link', LinkSchema);

module.exports =  Link;
