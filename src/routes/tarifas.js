const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/tarifas:
 *   get:
 *     summary: Obtener todas las tarifas
 *     tags: [Tarifas]
 *     responses:
 *       200:
 *         description: Lista de tarifas
 */
router.get('/api/tarifas', (req, res) => {
  res.json([{ id: 1, costoBase: 1500 }]);
});

module.exports = router;