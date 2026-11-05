const express = require('express');
const router = express.Router();
const passport = require('passport');
const BlogPost = require('../../models/BlogPost');

router.use(passport.authenticate('jwt', { session: false }));

// Routes

//GET DATA
router.get('/', (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            res.json( data);
        })
        .catch(() => res.status(500).json({ msg: 'Unable to load data' }));
});
// SAVE DATA
router.post('/save', async (req, res) => {
    const data = {
        AppointmentId: req.body.AppointmentId,
        Text: req.body.Text,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        AllDay: req.body.AllDay,
        RecurrenceRule: req.body.RecurrenceRule,
        RecurrenceException: req.body.RecurrenceException,
        done: req.body.done
      };

    const newBlogPost = new BlogPost(data);

    try {
      const savedBlogPost = await newBlogPost.save();
      return res.status(201).json(savedBlogPost);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to save record' });
    }
});

//DELETE DATA
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
      if (!deletedBlogPost) return res.status(404).json({ msg: 'Record not found' });
      return res.json(deletedBlogPost);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to delete record' });
    }
  });


//UPDATE DATA
router.put("/update/:id", async (req, res) => {
    const fields = ['AppointmentId', 'Text', 'Description', 'StartDate', 'EndDate', 'AllDay', 'RecurrenceRule', 'RecurrenceException', 'done'];
    const updates = fields.reduce((data, field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
      return data;
    }, {});

    try {
      const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
      if (!blogPost) return res.status(404).json({ msg: 'Record not found' });
      return res.json(blogPost);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to update record' });
    }
  });
 


module.exports = router;
