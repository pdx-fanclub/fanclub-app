const selectGroup = function() {
  $('.selectable').on('click', event => { // eslint-disable-line
    event.preventDefault();
    $('.selected').removeClass('selected'); // eslint-disable-line
    var $target = $(event.target); // eslint-disable-line
    $target.addClass('selected');
  });
};

const joinGroup = function() {
  $('#join-group-button').on('click', event => { // eslint-disable-line
    const group = {};
    event.preventDefault();

 $.ajax({ // eslint-disable-line
   url: '/api/groups', // localhost Removed
   success: successHandler,
   error: err => console.log(err)
 });

    function successHandler(data) {
      data.forEach(group => {
        $('#all-user-groups').append($('<li></li>').text(group.groupName).attr('data-id', group._id).addClass('selectable')); // eslint-disable-line
      });
      selectGroup();
    }


    if($('.selected').length === 1) { // eslint-disable-line
      const $selected = $('.selected')[0]; // eslint-disable-line
      group._id = $selected.getAttribute('data-id');
      $.ajax({ // eslint-disable-line
        type: 'PUT',
        url:'api/groups/' + group._id + '/users/' + localStorage.currUserId
      });
    } else {
      console.log('you must select a group to join');
    }
  });
};

joinGroup();

