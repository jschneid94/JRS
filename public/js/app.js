$(".dropdown-trigger").dropdown();

// Back to top button appears when scrolling down the page
if ($('#back-to-top').length) {
  var scrollTrigger = 200,
      backToTop = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
              $('#back-to-top').addClass('show');
          } else {
              $('#back-to-top').removeClass('show');
          }
      };
  backToTop();
  $(window).on('scroll', function () {
    backToTop();
  });
  $('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: 0
    }, 700);
  });
}

(function($){
  $(function(){

    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space  