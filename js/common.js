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
    let url = window.location.href.split("?")[0];
    url = url.split("#")[0];

    window.location = url;
  } );

} );

function getTempContentID(){
  return ( Math.random().toString() ).replace( "0.", "" );
}

function callAbout(){
  $("#modal_aboutus").modal();
}
