const express = require('express');
const router = express.Router();
const passport = require('passport');
const Setconf = require('../../models/Setconf');

router.use(passport.authenticate('jwt', { session: false }));

// Routes

//GET DATA
router.get('/', (req, res) => {

    Setconf.find({  })
        .then((data) => {
            res.json( data);
        })
        .catch(() => res.status(500).json({ msg: 'Unable to load data' }));
});
// SAVE DATA
router.post('/save', async (req, res) => {
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

    try {
      const savedSetconf = await newSetconf.save();
      return res.status(201).json(savedSetconf);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to save record' });
    }
});

//DELETE DATA
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedSetconf = await Setconf.findByIdAndDelete(req.params.id);
      if (!deletedSetconf) return res.status(404).json({ msg: 'Record not found' });
      return res.json(deletedSetconf);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to delete record' });
    }
  });


//UPDATE DATA
router.put("/update/:id", async (req, res) => {
    const fields = ['main1d', 'main2d', 'main1hs', 'main2hs', 'main1he', 'main2he', 'main1ms', 'main2ms', 'main1me', 'main2me', 'ETAH', 'ETAM', 'loc1', 'loc2', 'utc', 'tables1', 'tables2', 'chk72', 'chk24', 'chk1h', 'chk5mas', 'recipients', 'logo1', 'logo2', 'mdes', 'enabled'];
    const updates = fields.reduce((data, field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
      return data;
    }, {});

    try {
      const setconf = await Setconf.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
      if (!setconf) return res.status(404).json({ msg: 'Record not found' });
      return res.json(setconf);
    } catch (error) {
      return res.status(400).json({ msg: 'Unable to update record' });
    }
  });
 


module.exports = router;
