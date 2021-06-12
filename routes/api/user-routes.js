const router  = require('express').Router()

const { 
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser
} =  require('../../controllers/user-controller');

//api/users
router.route('/').get(getUsers).post(createNewUser);

//api/users/:userid
router.route('/:userid').get(getSingleUser).put(updateUser).delete(deleteUser)

// here we add a friend

router.route('/api/users/:userId/friends/:friendId').post().delete()

module.exports = router