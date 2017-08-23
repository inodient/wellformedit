const pool = mysql.createPool( require(require("path").join(process.cwd(), "properties", "db.json") ) );

exports.control_get = function( req, res ){
  // setModel( req, res );
}

exports.control = function( req, res ){
  var model = {};

  return new Promise( function(resolve, reject){
    let file = new fileHandler();

    file.uploadFile( req, "upload" )
    .then( makeThumbnailMaintainRatio )
    .then( makeThumbnailRectangle )
    .then( getContentImageID )
    .then( insertTempFileInfo )
    .then( insertImageFileInfo )
    .then( function(results){

      delete results.destDir;
      delete results.fieldname;
      delete results.file;
      delete results.encoding;
      delete results.mimetype;
      delete results.content_image_id;

      results.title = "";
      results.subtitle = "";
      results.description = "";

      setModel( model, results );
      resolve( model );
    } );
  } );
}

exports.control_download = function( req, res ){
  let file = new fileHandler();

  let model = file.downloadFile( req, res );

  return model;
}




function makeThumbnailRectangle( fileInfo ){
  return new Promise( function(resolve, reject){
    var Thumbnail = require("thumbnail");
    var thumbnail = new Thumbnail( require("path").join(process.cwd(), 'upload' ), require("path").join(process.cwd(), 'upload', 'thumbnailRectangle') );

    var fs = require("fs"), gm = require("gm").subClass({imageMagick:true});

    gm(require("path").join(process.cwd(), 'upload', fileInfo.savedFileName ))
    .size(function (err, size) {
      if (!err){
        thumbnail.ensureThumbnail( fileInfo.savedFileName, 450, 450, function( err, filename){
          fileInfo.thumbnailRectangleFileName = filename;
          console.log( ">>> thumbnail created : " + fileInfo.thumbnailRectangleFileName );

          resolve( fileInfo );

          if( err ) console.log( err );
        } );
      }
    });
  } );
}

function makeThumbnailMaintainRatio( fileInfo ){
  return new Promise( function(resolve, reject){

    var Thumbnail = require("thumbnail");
    var thumbnail = new Thumbnail( require("path").join(process.cwd(), 'upload' ), require("path").join(process.cwd(), 'upload', 'thumbnailWithRatio') );

    // console.log( thumbnail.supportedImageTypes );
    // console.log( thumbnail.rootOriginals );
    // console.log( thumbnail.rootThumbnails );

    // thumbnail.ensureThumbnail( fileInfo.savedFileName, 450, 450, function( err, filename){
    //   fileInfo.thumbnailFileName = filename;
    //   if( err ) console.log( err );
    // } );

    var fs = require("fs"), gm = require("gm").subClass({imageMagick:true});

    gm(require("path").join(process.cwd(), 'upload', fileInfo.savedFileName ))
    .size(function (err, size) {
      if (!err){
        console.log( ">>> saved filename : " + fileInfo.savedFileName );

        let ratio = size.width / size.height;
        fileInfo.ratio = ratio;

        if( size.width > size.height ){
          thumbnail.ensureThumbnail( fileInfo.savedFileName, 450, null, function( err, filename){
            fileInfo.thumbnailWithRatioFileName = filename;
            console.log( ">>> thumbnail created : " + fileInfo.thumbnailWithRatioFileName );

            resolve( fileInfo );

            if( err ) console.log( err );
          } );
        } else{
          thumbnail.ensureThumbnail( fileInfo.savedFileName, null, 450, function( err, filename){
            fileInfo.thumbnailWithRatioFileName = filename;
            console.log( ">>> thumbnail created : " + fileInfo.thumbnailWithRatioFileName );

            resolve( fileInfo );

            if( err ) console.log( err );
          } );
        }

      }
    });
  } );
}

function getContentImageID( fileInfo ){
  return new Promise( function(resolve, reject){
    var queryString = `select CASE WHEN max(id) is null THEN 'id_content_image_0000' ELSE max(id) END AS MAXID from wellformedit.TB_CONTENT_IMAGE;`;

    pool.query( queryString, function(err, results, fields){
      fileInfo.content_image_id = results[0].MAXID;
      resolve( fileInfo );
    } );
  } );
}

function insertTempFileInfo( fileInfo ){
  return new Promise( function(resolve, reject){

    var currentTime = new Date();
    currentTime = currentTime.toISOString();
    currentTime = currentTime.substring( 0, 10 );

    var tempContentID = "id_content_0000";
    var contentImageID = fileInfo.content_image_id;
    contentImageID = contentImageID.replace( "id_content_image_", "" );

    var maxSequence = parseInt( contentImageID ) + 1;

    var maxSequenceString = maxSequence.toString();
    if( maxSequenceString.length == 4 ){
    } else if( maxSequenceString.length == 3 ){
      maxSequenceString = "0" + maxSequenceString;
    } else if( maxSequenceString.length == 2 ){
      maxSequenceString = "00" + maxSequenceString;
    } else if( maxSequenceString.length == 1 ){
      maxSequenceString = "000" + maxSequenceString;
    }

    maxID = "id_content_image_" + maxSequenceString;

    var queryString = `insert into wellformedit.TB_CONTENT_IMAGE (id, content_id, savedDate, originalFileName, savedFileName, ratio, savedPath, encoding, mimeType, hitCount)
                        values ( '` + maxID + `', '` + tempContentID + `', '` + currentTime + `', '` + "originalFileName" + `', '` + "savedFileName" +  `', 0, '` + "savedPath" + `', '` + "encoding" +  `', '` + "mimeType" + `', 0);`

    fileInfo.tempImageID = maxID;

    pool.query( queryString, function(err, results, fields){
      resolve( fileInfo );
    } );
  } );
}

function insertImageFileInfo( fileInfo ){
  return new Promise( function(resolve, reject){

    var currentTime = new Date();
    currentTime = currentTime.toISOString();
    currentTime = currentTime.substring( 0, 10 );

    var tempContentID = "id_content_0000";
    maxID = fileInfo.tempImageID;

    // var queryString = `insert into wellformedit.TB_CONTENT_IMAGE (id, content_id, savedDate, originalFileName, savedFileName, savedPath, encoding, mimeType)
    //                     values ( '` + maxID + `', '` + tempContentID + `', '` + currentTime + `', '` + fileInfo.originalFileName + `', '` + fileInfo.savedFileName +  `', '` + fileInfo.destDir + `', '` + fileInfo.encoding +  `', '` + fileInfo.mimetype + `');`

    var queryString = `
      update wellformedit.TB_CONTENT_IMAGE
      set content_id = '` + tempContentID + `',
          savedDate = '` + currentTime.toString() + `',
          originalFileName = '` + fileInfo.originalFileName + `',
          savedFileName = '` + fileInfo.savedFileName + `',
          thumbnailWithRatioFileName = '` + fileInfo.thumbnailWithRatioFileName + `',
          thumbnailRectangleFileName = '` + fileInfo.thumbnailRectangleFileName + `',
          ratio = ` + fileInfo.ratio + `,
          savedPath = '` + fileInfo.destDir + `',
          encoding = '` + fileInfo.encoding + `',
          mimetype = '` + fileInfo.mimetype + `'
      where id = '` + maxID + `';
    `;

    pool.query( queryString, function(err, results, fields){
      resolve( fileInfo );
    } );
  } );
}




function setModel( model, results ){
  return new Promise( function(resolve, reject){
    try{
      for( var name in results ){
        model[ name ] = results[ name ];
      }
    } catch( err ){
      throw err;
    }
  } );
}
