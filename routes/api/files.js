const express = require('express');
const router = express.Router();
const passport = require('passport');
const File = require('../../models/File');

router.use(passport.authenticate('jwt', { session: false }));

// Routes

//GET DATA
router.get('/', (req, res) => {

    File.find({  })
        .then((data) => {
            res.json( data);
        })
        .catch(() => res.status(500).json({ msg: 'Unable to load data' }));
});
// SAVE DATA
router.post('/save', (req, res) => {
    File.create(req.body)
      .then(file => res.status(201).json(file))
      .catch(() => res.status(400).json({ msg: 'Unable to save file record' }));
});

//DELETE DATA
router.delete('/delete/:id', async (req, res) => {
    try {
      const file = await File.findByIdAndDelete(req.params.id);
      if (!file) return res.status(404).json({ msg: 'Record not found' });
      return res.json(file);
    } catch {
      return res.status(400).json({ msg: 'Unable to delete record' });
    }
  });


//UPDATE DATA
router.put("/update/:id", async (req, res) => {
    const fields = ['name', 'size', 'dateModified', 'thumbnail', 'isDirectory', 'hasSubDirectories'];
    const updates = fields.reduce((data, field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
      return data;
    }, {});

    try {
      const file = await File.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
      if (!file) return res.status(404).json({ msg: 'Record not found' });
      return res.json(file);
    } catch {
      return res.status(400).json({ msg: 'Unable to update record' });
    }
  });
 


module.exports = router;
