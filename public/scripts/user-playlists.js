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
  $('#upload-playlist-button').on('click', event => {
    const playlist = {};
    const storedPlaylist = {};
    event.preventDefault();
    if($('#all-user-playlists .selected').length === 1) {
      const $selected = $('.selected')[0];
      playlist.id = $selected.getAttribute('data-id');
      playlist.userId = $selected.getAttribute('data-user');
      $.ajax({
        type: 'POST',
        url: `api/sync-spotify/post-playlist/${playlist.id}/${playlist.userId}`,
        success: successHandler,
        error: err => console.log(err)
      });
    } else {
      console.log('you must select a playlist to upload');
    }
    function successHandler(data) {
      storedPlaylist.id = data._id;
      $.ajax({
        url: `api/sync-spotify/get-playlist-tracks/${data._id}`,
        success: successHandler,
        errror: err => console.log(err)
      });

      function successHandler(data) {
        const currUserId = localStorage.getItem('currUserId');
        console.log(`You have uploaded ${data.name}`);
        $.ajax({
          url: `api/users/${currUserId}`,
          success: updateUserPlaylists,
          error: err => console.log(err)
        });

        function updateUserPlaylists(data) {
          if(!data.playlists) {
            data.playlists = [storedPlaylist.id];
          } else {
            data.playlists.push(storedPlaylist.id);
          }
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
    }
  });
};

handleGetPlaylists();
handleUploadPlaylists();
