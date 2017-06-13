// Logic Script
$(document).ready( function(){

  // Top Navbar Event
  $(".top-nav > li > a").on( "click", function(){
    //alert( $(this).html() + " : Level 1" );
  } );

  // Side Menu event
  $(".side-nav > li > a").on( "click", function(){
    //alert( $(this).html() + " : Level 2" );
  } );

  // Sub Side Menu event
  $(".sub-side-nav > li > a").on( "click", function(){
    //alert( $(this).html() + " : Level 3" );
  } );

  $(".doc-description").on( "click", function(){
    location.reload();
  } );
} );
