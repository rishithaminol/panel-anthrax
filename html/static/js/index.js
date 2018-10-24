var socket = io();

$('.dropdown').dropdown();


$(function() {
  socket.on('browser reload', function (data) {
    document.location.reload(true);
  });

  $(".close.icon", "#notification").click(function(){
    $("#notification").fadeOut("slow");
  });

  $("#notification").delay(1000).slideDown("slow").delay(3000).slideUp("slow");
});
