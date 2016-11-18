const handleGetPlaylists = function() {
  $('#get-playlists-button').on('click', event => { // eslint-disable-line
    event.preventDefault();
    $.ajax({ // eslint-disable-line
      url: '/api/sync-spotify/get-curr-user-playlists', // localhost Removed
      success: successHandler,
      error: err => console.log(err)
    });

    function successHandler(data) {
      data.forEach(playlist => {
        $('#all-user-playlists').append($('<li></li>').text(playlist.name).attr('data-id', playlist.id).attr('data-user', playlist.owner.id).addClass('selectable')); // eslint-disable-line
      });
      selectPlaylist();
    }
  });
};

const selectPlaylist = function() {
  $('.selectable').on('click', event => { // eslint-disable-line
    event.preventDefault();
    $('.selected').removeClass('selected'); // eslint-disable-line
    var $target = $(event.target); // eslint-disable-line
    $target.addClass('selected');
  });
};

const handleUploadPlaylists = function() {
  $('#upload-playlist-button').on('click', event => { // eslint-disable-line
    const playlist = {};
    event.preventDefault();
    if($('.selected').length === 1) { // eslint-disable-line
      const $selected = $('.selected')[0]; // eslint-disable-line
      playlist.id = $selected.getAttribute('data-id');
      playlist.userId = $selected.getAttribute('data-user');
      $.ajax({ // eslint-disable-line
        type: 'POST',
        url: `api/sync-spotify/post-playlist/${playlist.id}/${playlist.userId}`, // localhost Removed
        success: successHandler,
        error: err => console.log(err)
      });
    } else {
      console.log('you must select a playlist to upload');
    }
    function successHandler(data) {
      $.ajax({ // eslint-disable-line
        url: `api/sync-spotify/get-playlist-tracks/${data._id}`, // localhost Removed
        success: data => console.log(data),
        errror: err => console.log(err)
      });
    }
  });
};

handleGetPlaylists();
handleUploadPlaylists();
