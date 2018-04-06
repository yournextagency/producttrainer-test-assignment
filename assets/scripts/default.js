var $breakpoint = 959;
var $headerHeight = 71;
var prevW = -1;
var prevH = -1;
function resizeDirection() {
    if ($(window).width() != prevW) {
        updateWindowSize()
        return true;
    }
    if ($(window).height() != prevH) {
        updateWindowSize()
        return false;
    }
}
function updateWindowSize() {
    prevW = $(window).width();
    prevH = $(window).height();
}
function wMatch(bpoint, min) {
    if (typeof min === "undefined" || min === null) {
        min = false;
    }
    if(min) {
        if (window.matchMedia('(min-width:'+Number(bpoint+1)+'px)').matches) {
          return true;
        }
    } else {
        if (window.matchMedia('(max-width:'+bpoint+'px)').matches) {
          return true;
        }
    }
    return false;
}

$.fn.removeClassRegex = function(regex) {
  return $(this).removeClass(function(index, classes) {
    return classes.split(/\s+/).filter(function(c) {
      return regex.test(c);
    }).join(' ');
  });
};

$(function () {
  var $header = $('header');

  var posterURL = $('.video-wrap').attr('data-poster');

  $('.video-wrap').append('<div class="poster-holder" style="background-image: url('+posterURL+');"></div>');

  $('.poster-holder').closest('.plyr').on('click', function(){
    console.log('clicked');
    $(this).find('.poster-holder').hide();
  });

  var tabCur = 0;
  var tabCount = $('.tab-link').length;
  var tabInterval = 5000;
  var loopTabsInterval = setInterval(loopTabs, tabInterval);

  $('.tab-link').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    var target = $this.attr('href');
    var parent = $this.closest('.tabs');
    var tabs = parent.find('.content');
    var links = $this.siblings('.tab-link');

    tabs.removeClass('active');
    links.removeClass('active');
    tabs.filter('[data-tab="'+target+'"]').addClass('active');
    $this.addClass('active');
    tabInterval = 7000;
    tabCur = $this.index();
    clearInterval(loopTabsInterval);
    loopTabsInterval = setInterval(loopTabs, tabInterval);
  });

  function loopTabs() {
    $('.tab-link').removeClass('active');
    $('[data-tab]').removeClass('active');
    tabCur = (tabCur + 1) % tabCount;
    $('[data-tab]').eq(tabCur).addClass('active');
    $('.tab-link').eq(tabCur).addClass('active');
    tabInterval = 5000;
  }
  var smButtonTitle = $('#mod-references .btn-wrap .btn').html();
  $('#mod-references .btn-wrap .btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var parentModule = $this.closest('#mod-references');
    var slider = parentModule.find('.slider');
    var slides = slider.find('.slide');
    var oppositeTitle = $this.attr('data-opposite-title');

    if(!$this.is('.open')) {
      slides.not(':visible').addClass('show');
      $this.html(oppositeTitle);
      $this.addClass('open');
    } else {
      slides.filter('.show').removeClass('show');
      $this.html(smButtonTitle);
      $this.removeClass('open');
    }
  });

  $('.menu-toggler').on('click', function(e){
    e.preventDefault();
    if($header.is('.menu-open')) {
      $header.removeClass('menu-open');
      $header.find('nav').fadeOut();
    } else {
      $header.addClass('menu-open');
      $header.find('nav').fadeIn();
    }
  });

  $('[data-scroll]').on('click', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    if(wMatch($breakpoint, true)) {
      $('body,html').animate({scrollTop: $(target).offset().top - ($headerHeight - 1)}, 500);
    } else {
      $('body,html').scrollTop($(target).offset().top - ($headerHeight - 1));
      $header.removeClass('menu-open');
      $header.find('nav').fadeOut();
    }
  });

  function headerSticky() {
      if($(window).scrollTop() > 0) {
        $header.addClass('sticky');
      } else {
        $header.removeClass('sticky');
      }
  }

  function headerColors() {
      $('[data-header]').each(function(i){
        var $this = $(this);
        var hClass = $this.attr('data-header');
        var st = $(window).scrollTop();
        var next = $('[data-header]').eq(i+1);
        if($this.offset().top < (st + $headerHeight) && ($this.offset().top + $this.outerHeight()) > (st + $headerHeight)) {
          if($header.is('.sticky')) {
            $header.removeClassRegex(/^header-/)
            $header.addClass('header-'+hClass);
          } else {
            $header.removeClassRegex(/^header-/)
          }
        }
      });
  }

  headerSticky();
  headerColors();

  $(window).on('scroll', function(){
    headerSticky();
    headerColors();
    lastSt = $(this).scrollTop();
  });

  $('.slider').slick({
    slide: ".slide",
    infinite: true,
    arrows: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.arrow-prev'),
    nextArrow: $('.arrow-next'),
    responsive: [{
          breakpoint: $breakpoint,
          settings: 'unslick'
      }]
   });


  function sliderInit() {
    if (wMatch($breakpoint)) {
      $('.slider').slick('unslick');
    }
  }
  function sliderReinit() {
    sliderInit();
    if (wMatch($breakpoint, true)) {
      $('.slider').slick('reinit');
    }
  }
  sliderInit();

  $(window).on('resize', function(){
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(function () {
    if (resizeDirection()) {
      sliderReinit();
    }
  }, 150);
});

});
