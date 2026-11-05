const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema(
{
AppointmentId: String,
Text: String,
Description: String,
StartDate: Date,
EndDate: Date,
AllDay: Boolean,
Notes:{
    type: String,
    DateCreated: Date,
    },
    OrderIndex: String,
Time: String,
RecurrenceRule:{
type: String,
default: null,
},
RecurrenceException:{
type: String,
default: null,
},
isDay: Boolean,
default: false,
done: Boolean,
default:false
}
);


// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports =  BlogPost;
