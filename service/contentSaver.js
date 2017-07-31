const pool = mysql.createPool( require(require("path").join(process.cwd(), "properties", "db.json" ) ) );

const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
const oQueryManager = new queryManager();

exports.contentSaver = function(){

  this.saveSearchWord = function( connection, searchWordObject ){
    return new Promise( function(resolve, reject){
      oQueryManager.insertSearchWords( connection, searchWordObject )
      .then( function(results){
        resolve( searchWordObject );
      } );
    } );
  }

  this.saveContent = function( connection, req, res ){
    return new Promise( function(resolve, reject){
      var content_id = req.body.content_id;

      if( content_id != "new_creation" ){
        console.log( ">>>>> ALREADY_EXISTED" );

        clearContent( connection, req )
        .then( setContent.bind(null, connection, req) )
        .then( function(results){
          resolve( results );
        } );
      } else{
        console.log( ">>>>> NEW_CREATION" );

        setContent( connection, req )
        .then( function(results){
          resolve( results );
        } );
      }
    } );
  }




  function clearContent( connection, req ){
    var content_id = req.body.content_id;

    return new Promise( function(resolve, reject){
      oQueryManager.clearLastImage(connection, content_id)
      .then( oQueryManager.clearLastModelValues.bind(null, connection, content_id) )
      .then( oQueryManager.clearLastKeyword.bind(null, connection, content_id) )
      .then( oQueryManager.clearLastSpecific.bind(null, connection, content_id) )
      .then( oQueryManager.clearLastSpecificTag.bind(null, connection, content_id) )
      .then( oQueryManager.clearLastContent.bind(null, connection, content_id) )
      .then( function(results){
        resolve(results);
      } )
      .catch( console.error );
    } );
  }

  function setContent( connection, req ){
    var category = req.body.category;
    category = category.replace( "id_category_", "" );
    var top_menu_id = req.body.top_menu_id;
    var content_id = req.body.content_id;
    var title = req.body.title
    title = title.replace( /'/gi, "&#39;" );
    var subtitle = req.body.subtitle;
    subtitle = subtitle.replace( /'/gi, "&#39;" );
    var summary = req.body.summary;
    summary = summary.replace( /'/gi, "&#39;" );
    summary = summary.replace( /\n/gi, "<br>" );
    var specifics = req.body.specifics;
    specifics = specifics.replace( /\'/gi, "&#39;" );
    specifics = specifics.replace( /\n/gi, "<br>" );
    var writer = req.body.writer;
    var keywords_id = req.body.keywords_id;
    var specifics_index = req.body.specifics_index;
    var specifics_tag = req.body.specifics_tags;
    var img_srcs = req.body.img_srcs;

    return new Promise( function(resolve, reject){
      oQueryManager.getContentID(connection)
      .then( oQueryManager.getContentSpecificID.bind(null, connection) )
      .then( oQueryManager.getContentSpecificModelValueId.bind(null, connection) )
      .then( oQueryManager.insertContent.bind(null, connection, category, top_menu_id, content_id, title, subtitle, summary, specifics, writer) )
      .then( oQueryManager.insertContentsKeywords.bind(null, connection, keywords_id) )
      .then( oQueryManager.insertContentSpecificsTag.bind(null, connection, specifics_tag) )
      .then( oQueryManager.insertContentSpecificsModelValue.bind(null, connection, specifics) )
      .then( oQueryManager.updateImageId.bind(null, connection, img_srcs) )
      .then( oQueryManager.updateImageInfo.bind(null, connection, specifics) )
      .then( function(results){
        resolve(results.content_id);
      } );
    } );
  }
}
