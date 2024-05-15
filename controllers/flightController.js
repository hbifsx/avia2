// controllers/flightController.js
const { Flight } = require('../models/models');

/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       required:
 *         - airportArrival
 *         - airportDeparture
 *         - aviaCompany
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the flight
 *         airportArrival:
 *           type: string
 *           description: The arrival airport of the flight
 *         airportDeparture:
 *           type: string
 *           description: The departure airport of the flight
 *         aviaCompany:
 *           type: string
 *           description: The airline company of the flight
 *       example:
 *         airportArrival: "JFK"
 *         airportDeparture: "LAX"
 *         aviaCompany: "Delta"
 */

const FlightController = {
  /**
   * @swagger
   * /flight:
   *   get:
   *     summary: Retrieve a list of all flights
   *     responses:
   *       200:
   *         description: A list of flights
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Flight'
   */
  getAllFlights: async (req, res) => {
    try {
      const flights = await Flight.findAll();
      res.json(flights);
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /flights:
   *   post:
   *     summary: Create a new flight
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Flight'
   *     responses:
   *       201:
   *         description: Successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Flight'
   */
  createFlight: async (req, res) => {
    try {
      const newFlight = await Flight.create(req.body);
      res.status(201).json(newFlight);
    } catch (error) {
      console.error('Error creating flight:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /flights/{id}:
   *   get:
   *     summary: Retrieve a flight by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the flight to retrieve
   *     responses:
   *       200:
   *         description: A flight object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Flight'
   *       404:
   *         description: Flight not found
   */
  getFlightById: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (flight) {
        res.json(flight);
      } else {
        res.status(404).json({ error: 'Flight not found' });
      }
    } catch (error) {
      console.error('Error fetching flight by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /flights/{id}:
   *   put:
   *     summary: Update a flight
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the flight to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Flight'
   *     responses:
   *       200:
   *         description: Updated flight object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Flight'
   *       404:
   *         description: Flight not found
   */
  updateFlight: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (flight) {
        await flight.update(req.body);
        res.json(flight);
      } else {
        res.status(404).json({ error: 'Flight not found' });
      }
    } catch (error) {
      console.error('Error updating flight:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * @swagger
   * /flights/{id}:
   *   delete:
   *     summary: Delete a flight
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the flight to delete
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       404:
   *         description: Flight not found
   */
  deleteFlight: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (flight) {
        await flight.destroy();
        res.json({ message: 'Flight deleted successfully' });
      } else {
        res.status(404).json({ error: 'Flight not found' });
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = FlightController;