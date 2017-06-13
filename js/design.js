$(document).ready( function(){

  // .after height
  $(".after").css( "height", $(".base").outerHeight() + $(".navbar").outerHeight() );

  // .side-nav position
  $(".side-nav").css({top:0, position:"relative"});

  // when scroll, .side-nav position
  $(window).scroll( function( event ){
    // console.log( $(window).scrollTop() );
    if( $(window).scrollTop() > $("blockquote").outerHeight() + parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) ){
      $(".side-nav").css({top: parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) - parseInt( $("blockquote").css("padding-top").replace( "px", "" ) ), position:'fixed'});
      $(".side-nav").addClass( "affix" );
    } else{
      $(".side-nav").css({top:0, position:'relative'});
      $(".side-nav").removeClass( "affix" );
    }
  });

  // when side-nav menu click, toggle sub-side-nav
  $(".side-nav > li > a").on('click', function(event) {
    $(".side-nav > li > a.active").parent().find(".sub-side-nav > li > a.active").removeClass( "active" );
    $(".side-nav > li > a.active").parent().find(".sub-side-nav").css( "display", "none" );
    $(".side-nav > li > a.active").removeClass( "active" );

    $(this).addClass( "active" );
    $(this).parent().find( ".sub-side-nav" ).css( "display", "block" );
  });

  // when sub-side-nav menu click, toggle active class
  $(".sub-side-nav > li > a").on('click', function(event) {

    $(".sub-side-nav > li > a.active").removeClass( "active" );
    $(this).addClass( "active" );
  });


} );
