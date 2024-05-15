// controllers/favoriteController.js
const { Favorite } = require('../models/models');
/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: API для управления авторами книг
 */
const FavoriteController = {
  /**
   * @swagger
   * /favorites:
   *   get:
   *     summary: Retrieve a list of all favorites
   *     responses:
   *       200:
   *         description: A list of favorites
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Favorite'
   */
  getAllFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.findAll();
      res.json(favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /favorites:
   *   post:
   *     summary: Create a new favorite
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Favorite'
   *     responses:
   *       201:
   *         description: Successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Favorite'
   */
  createFavorite: async (req, res) => {
    try {
      const newFavorite = await Favorite.create(req.body);
      res.status(201).json(newFavorite);
    } catch (error) {
      console.error('Error creating favorite:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /favorites/{id}:
   *   put:
   *     summary: Update a favorite
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the favorite to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Favorite'
   *     responses:
   *       200:
   *         description: Updated favorite object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Favorite'
   *       404:
   *         description: Favorite not found
   */
  updateFavorite: async (req, res) => {
    try {
      const favorite = await Favorite.findByPk(req.params.id);
      if (favorite) {
        await favorite.update(req.body);
        res.json(favorite);
      } else {
        res.status(404).json({ error: 'Favorite not found' });
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = FavoriteController;