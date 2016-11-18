(function(module) {

  var publicUsers = {};

  // publicGroups.handleAddGroup = function() {
  //   $('#addGroup-button').on('click', event => { // eslint-disable-line
  //     console.log('addGroup clicked');
  //     event.preventDefault();
  //     const newGroupInfo = {
  //       groupName: $('#groupName-input').val(), // eslint-disable-line
  //       description: $('#groupDescription-input').val() // eslint-disable-line
  //     };
  //     $.ajax({ // eslint-disable-line
  //       method: 'POST',
  //       url: '/api/groups',
  //       data: JSON.stringify(newGroupInfo),
  //       success: successHandler,
  //       error: errorHandler,
  //       contentType: 'application/json'
  //     });
  //
  //     function successHandler(data) {
  //       console.log(data);
  //     }
  //
  //     function errorHandler(err) {
  //       console.log('ERROR', err);
  //     }
  //   });
  // };

  publicUsers.allUsers = [];

  publicUsers.displayAll = function() {
    $('#displayUsers-button').on('click', event => { // eslint-disable-line
      console.log('displayUsers clicked');
      event.preventDefault();
      $.ajax({ // eslint-disable-line
        method: 'GET',
        url: '/api/users',
        data: JSON.stringify,
        success: successHandler,
        error: errorHandler,
        contentType: 'application/json'
      });

      function successHandler(data) {
        publicUsers.allUsers = [data];
        console.log(data);
        publicUsers.appendAll();
      }

      function errorHandler(err) {
        console.log('ERROR', err);
      }
    });
  };

  publicUsers.render = function(getUsers) {
    var template = Handlebars.compile($('#displayUsers-template').text()); // eslint-disable-line
    return template(getUsers);
  };

  publicUsers.appendAll = function() {
    // publicUsers.searchResultsQuery();
    publicUsers.allUsers[0].forEach(function(group) {
      $('#all-users-container ul').append(publicUsers.render(group)); // eslint-disable-line
    });
  };


  publicUsers.displayAll();

  module.publicUsers = publicUsers;

})(window); // eslint-disable-line
