const express = require('express');
const router = express.Router();
const cors = require('cors');
const Mail = require('../../models/Mail');



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: *");
    next();
  });
  


// Routes

//GET DATA
router.get('/', cors(), (req, res, next) => {

    Mail.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json( data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});
// SAVE DATA
router.post('/save', cors(), (req, res, next) => {
    const data = {
        send: req.body.send,
        des: req.body.des,
        Sub: req.body.Sub,
        d1: req.body.d1,
        d2: req.body.d2,
        d3: req.body.d3,
        d4: req.body.d4,
        d5: req.body.d5,
        d6: req.body.d6,
        d7: req.body.d7,
        imp: req.body.imp,
        Start: req.body.Start,
        complete:  req.body.complete,
        loc: req.body.loc,
        notes: req.body.notes,
        week: req.body.week,
        day: req.body.day,
        started: req.body.started,
        when: req.body.when,
      };

    const newMail = new Mail (data);

    newMail.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
      
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

//DELETE DATA
router.delete('/delete/:id',cors(), function(req, res, next) {
  
    const deletedMail = Mail.remove();

    deletedMail.remove({_id: req.params.id},function(err,Mail) {
      console.log("Deleting Mail " + req.params.id);
      res.json(Mail);
    })
  });


//UPDATE DATA
router.put("/update/:id", (req,res) => { 

    Mail.findByIdAndUpdate(req.params.id, req.body, function (err, Mail) {

        if (err) return next(err);
        res.json(Mail);
       });
      });
 


module.exports = router;