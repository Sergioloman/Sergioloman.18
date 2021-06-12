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
router.route('/').get(getThoughts).post(createNewThought);

//api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// here we add/delete reactions

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);


module.exports = router