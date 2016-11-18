(function(module) {

  var publicGroups = {};

  publicGroups.handleAddGroup = function() {
    $('#addGroup-button').on('click', event => { // eslint-disable-line
      console.log('addGroup clicked');
      event.preventDefault();
      const newGroupInfo = {
        groupName: $('#groupName-input').val(), // eslint-disable-line
        description: $('#groupDescription-input').val(), // eslint-disable-line
        memberId: ['localStorage.currUserId'] // eslint-disable-line
      };
      $.ajax({ // eslint-disable-line
        method: 'POST',
        url: '/api/groups',
        data: JSON.stringify(newGroupInfo),
        success: successHandler,
        error: errorHandler,
        contentType: 'application/json'
      });

      function successHandler(data) {
        console.log(data);
      }

      function errorHandler(err) {
        console.log('ERROR', err);
      }
    });
  };

  publicGroups.allGroups = [];

  publicGroups.displayAll = function() {
    $('#displayGroups-button').on('click', event => { // eslint-disable-line
      console.log('displayGroups clicked');
      event.preventDefault();
      $.ajax({ // eslint-disable-line
        method: 'GET',
        url: '/api/groups',
        data: JSON.stringify,
        success: successHandler,
        error: errorHandler,
        contentType: 'application/json'
      });

      function successHandler(data) {
        publicGroups.allGroups = [data];
        console.log(data);
        publicGroups.appendAll();
      }

      function errorHandler(err) {
        console.log('ERROR', err);
      }
    });
  };

  publicGroups.render = function(getGroups) {
    var template = Handlebars.compile($('#displayGroups-template').text()); // eslint-disable-line
    return template(getGroups);
  };

  publicGroups.appendAll = function() {
    // publicGroups.searchResultsQuery();
    publicGroups.allGroups[0].forEach(function(group) {
      $('#all-groups-container ul').append(publicGroups.render(group)); // eslint-disable-line
    });
  };



  publicGroups.handleAddGroup();

  publicGroups.displayAll();


  module.publicGroups = publicGroups;

})(window); // eslint-disable-line
