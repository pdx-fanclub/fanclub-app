const renderAllPlaylists = function() {

  $.ajax({
    url: '/api/playlists', // Localhost removed

    success: successHandler,
    error: err => console.error(err)
  });

  function successHandler(data) {
    console.log(data);
    data.forEach(playlist => $('#all-playlists-list').append($('<li></li>').text(playlist.name).attr('data-id', playlist._id))); // eslint-disable-line
  }
};

renderAllPlaylists();
