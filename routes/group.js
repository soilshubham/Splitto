const router = require('express').Router();
const User = require('../models/User');
const Group = require('../models/Group');

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

            const newUser = await User.findById(req.body.userID).populate('groups');
            res.status(200).json({
                msg: "Group Joined Successfully",
                msgError: false,
                user: newUser
            });
        } else {
            res.status(200).json({
                msgError: true,
                msg: "User already in group",
                user: user,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msgError: true,
            msg: "Error: " + err
        });
    }
})

// Get Group
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            .populate({
                path: 'users',
                select: ['name'],
            })
            .populate({
                path: 'entries',
                select: ['name', 'amount', 'payer', 'paidFor'],
                populate: [{
                    path: 'payer',
                    select: ['name'],
                },
                {
                    path: 'paidFor',
                    select: ['name'],
                }
                ],
            });
        const { updatedAt, ...groupData } = group._doc;
        res.status(200).json(groupData);
    }
    catch (err) {
        res.status(500).json({
            msgError: true,
            msg: "Error: " + err
        });
    }
})

module.exports = router;