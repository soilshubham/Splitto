const router = require('express').Router();
const Group = require('../models/Group');
const Entry = require('../models/Entry');

// Add entry
router.post('/add', async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupID);

        const newEntry = await new Entry({
            name: req.body.name,
            amount: req.body.amount,
            payer: req.body.payerID,
            paidFor: req.body.paidForID,
        });

        group.entries.push(newEntry._id);
        await group.save();
        await newEntry.save();
        res.json({
            msg: 'Entry added successfully',
            msgError: false,
        });
    }
    catch (err) {
        res.status(500).json({ 
            msgError: true, 
            msg: "Error: " + err 
        });
    }
})

module.exports = router;