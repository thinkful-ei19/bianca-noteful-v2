const express = require('express');
const knex = require('../knex');

const router = express.Router();

/* ========== GET/READ ALL TAGS ========== */
router.get('/tags', (req, res, next) => {
    knex.select('id', 'name')
      .from('tags')
      .then(results => {
        res.json(results);
      })
      .catch(next);
  });
/* ========== GET/READ SINGLE TAGS ========== */
router.get('/tags/:id', (req, res, next) => {
    knex.first('id', 'name')
      .where('id', req.params.id)
      .from('tags')
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(next);
  });

/* ========== POST/CREATE ITEM ========== */
router.post('/tags', (req, res, next) => {
    const { name } = req.body;
  
    /***** Never trust users. Validate input *****/
    if (!name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    const newItem = { name };
  
    knex.insert(newItem)
      .into('tags')
      .returning(['id', 'name'])
      .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results[0];
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });
/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/tags/:id', (req, res, next) => {
    const { name } = req.body;
  
    /***** Never trust users. Validate input *****/
    if (!name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    const updateItem = { name };
  
    knex('tags')
      .update(updateItem)
      .where('id', req.params.id)
      .returning(['id', 'name'])
      .then(([result]) => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => next(err));
  });
/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/tags/:id', (req, res, next) => {
    knex.del()
      .where('id', req.params.id)
      .from('tags')
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

  module.exports = router;
