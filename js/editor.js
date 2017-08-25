$(document).ready( function(){
  // summernote initializer
  $('#specific_editor').summernote({
    height : 300,
    minHeight : 300,
    maxHeight : 300,

    callbacks : {
      onImageUpload: function(files, editor, welEditable) {
        for( var i=0; i<files.length; i++ ){
          sendFile( files[i], editor, welEditable, "specific_editor" );
        }
      }
    }
  });

  $('#specific_editor_full').summernote({
    height : window.innerHeight * 0.8,
    minHeight : null,
    maxHeight : null,

    callbacks : {
      onImageUpload: function(files, editor, welEditable) {
        for( var i=0; i<files.length; i++ ){
          sendFile( files[i], editor, welEditable, "specific_editor_full" );
        }
      }
    }
  });

  // dismiss modal
  $('#modal_editor').on('hidden.bs.modal', function () {
    $("#id_summernode_form-group .panel-body").html( $("#id_summernode_full_form-group .panel-body").html() );
  });

} );

var sendFile = function( file, editor, welEditable, editor_id ){
  data = new FormData();
  data.append( "file", file );

  $.ajax( {
    data: data,
    type: "POST",
    url: "/upload",
    cache: false,
    contentType: false,
    processData: false,
    success: function(){
      console.log( "sendFile Success" );

      $( "#" + editor_id).summernote( "insertImage", arguments[0].savedFileName, arguments[0].savedFileName );

      var results = arguments[0]
      var resultHTML = ``;

      resultHTML += `WI%-<br>`;
      for( var name in results ){
        resultHTML += `"` + name + `" : "` + results[ name ] + `", <br>`
      }
      resultHTML += `END`;
      resultHTML = resultHTML.replace( `, <br>END`, `<br>` );

      resultHTML += `%IW`

      var imageInfoNode = document.createElement( "p" );
      imageInfoNode.innerHTML = resultHTML;

      $( "#" + editor_id).summernote( "insertNode", imageInfoNode );
    }
  } );
}

var getSpecificIndex = function( content ){
  var parsedContent = $.parseHTML( content );
  var specificIndex = [];

  for( var i=0; i<parsedContent.length; i++ ){
    if( parsedContent[i].nodeName == "H3" || parsedContent[i].nodeName == "h3" ){
      if( ( parsedContent[i].innerText ).length > 0 ){
        specificIndex.push( parsedContent[i].innerText );
      }
    }
  }

  return specificIndex;
}

var getDividedSpecific = function( content ){
  var parsedContent = $.parseHTML( content );
  var dividedSpecific = [];

  if( parsedContent != null ){
    for( var i=0; i<parsedContent.length; i++ ){
      if( parsedContent[i].nodeName == "H3" || parsedContent[i].nodeName == "H4" || parsedContent[i].nodename == "H5" ){
        var id = ( parsedContent[i].id ).replace( );
        var className = ( parsedContent[i].className ).replace( /'/gi, "&#39;" );
        var nodeName = ( parsedContent[i].nodeName ).replace( /'/gi, "&#39;" );
        var innerHTML = ( parsedContent[i].innerHTML ).replace( /'/gi, "&#39;" );
        var innerText = ( parsedContent[i].innerText ).replace( /'/gi, "&#39;" );
        var outerHTML = ( parsedContent[i].outerHTML ).replace( /'/gi, "&#39;" );
        var outerText = ( parsedContent[i].outerText ).replace( /'/gi, "&#39;" );

        dividedSpecific.push( {"nodeId" : parsedContent[i].id, "class" : parsedContent[i].className, "nodeName" : parsedContent[i].nodeName, "innerHTML" : parsedContent[i].innerHTML, "innerText" : parsedContent[i].innerText, "outerHTML" : parsedContent[i].outerHTML, "outerText" : parsedContent[i].outerText } );
      }
    }
  }

  return dividedSpecific;
}

var getImageSrcs = function( content ){
  var parsedContent = $.parseHTML( content );
  var imgSrc = [];

  for( var i=0; i<parsedContent.length; i++ ){
    if( parsedContent[i].nodeName == "P" || parsedContent[i].nodeName == "p" ){
      var parsedImgInfo = $.parseHTML( parsedContent[i].innerHTML );

      for( var j=0; j<parsedImgInfo.length; j++ ){
        if( parsedImgInfo[j].nodeName == "img" || parsedImgInfo[j].nodeName == "IMG" ){
          var parsedImgName = parsedImgInfo[j].src;

          parsedImgName = parsedImgName.replace( document.location.protocol + "//" + document.location.hostname + ":" + document.location.port + "/", "" );

          imgSrc.push( parsedImgName );
        }
      }
    }
  }

  return imgSrc;
}

function expandEditor(){
  $("#id_summernode_full_form-group .panel-body").html( $("#id_summernode_form-group .panel-body").html() );
  $("#modal_editor").modal();
}
