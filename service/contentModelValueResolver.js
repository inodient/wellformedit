const pool = mysql.createPool( require(require("path").join(process.cwd(), "properties", "db.json") ));

const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
const oQueryManager = new queryManager();

const contentModelValueFunction = require( require("path").join(process.cwd(), "service", "contentModelValueFunction.js") ).contentModelValueFunction;
const oContentModelValueFunction = new contentModelValueFunction();

const contentModelValueGenerator = require( require("path").join(process.cwd(), "service", "contentModelValueGenerator.js") ).contentModelValueGenerator;
const oContentModelValueGenerator = new contentModelValueGenerator();

exports.contentModelValueResolver = function(){
  this.getDefaultModelValue = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      oQueryManager.getDefaultModelValue( connection, contentId )
      .then( getDefaultModelValueData.bind(null, connection, contentId) )
      .then( getDefaultModelValueCode )
      .then( function( results ){
        resolve( results );
      } );
    } );
  }

  function getDefaultModelValueData( connection, contentId, modelValues ){
    console.log( ">>> getDefaultModelValueData : " );

    return new Promise( function(resolve, reject){
      var promises = [];

      if( modelValues != undefined ){
        for( var i=0; i<modelValues.length; i++ ){
          if( oContentModelValueFunction.functionArray[ modelValues[i].name ] ){
            promises.push( oContentModelValueFunction.functionArray[ modelValues[i].name ](connection, contentId) );
          } else{
            promises.push( oContentModelValueFunction.functionArray[ "default" ](connection) );
          }
        }

        Promise.all( promises )
        .then( function(){
          var modelValueData = {};
          var argv = arguments[0];

          for( var i=0; i<modelValues.length; i++ ){
            modelValueData[ modelValues[i].name ] = argv[i];
          }

          resolve( modelValueData );
        } );
      } else{
        resolve( [] );
      }
    } );
  }

  function getDefaultModelValueCode( modelValueData ){
    console.log( ">>> getDefaultModelValueCode : " );

    return new Promise( function(resolve, reject){
      var promises = [];

      if( modelValueData != {} ){
        for( var name in modelValueData ){
          // console.log( "name : " );
          console.log( name );
          // console.log( oContentModelValueGenerator.functionArray[name] );

          if( oContentModelValueGenerator.functionArray[name] ){
            promises.push( oContentModelValueGenerator.functionArray[name](modelValueData[name]) );
          } else{
            promises.push( oContentModelValueGenerator.functionArray[ "default" ]() );
          }
        }

        Promise.all( promises )
        .then( function(){
          var modelValueCode = {};
          var argv = arguments[0];

          var index = 0;
          for( var name in modelValueData ){
            modelValueCode[ name ] = argv[index++];
          }

          resolve( modelValueCode );
        } );
      } else{
        resolve( `` );
      }
    } );
  }




  this.getSpecificModelValue = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      oQueryManager.getSpecificModelValue( connection, contentId )
      .then( getSpecificModelValueData.bind(null, connection, contentId) )
      .then( getSpecificModelValueCode )
      .then( function( results ){
        resolve( results );
      } );
    } );
  }

  function getSpecificModelValueData( connection, contentId, modelValues ){
    console.log( ">>> getSpecificModelValueData : " );

    const contentModelValueFunction = require( require("path").join(process.cwd(), "service", "contentModelValueFunction.js") ).contentModelValueFunction;
    const oContentModelValueFunction = new contentModelValueFunction();

    return new Promise( function(resolve, reject){
      var promises = [];

      if( modelValues != undefined ){
        for( var i=0; i<modelValues.length; i++ ){
          if( oContentModelValueFunction.functionArray[ modelValues[i].name ] ){
            promises.push( oContentModelValueFunction.functionArray[ modelValues[i].name ](connection, contentId) );
          } else{
            promises.push( oContentModelValueFunction.functionArray[ "default" ](connection) );
          }
        }

        Promise.all( promises )
        .then( function(){
          var modelValueData = {};
          var argv = arguments[0];

          for( var i=0; i<modelValues.length; i++ ){
            modelValueData[ modelValues[i].name ] = argv[i];
          }

          resolve( modelValueData );
        } );
      } else{
        resolve( {} );
      }
    } );
  }

  function getSpecificModelValueCode( modelValueData ){
    console.log( ">>> getDefaultModelValueCode : " );

    const contentModelValueGenerator = require( require("path").join(process.cwd(), "service", "contentModelValueGenerator.js") ).contentModelValueGenerator;
    const oContentModelValueGenerator = new contentModelValueGenerator();

    return new Promise( function(resolve, reject){
      var promises = [];

      if( modelValueData != {} ){
        for( var name in modelValueData ){
          promises.push( oContentModelValueGenerator.functionArray[name](modelValueData[name]) );
        }

        Promise.all( promises )
        .then( function(){
          var modelValueCode = {};
          var argv = arguments[0];

          var index = 0;
          for( var name in modelValueData ){
            modelValueCode[ name ] = argv[index++];
          }

          resolve( modelValueCode );
        } );
      } else{
        resolve( `` );
      }
    } );
  }




  this.getSpecificModelValueByTitle = function( connection, contentTitle ){
    return new Promise( function(resolve, reject){
      oQueryManager.getSpecificModelValueByTitle( connection, contentTitle )
      .then( getSpecificModelValueDataByTitle.bind(null, connection, contentTitle) )
      .then( getSpecificModelValueCode )
      .then( function( results ){
        resolve( results );
      } );
    } );
  }

  function getSpecificModelValueDataByTitle( connection, contentTitle, modelValues ){
    console.log( ">>> getSpecificModelValueData : " );

    const contentModelValueFunction = require( require("path").join(process.cwd(), "service", "contentModelValueFunction.js") ).contentModelValueFunction;
    const oContentModelValueFunction = new contentModelValueFunction();

    return new Promise( function(resolve, reject){
      var promises = [];

      if( modelValues != undefined ){
        for( var i=0; i<modelValues.length; i++ ){
          if( oContentModelValueFunction.functionArray[ modelValues[i].name ] ){
            promises.push( oContentModelValueFunction.functionArray[ modelValues[i].name ](connection, contentTitle) );
          } else{
            promises.push( oContentModelValueFunction.functionArray[ "default" ](connection) );
          }
        }

        Promise.all( promises )
        .then( function(){
          var modelValueData = {};
          var argv = arguments[0];

          for( var i=0; i<modelValues.length; i++ ){
            modelValueData[ modelValues[i].name ] = argv[i];
          }

          resolve( modelValueData );
        } );
      } else{
        resolve( {} );
      }
    } );
  }

  function getSpecificModelValueCode( modelValueData ){
    console.log( ">>> getDefaultModelValueCode : " );

    const contentModelValueGenerator = require( require("path").join(process.cwd(), "service", "contentModelValueGenerator.js") ).contentModelValueGenerator;
    const oContentModelValueGenerator = new contentModelValueGenerator();

    return new Promise( function(resolve, reject){
      var promises = [];

      if( modelValueData != {} ){
        for( var name in modelValueData ){
          promises.push( oContentModelValueGenerator.functionArray[name](modelValueData[name]) );
        }

        Promise.all( promises )
        .then( function(){
          var modelValueCode = {};
          var argv = arguments[0];

          var index = 0;
          for( var name in modelValueData ){
            modelValueCode[ name ] = argv[index++];
          }

          resolve( modelValueCode );
        } );
      } else{
        resolve( `` );
      }
    } );
  }
}
