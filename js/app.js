$(function(){
  new Slider('.header-slider-item', {
    navNext: '.header-slider-nav.right',
    navPrev: '.header-slider-nav.left'
  });
  new Slider('.faces .section-item-slide');
  new Slider('.vehicles .section-item-slide');
  new Slider('.equipment .section-item-slide');



  // lightbox
  var activityIndicatorOn = function(){
    $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
  }
  var activityIndicatorOff = function(){
    $( '#imagelightbox-loading' ).remove();
  }
  var overlayOn = function(){
    $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
  }
  var overlayOff = function(){
    $( '#imagelightbox-overlay' ).remove();
  }
  var closeButtonOn = function( instance ){
    $( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
  }
  var closeButtonOff = function(){
    $( '#imagelightbox-close' ).remove();
  }
  var arrowsOn = function( instance, selector ) {
    var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );

    $arrows.appendTo( 'body' );

    $arrows.on( 'click touchend', function( e )
    {
      e.preventDefault();

      var $this = $( this ),
        $target = $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
        index = instance.index( $target );

      if( $this.hasClass( 'imagelightbox-arrow-left' ) )
      {
        index = index - 1;
        if( !instance.eq( index ).length )
          index = instance.length;
      }
      else
      {
        index = index + 1;
        if( !instance.eq( index ).length )
          index = 0;
      }

      instance.switchImageLightbox( index );
      return false;
    });
  }
  var arrowsOff = function(){
    $( '.imagelightbox-arrow' ).remove();
  };

  var instanceG = $('a[data-lightbox="staff"]').imageLightbox({
    onStart:    function(){ overlayOn(); arrowsOn( instanceG, 'a' ); },
    onEnd:      function(){ overlayOff(); arrowsOff(); activityIndicatorOff(); },
    onLoadStart:  function(){ activityIndicatorOn(); },
    onLoadEnd:    function(){ $( '.imagelightbox-arrow' ).css( 'display', 'block' ); activityIndicatorOff(); }
  });
  

  // order form validation
  $('#order-form').submit(function(form){
    var hasError = false;
    for (var i = 0, field; field = this.elements[i]; i++)
    {
      if ($(field).attr('data-required'))
      {
        var isEmpty = !$(field).val();
        $(field).toggleClass('invalid', isEmpty);
        
        if (isEmpty)
          hasError = true;
      }
    }

    if (hasError)
    {
      $(this).find('.error').show();  
      return false;
    }
    else
      $(this).submit();
  });

  $('.order-retry-button').click(function(event){
    $('.section-order').removeClass('failure');
    event.preventDefault();
  });

  // smooth scroll to order form 
  function scrollToOrderForm(event){
    $.smoothScroll({
      scrollTarget: '#order'
    });
    event.preventDefault();
  }

  $('a[href="#order"]').click(scrollToOrderForm);


  // share

  $('.social-button').click(function(){
    open($(this).attr('href') + location.href,"displayWindow","width=520,height=300,left=350,top=170,status=no,toolbar=no,menubar=no");
    return false;
  })
});