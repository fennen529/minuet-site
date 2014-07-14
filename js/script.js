$(document).ready(function() {

	var $tracks = $('audio')
		, currentTrackIndex = 0
		, lastTrackIndex = $tracks.length - 1;
	
	var playAudio = function() {
		$('audio')[currentTrackIndex].play();
		flipButton();
		
		  clearInterval(window.timer);
		
		  var currentTrack = $tracks[currentTrackIndex];
		
		   window.timer = setInterval(function() {
		   $('.dial').trigger('configure', { 'max': currentTrack.duration });
		   	$('.dial').val(currentTrack.currentTime).trigger('change');  
		  }, 1000);
		  
	}
	
	var pauseAudio = function() {
		$('audio')[currentTrackIndex].pause();
		flipButton();
	}
	
	$tracks.each(function() {
		$(this).on('ended', function() { playNextTrack(); });
	});
	
	function flipButton() {
		$('.play').toggleClass("flip");
		$('.pause').toggleClass("flip");
	}
	
	function changeTrack(index) {
		$tracks.each(function() {
		  this.pause();
		  this.currentTime = 0;
		});
		
		$('.circles a').removeClass('active-circle');
		$('section[class^="background-"]').removeClass('active-slide');
		$('.circles a').eq(index).addClass('active-circle');
		$('section[class^="background-"]').eq(index).addClass('active-slide');
		
		$('.controlls span').text($tracks.eq(index).attr('title'));
		
		playAudio();
		
		

	}
	
	function playNextTrack() {
		if (currentTrackIndex == lastTrackIndex) {
	  	currentTrackIndex = 0;
		} else {
	  	currentTrackIndex++;
		}
	
		changeTrack(currentTrackIndex);
		flipButton();
	}
	
	function playPreviousTrack() {
		if (currentTrackIndex == 0) {
	  	currentTrackIndex = lastTrackIndex;
		} else {
	 		currentTrackIndex--;
		}
	
		changeTrack(currentTrackIndex);
		flipButton();
	}
	  
 $( ".titling" ).mouseenter(function() {
 		$(this).fadeOut(200, function() {
	 		$('.controlls div').fadeIn(400);	 		
 		});
 });
  
 $( ".controlls div" ).mouseleave(function() {
 		$(this).fadeOut(200, function () {
 			$('.titling').fadeIn(400);
 		});
 		
 });
 
$(function() {
    $(".dial").knob();
});
	 
	playAudio();
	
     
	$('.connecting ul').hover(function () {
		console.log('in');
		$(this).find('.sharing + li').css({width: 160})
	}, function () {
		$(this).find('.sharing + li').css({width: 0})
	});
	
	$('.connecting ul').hover(function () {
		console.log('in');
		$(this).find('.bandcamp + li').css({width: 130})
	}, function () {
		$(this).find('.bandcamp + li').css({width: 0})
	});
	
	$(document).on('click', '.play', function (e) {
		e.preventDefault();
		playAudio();
	});
	
	$(document).on('click', '.pause', function (e) {
		e.preventDefault();
		pauseAudio();
	});
	
	$(document).on('click', '.back', function(e) {
		e.preventDefault();
		playPreviousTrack();
	});
	
	$(document).on('click', '.next', function(e) {
		e.preventDefault();
		playNextTrack();
	});
	
	$(document).on('click', '.circles a', function (e) {
		currentTrackIndex = $('.circles a').index($(this))
		changeTrack(currentTrackIndex);
	});
	
	
    
});




      