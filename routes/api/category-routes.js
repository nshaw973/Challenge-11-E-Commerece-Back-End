const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // Looks through the category column and finds the primary key, by using the req.params.id which is the /:id inputed by the user.
    const categoryData = await Category.findByPk(req.params.id, {
      //populates with the Products associated via a JOIN, on the category_id value that was given to the product that equals teh category PK.
      include: [{ model: Product}]
    });
    // wrong id number leads to error
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    //gives 200 status and displays the catagory id searched for and it's associated products.
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updated CATEGORY body for POST, and PUT
/*   
{
  "category_name": "ENTER NAME OF CATEGORY HERE",
} 
*/

router.post('/', async (req, res) => {
  // create a new category
  try {
    // Adds the body in the request section into the Category json column. 
    // Will only work if the body matches the template above.
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // Grabs the json template with the new name in the category_name, and will only do it where the id matches the /:id in the link
    const categoryData = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // Deletes the full category where the id matches the id added in the link
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
