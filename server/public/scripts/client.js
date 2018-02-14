$(document).ready(onReady);

function onReady(){
  console.log('Hello');

  addSong({
    artist: 'John Rule', 
    track: 'Always on Time', 
    published: '1/1/1999', 
    rank: 2
  });

  function addSong(song) {
    $.ajax({
      type: 'POST',
      url: '/songs/add',
      data: song
    })
    .done(function(response){
      $('#out-songs').text(response);
    })
    .fail(function(error){
      console.log(error);
    });
  }

  function updateSongRank(id, newRank){
    $.ajax({
      type: 'PUT',
      url: `songs/${id}`,
      data: {rank: newRank}
    }).done((response) =>{
      console.log('Updated song rank');
      
    }).fail((error) => {
      console.log('error on updateSongRank:', error);
      
    })
  } //END updateSongRank()


  function deleteSong(id) {
    $.ajax({
      type: 'DELETE',
      url: `/songs/${id}`,
    }).done((response) => {
      console.log('deleted song');
    }).fail((error) => {
      console.log('error: ', error);
    });
  } // END deleteSong()

} // END onReady()



