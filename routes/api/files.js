const express = require('express');
const router = express.Router();
const cors = require('cors');
const File = require('../../models/File');



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: *");
    next();
  });
  


// Routes

//GET DATA
router.get('/', cors(), (req, res, next) => {

    File.find({  })
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
        AppointmentId: req.body.AppointmentId,
        Text: req.body.Text,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        AllDay: req.body.AllDay,
        RecurrenceRule: req.body.RecurrenceRule,
        RecurrenceException: req.body.RecurrenceException,
      };

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

//DELETE DATA
router.delete('/delete/:id',cors(), function(req, res, next) {
  
    const deletedBlogPost = BlogPost.remove();

    deletedBlogPost.remove({_id: req.params.id},function(err,BlogPost) {
      console.log("Deleting Task " + req.params.id);
      res.json(BlogPost);
    })
  });


//UPDATE DATA
router.put("/update/:id", (req,res) => { 

    BlogPost.findByIdAndUpdate(req.params.id, req.body, function (err, BlogPost) {

        if (err) return next(err);
        res.json(BlogPost);
       });
      });
 


module.exports = router;