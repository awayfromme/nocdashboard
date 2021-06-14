const express = require('express');
const router = express.Router();
const cors = require('cors');
const Link = require('../../models/Link');



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: *");
    next();
  });
  


// Routes

//GET DATA
router.get('/', cors(), (req, res, next) => {

    Link.find({  })
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
        LinkId: req.body.LinkId,
        Text: req.body.Text,
        Description: req.body.Description,
        URL: req.body.URL,
        CreatedAt: req.body.CreatedAt,
      };

    const newLink = new Link (data);

    newLink.save((error) => {
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
  
    const deletedLink = Link.remove();

    deletedLink.remove({_id: req.params.id},function(err,Link) {
      console.log("Deleting Link " + req.params.id);
      res.json(Link);
    })
  });


//UPDATE DATA
router.put("/update/:id", (req,res) => { 

    Link.findByIdAndUpdate(req.params.id, req.body, function (err, Link) {

        if (err) return next(err);
        res.json(Link);
       });
      });
 


module.exports = router;