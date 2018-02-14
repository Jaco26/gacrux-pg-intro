const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function(request, response){
  const sqlText = 'SELECT * FROM songs';
  pool.query(sqlText)
    // query was successful
    .then(function(result) {
      console.log('Get result:', result);
      response.send(result.rows);
    })
    // bad things could happen...
    .catch(function(error){
      console.log('Error on Get:', error);
      response.sendStatus(500);
    })
}); 

// GET A SINGLE SONG
router.get('/:id', function (req, res) {// '/:id' is a variable ... '/songs/5' could fill in the variable
  const sqlText = 'SELECT * FROM songs WHERE id=$1'
  const id = req.params.id // get the id from the params --- a thing passed into the url --- in this case, "id"

  pool.query(sqlText, [id])
    .then((result) => {
      console.log(`Getting song: ${id}`);
      res.send(result.rows);
    }).catch(function(error){
      console.log(`error on get song ${id}:`, error);
      res.sendStatus(500);
    });
}); // END router.GET song by id




// UPDATE the rating of a specific song 
router.put('/:id', (req, res) => {
  const id = req.params.id; // store reference to the id of the thing we want to update
  const newRank = req.body.rank; // store reference to the rating passed from the DOM

  const sqlText = `UPDATE songs SET rank=$1 WHERE id=$2`;
  pool.query(sqlText, [newRank, id]).then((result) => {
    console.log('Updated song:', id, ' with rank: ', newRank);
    res.sendStatus(200);
  }).catch((error) =>{
    console.error('error on update song');
    res.sendStatus(500);
  });

}); // END router.PUT


// DELETE A SONG
router.delete('/:id', (req, res) => {
  const sqlText = 'DELETE FROM songs WHERE id=$1'
  const id = req.params.id // get the id from the params --- a thing passed into the url --- in this case, "id"

  pool.query(sqlText, [id])
    .then((result) => {
      console.log(`Deleted song: ${id}`);
      res.send(result.rows);
    }).catch(function (error) {
      console.log(`error on delete song ${id}:`, error);
      res.sendStatus(500);
    });
}); // END router.DELETE



router.post('/add', (request, response) => {
  const song = request.body;
  console.log('Add song:', song);

  const sqlText = `INSERT INTO songs 
      (artist, track, published, rank)
      VALUES ($1, $2, $3, $4)`;
  pool.query(sqlText, 
      [song.artist, song.track, song.published, song.rank])
    .then( (result) => {
      console.log('Added song:', result);
      response.sendStatus(201);
    })
    .catch( (error) => {
      console.log('Error adding song:', error);
      response.sendStatus(500);
    })
})

module.exports = router;