var socket = io();

$('.dropdown').dropdown();


$(function() {
  socket.on('browser reload', function (data) {
    document.location.reload(true);
  });
});
