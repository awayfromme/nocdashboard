const mongoose = require('mongoose');
const { NULL } = require('node-sass');


// Schema
const Schema = mongoose.Schema;
const MailSchema = new Schema(
{
send:
{ type: Boolean,
default: false
},
d1: { 
type: Boolean,
default: false
},
d2: 
{ type: Boolean,
default: false
},
d3: 
{ type: Boolean,
default: false
},
d4: 
{ type: Boolean,
default: false
},
d5: 
{ type: Boolean,
default: false
},
d6: 
{ type: Boolean,
default: false
},
d7: 
{ type: Boolean,
default: false
},
d8: 
{ type: Boolean,
default: false
},
Sub:
{ type: String,
required: true
},
imp:
{ type: String,
required: true
},
loc:
{ type: String,
required: true
},
Start:
{ type: Date,
required: true
},
complete:
{ type: Date,
required: true
},
des:
{ type: String,
required: true
},
when: {
type:Date,
default: undefined
},
week: 
{ type: Boolean,
default: false
},
day: 
{ type: Boolean,
default: false
},
started: 
{ type: Boolean,
default: false
},
notes: String
}
);


// Model
const Mail = mongoose.model('Mail', MailSchema);

module.exports =  Mail;
