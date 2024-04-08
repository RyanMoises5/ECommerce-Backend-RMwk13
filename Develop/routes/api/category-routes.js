const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories, including data of associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { model: Product }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its `id` value, including data of associated products 
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
// req.body = { category_name }
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a category by its `id` value
// req.body = { category_name }
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    )
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy(
      { where: { id: req.params.id } }
    )
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
