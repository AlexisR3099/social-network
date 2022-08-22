const router = require('express').Router();

const {getUsers, getById, createUser, changeUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');

router
.route('/')
.get(getUsers)
.post(createUser);

router
.route('/:id')
.get(getById)
.put(changeUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteUser)

module.exports = router;