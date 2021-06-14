const express = require('express');
const router = express.Router();
const cors = require('cors');
const Setconf = require('../../models/Setconf');



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: *");
    next();
  });
  


// Routes

//GET DATA
router.get('/', cors(), (req, res, next) => {

    Setconf.find({  })
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
        main1d: req.body.main1d,
        main2d: req.body.main2d,
        main1hs: req.body.main1hs,
        main2hs: req.body.main2hs,
        main1he: req.body.main1he,
        main2he: req.body.main2he,
        main1ms: req.body.main1ms,
        main2ms:  req.body.main2ms,
        main1me: req.body.main1me,
        main2me:  req.body.main2me,
        ETAH:  req.body.ETAH,
        ETAM:  req.body.ETAM,
        loc1: req.body.loc1,
        loc2: req.body.loc2,
        utc: req.body.utc,
        tables1: req.body.tables1,
        tables2: req.body.tables2,
        chk72: req.body.chk72,
        chk24: req.body.chk24,
        chk1h: req.body.chk1h,
        chk5mas: req.body.chk5mas
      };

    const newSetconf = new Setconf (data);

    newSetconf.save((error) => {
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
  
    const deletedSetconf = Setconf.remove();

    deletedSetconf.remove({_id: req.params.id},function(err,Setconf) {
      console.log("Deleting configuration setting " + req.params.id);
      res.json(Setconf);
    })
  });


//UPDATE DATA
router.put("/update/:id", (req,res) => { 

    Setconf.findByIdAndUpdate(req.params.id, req.body, function (err, Setconf) {

        if (err) return next(err);
        res.json(Setconf);
       });
      });
 


module.exports = router;