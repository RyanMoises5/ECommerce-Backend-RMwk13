const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags including associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: { model: Product }
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find a single tag by its `id` including its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product }
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
// req.body = { tag_name }
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag's name by its `id` value
// req.body = { tag_name }
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    )
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy(
      { where: { id: req.params.id } }
    )
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
