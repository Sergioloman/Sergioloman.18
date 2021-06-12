const router  = require('express').Router()

const { 
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} =  require('../../controllers/user-controller');

//api/users
router.route('/').get(getUsers).post(createNewUser);

//api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// here we add a friend

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router