// Logic Script
$(document).ready( function(){
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
