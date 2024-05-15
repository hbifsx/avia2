// controllers/flightNumberController.js
const { FlightNumber } = require('../models/models');

const FlightNumberController = {
  /**
   * @swagger
   * /flightNumbers:
   *   get:
   *     summary: Retrieve a list of all flight numbers
   *     responses:
   *       200:
   *         description: A list of flight numbers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/FlightNumber'
   */
  getAllFlightNumbers: async (req, res) => {
    try {
      const flightNumbers = await FlightNumber.findAll();
      res.json(flightNumbers);
    } catch (error) {
      console.error('Error fetching flight numbers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /flightNumbers:
   *   post:
   *     summary: Create a new flight number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/FlightNumber'
   *     responses:
   *       201:
   *         description: Successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FlightNumber'
   */
  createFlightNumber: async (req, res) => {
    try {
      const newFlightNumber = await FlightNumber.create(req.body);
      res.status(201).json(newFlightNumber);
    } catch (error) {
      console.error('Error creating flight number:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /flightNumbers/{id}:
   *   put:
   *     summary: Update a flight number
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the flight number to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/FlightNumber'
   *     responses:
   *       200:
   *         description: Updated flight number object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FlightNumber'
   *       404:
   *         description: Flight number not found
   */
  updateFlightNumber: async (req, res) => {
    try {
      const flightNumber = await FlightNumber.findByPk(req.params.id);
      if (flightNumber) {
        await flightNumber.update(req.body);
        res.json(flightNumber);
      } else {
        res.status(404).json({ error: 'Flight number not found' });
      }
    } catch (error) {
      console.error('Error updating flight number:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = FlightNumberController;