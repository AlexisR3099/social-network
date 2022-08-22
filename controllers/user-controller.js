const { User, Thought } = require('../models');

const userController = {
    // GET
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // GET by id
    getById(req, res) {
        User.findOne({ _id: req.params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //POST new user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //PUT update by id
    updateUser({params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(deletedUser => {
            Thought.deleteMany({ username: deletedUser.username })
            .catch(err => res.json(err));
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'Deleted User'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController;