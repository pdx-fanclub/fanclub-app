const renderAllPlaylists = function() {
  $.ajax({
    url: '/api/playlists',
    success: successHandler,
    error: err => console.error(err)
  });

  function successHandler(data) {
    data.forEach(playlist => $('#all-playlists-list').append($('<li></li>').text(playlist.name).attr('data-id', playlist._id).addClass('selectable')));
    selectAppPlaylist();
  }
};

const addPlaylistHandler = function() {
  $('#add-playlist-button').on('click', event => {
    event.preventDefault();
    const $selected = $('#all-playlists-list .selected');
    const playlistId = $selected[0].getAttribute('data-id');
    const playlistName = $selected.text();

    if($selected.length === 1) {
      $.ajax({
        url: `/api/sync-spotify/create-playlist/${playlistId}`,
        success: successHandler,
        error: err => console.log(err)
      });
    }
    function successHandler() {
      console.log(`You have added ${playlistName} to your Spotify`);
      const currUserId = localStorage.getItem('currUserId');
      console.log(currUserId);
      $.ajax({
        url: `/api/users/${currUserId}`,
        success: successHandler,
        error: err => console.log(err)
      });

      function successHandler(data) {
        let playlists = [];
        if(!data.playlists) {
          playlists = [playlistId];
        } else {
          playlists = data.playlists.push(playlistId);
        }
        data.playlists = playlists
        $.ajax({
          type: 'PUT',
          url: `/api/users/${currUserId}`,
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: successHandler,
          error: err => console.log(err)
        });

        function successHandler(data) {
          console.log(data);
        }
      }
    }

  });
};

const selectAppPlaylist = function() {
  $('#all-playlists-list .selectable').on('click', event => {
    event.preventDefault();
    $('#all-playlists-list .selected').removeClass('selected');
    var $target = $(event.target);
    $target.addClass('selected');
  });
};


renderAllPlaylists();
addPlaylistHandler();
