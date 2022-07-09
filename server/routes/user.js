const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = newPassword;
        }
        catch (err) {
            res.status(500).json({
                msgError: true,
                msg: "Error: " + err
            });
        }
    }
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        res.status(200).json("User updated");
    }
    catch (err) {
        res.status(500).json({
            msgError: true,
            msg: "Error: " + err
        });
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted");
    }
    catch (err) {
        res.status(500).json({
            msgError: true,
            msg: "Error: " + err
        });
    }
})

// get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({ path: 'groups', select: ['name'] });
        const { password, updatedAt, createdAt, ...userData } = user._doc;
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json({
            msgError: true,
            msg: "Error: " + err
        });
    }
})

module.exports = router;