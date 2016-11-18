const handleGetPlaylists = function() {
  $('#get-playlists-button').on('click', event => {
    event.preventDefault();
    $.ajax({
      url: '/api/sync-spotify/get-curr-user-playlists', // localhost Removed
      success: successHandler,
      error: err => console.log(err)
    });

    function successHandler(data) {
      data.forEach(playlist => {
        $('#all-user-playlists').append($('<li></li>').text(playlist.name).attr('data-id', playlist.id).attr('data-user', playlist.owner.id).addClass('selectable'));
      });
      selectPlaylist();
    }
  });
};

const selectPlaylist = function() {
  $('.selectable').on('click', event => {
    event.preventDefault();
    $('.selected').removeClass('selected');
    var $target = $(event.target);
    $target.addClass('selected');
  });
};

const handleUploadPlaylists = function() {
  $('#upload-playlist-button').on('click', event => {
    const playlist = {};
    event.preventDefault();
    if($('.selected').length === 1) {
      const $selected = $('.selected')[0];
      playlist.id = $selected.getAttribute('data-id');
      playlist.userId = $selected.getAttribute('data-user');
      $.ajax({
        type: 'POST',
        url: `api/sync-spotify/post-playlist/${playlist.id}/${playlist.userId}`, // localhost Removed
        success: successHandler,
        error: err => console.log(err)
      });
    } else {
      console.log('you must select a playlist to upload');
    }
    function successHandler(data) {
      $.ajax({
        url: `api/sync-spotify/get-playlist-tracks/${data._id}`, // localhost Removed
        success: data => console.log(data),
        errror: err => console.log(err)
      });
    }
  });
};

handleGetPlaylists();
handleUploadPlaylists();
