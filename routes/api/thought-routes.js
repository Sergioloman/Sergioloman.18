const router =  require('express').Router()

const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

//api/thoughts
router.route('/').get(getThoughts);

//api/thoughts/:thoughtId



//api/thoughts/:thoughtId/reactions

module.exports = router