$(document).ready( function(){

  // .after height
  $(".after").css( "height", $(".base").outerHeight() + $(".navbar").outerHeight() );

  // .side-nav position
  $(".side-nav").css({top:0, position:"relative"});

  // when scroll, .side-nav position
  var side_nav_width = 0;
  var doc_discription_width = 0;
  doc_discription_width = $(".doc-description").css("width");

  if( $(window).scrollTop() > $("blockquote").outerHeight() + parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) ){
    $(".side-nav").css({top: parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) - parseInt( $("blockquote").css("padding-top").replace( "px", "" ) ), position:'fixed', width: doc_discription_width});
    $(".side-nav").addClass( "affix" );
  }

  $(window).scroll( function( event ){
    if( $(window).scrollTop() > $("blockquote").outerHeight() + parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) ){
      $(".side-nav").css({top: parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) - parseInt( $("blockquote").css("padding-top").replace( "px", "" ) ), position:'fixed', width: doc_discription_width});
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
    // $(this).parent().find( ".sub-side-nav > li > a:first" ).addClass( "active" );
  });

  // when sub-side-nav menu click, toggle active class
  $(".sub-side-nav > li > a").on('click', function(event) {
    if( $(this).parent().parent().parent().find("a").attr( "class" ) == undefined || ( $(this).parent().parent().parent().find("a").attr( "class" ) ).indexOf("active") < 0 ){
      $(".side-nav > li > a.active").parent().find(".sub-side-nav").css( "display", "none" );
      $(".side-nav > li > a.active").removeClass("active")
      $(this).parent().parent().parent().find("a").addClass("active");
    }

    $(".sub-side-nav > li > a.active").removeClass( "active" );
    $(this).addClass( "active" );
    $(this).parent().parent().css( "display", "block" );
  });

  // when side-nav menu hover, below ul has hovered class
  $(".side-nav > li").hover( function(event){
    $(this).children("ul").addClass("hovered");
  }, function(event){
    $(this).children("ul").removeClass("hovered");
  } );
} );
