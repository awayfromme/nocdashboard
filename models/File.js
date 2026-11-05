const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const FileSchema = new Schema(
{
name: String,
size: Number,
dateModified: Date,
thumbnail: String,
isDirectory: Boolean,
hasSubDirectories: Boolean,
}
);


// Model
const File = mongoose.model('File', FileSchema);

module.exports =  File;
