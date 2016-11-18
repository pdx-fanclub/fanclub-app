const handleGetPlaylists = function() {
  $('#get-playlists-button').on('click', event => {
    event.preventDefault();
    $.ajax({
      url: '/api/sync-spotify/get-curr-user-playlists',
      success: successHandler,
      error: err => console.log(err)
    });

    function successHandler(data) {
      data.forEach(playlist => {
        $('#all-user-playlists').append($('<li></li>').text(playlist.name).attr('data-id', playlist.id).attr('data-user', playlist.owner.id).addClass('selectable'));
      });
      selectUserPlaylist();
    }
  });
};

const selectUserPlaylist = function() {
  $('#all-user-playlists .selectable').on('click', event => {
    event.preventDefault();
    $('#all-user-playlists .selected').removeClass('selected');
    var $target = $(event.target);
    $target.addClass('selected');
  });
};

const handleUploadPlaylists = function() {
  $('#upload-playlist-button').on('click', event => { // eslint-disable-line
    const playlist = {};
    event.preventDefault();
    if($('#all-user-playlists .selected').length === 1) { // eslint-disable-line
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
