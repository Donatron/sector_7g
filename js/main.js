var audio;

// Hide Pause button
$('#pause').hide();

initAudio($('#playlist li:first-child'));

function initAudio(element) {
  var song = element.attr('song');
  var title = element.text();
  var artist = element.attr('artist');

  // Create audio object
  audio = new Audio("media/" + song);

  $('.artist').text(artist);
  $('.title').text(title);

  $('#playlist li').removeClass('active');
  element.addClass('active');
}

// Play button
$('#play').click(function() {
  audio.play();
  $('#play').hide();
  $('#pause').show();
  showDuration();
});

// Pause button
$('#pause').click(function() {
  audio.pause();
  $('#pause').hide();
  $('#play').show();
});

// Stop button
$('#stop').click(function(){
  audio.pause();
  audio.currentTime = 0;
  $('#pause').hide();
  $('#play').show();
});

// Next button
$('#next').click(function(){
  audio.pause();
  var next = $('#playlist li.active').next();
  console.log(next);
  if (next.length == 0) {
    next = $('#playlist li:first-child');
  }
  initAudio(next);
  audio.play();
  showDuration();
  $('#play').hide();
  $('#pause').show();
});

// Next button
$('#prev').click(function(){
  audio.pause();
  var prev = $('#playlist li.active').prev();
  console.log(next);
  if (prev.length == 0) {
    prev = $('#playlist li:last-child');
  }
  initAudio(prev);
  audio.play();
  showDuration();
  $('#play').hide();
  $('#pause').show();
});

// Playlist song click
$('#playlist li').click(function() {
  audio.pause();
  initAudio($(this));
  $('#play').hide();
  $('#pause').show();
  showDuration();
  audio.play();
});

// Volume control
$('#volume').change(function() {
  audio.volume = parseFLoat($(this).value / 10);
});

// Time/Duration
function showDuration() {
  $(audio).bind('timeupdate', function() {
    // Get hours and minutes
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt(audio.currentTime / 60) % 60;

    if (s < 10) {
      s = '0'+ s;
    }

    $('#duration').html(m + ':' + s);
    var value = 0;
    if (audio.currentTime > 0) {
      value = Math.floor((100/audio.duration) * audio.currentTime);
    }
    $('#progress').css('width', value + '%');
  });
}

// Fix Navbar Toggler
$('.navbar-collapse ul li').click(function() {
  $('#navbarResponsive').removeClass('show');
});
