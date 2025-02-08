const router = require('express').Router();
const bookController = require('../controllers/bookControllers');

router.get('/', bookController.findAll);
router.post('/', bookController.create); // ✅ This should work
router.delete('/:id', bookController.remove);
router.put('/:id', bookController.update);

module.exports = router;
