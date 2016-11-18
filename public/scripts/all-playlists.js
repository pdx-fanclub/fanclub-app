const renderAllPlaylists = function() {
  $.ajax({ // eslint-disable-line
    url: 'http://localhost:3000/api/playlists',
    success: successHandler,
    error: err => console.error(err)
  });

  function successHandler(data) {
    console.log(data);
    data.forEach(playlist => $('#all-playlists-list').append($('<li></li>').text(playlist.name).attr('data-id', playlist._id))); // eslint-disable-line
  }
};

renderAllPlaylists();
