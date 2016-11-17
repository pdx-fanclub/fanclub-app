const handleAddGroup = function() {
  $('#addGroup-button').on('click', event => { // eslint-disable-line
    console.log('addGroup clicked');
    event.preventDefault();
    const newGroupInfo = {
      groupName: $('#groupName-input').val(), // eslint-disable-line
      description: $('#groupDescription-input').val() // eslint-disable-line
    };
    $.ajax({ // eslint-disable-line
      method: 'POST',
      url: 'http://localhost:3000/api/groups',
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

handleAddGroup();
