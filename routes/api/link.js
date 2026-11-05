const express = require('express');
const router = express.Router();
const passport = require('passport');
const Link = require('../../models/Link');

router.use(passport.authenticate('jwt', { session: false }));

// Routes

//GET DATA
router.get('/', (req, res) => {

    Link.find({  })
        .then((data) => {
            res.json( data);
        })
        .catch(() => res.status(500).json({ msg: 'Unable to load data' }));
});
// SAVE DATA
router.post('/save', async (req, res) => {
    const data = {
        LinkId: req.body.LinkId,
        Text: req.body.Text,
        Description: req.body.Description,
        URL: req.body.URL,
        CreatedAt: req.body.CreatedAt,
      };

    const newLink = new Link (data);

    try {
      const savedLink = await newLink.save();
      return res.status(201).json(savedLink);
    } catch {
      return res.status(400).json({ msg: 'Unable to save record' });
    }
});

//DELETE DATA
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedLink = await Link.findByIdAndDelete(req.params.id);
      if (!deletedLink) return res.status(404).json({ msg: 'Record not found' });
      return res.json(deletedLink);
    } catch {
      return res.status(400).json({ msg: 'Unable to delete record' });
    }
  });


//UPDATE DATA
router.put("/update/:id", async (req, res) => {
    const fields = ['LinkId', 'Text', 'Description', 'URL', 'CreatedAt'];
    const updates = fields.reduce((data, field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
      return data;
    }, {});

    try {
      const link = await Link.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
      if (!link) return res.status(404).json({ msg: 'Record not found' });
      return res.json(link);
    } catch {
      return res.status(400).json({ msg: 'Unable to update record' });
    }
  });
 


module.exports = router;
