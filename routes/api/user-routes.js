const router = require('express').Router();

const {getUsers, getById, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');

router
.route('/')
.get(getUsers)
.post(createUser);

router
.route('/:id')
.get(getById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;