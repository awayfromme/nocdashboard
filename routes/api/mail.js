const express = require('express');
const router = express.Router();
const passport = require('passport');
const Mail = require('../../models/Mail');

router.use(passport.authenticate('jwt', { session: false }));

// Routes

//GET DATA
router.get('/', (req, res) => {

    Mail.find({  })
        .then((data) => {
            res.json( data);
        })
        .catch(() => res.status(500).json({ msg: 'Unable to load data' }));
});
// SAVE DATA
router.post('/save', async (req, res) => {
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

    try {
      const savedMail = await newMail.save();
      return res.status(201).json(savedMail);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to save record' });
    }
});

//DELETE DATA
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedMail = await Mail.findByIdAndDelete(req.params.id);
      if (!deletedMail) return res.status(404).json({ msg: 'Record not found' });
      return res.json(deletedMail);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to delete record' });
    }
  });


//UPDATE DATA
router.put("/update/:id", async (req, res) => {
    const fields = ['send', 'des', 'Sub', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'imp', 'Start', 'complete', 'loc', 'notes', 'week', 'day', 'started', 'when'];
    const updates = fields.reduce((data, field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
      return data;
    }, {});

    try {
      const mail = await Mail.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
      if (!mail) return res.status(404).json({ msg: 'Record not found' });
      return res.json(mail);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to update record' });
    }
  });
 


module.exports = router;
