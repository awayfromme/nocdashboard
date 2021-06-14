const mongoose = require('mongoose');
const { NULL } = require('node-sass');


// Schema
const Schema = mongoose.Schema;
const SetconfSchema = new Schema({
recipients: String,
main1d:  String,
main2d:  String,
main1hs: String,
main2hs: String,
main1he: String,
main2he: String,
main1ms: String,
main2ms: String,
main1me: String,
main2me: String,
ETAH: String,
ETAM: String,
loc1:  String,
loc2:  String,
utc:  String,
tables1: String,
tables2: String,
chk72: Boolean,
chk24: Boolean,
chk1h: Boolean,
chk5mas: Boolean,
logo1: String,
logo2: String,
mdes: String,
enabled: Boolean,
});

const Setconf = mongoose.model('Setconf', SetconfSchema);

module.exports =  Setconf;
