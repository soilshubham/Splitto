const router = require('express').Router();
const User = require('../models/User');
const Group = require('../models/Group');
const bcrypt = require('bcrypt');

// Join Group
router.post('/join-group', async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupID)
        const user = await User.findById(req.body.userID)
        if (!user.groups.includes(group._id)) {
            user.groups.push(group._id);
            group.users.push(user._id);
            await user.save();
            await group.save();
            res.status(200).json("Group Joined Successfully");
        } else {
            res.status(200).json({ msgError: true, msg: "User already in group" });
        }
    }
    catch (err) {
        res.status(500).json({ msgError: true, msg: "error: " + err });
    }
})

// Get Group
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
        const { updatedAt, ...groupData } = group._doc;
        res.status(200).json(groupData);
    }
    catch (err) {
        res.status(500).json({ msgError: true, msg: "error: " + err });
    }
})

// Add entry
router.post('/add-entry', async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupID)
        const user = await User.findById(req.body.userID)
        if (user.groups.includes(group._id)) {
            group.entries.push(req.body.entry);
            await group.save();
            res.status(200).json({ msg: "Entry added successfully", msgError: false });
        } else {
            res.status(200).json({ msgError: true, msg: "User not in group" });
        }
    }
    catch (err) {
        res.status(500).json({ msgError: true, msg: "error: " + err });
    }
})

module.exports = router;