exports.queryManager = function(){
  // pool.on('acquire', function (connection) {
  //   console.log('Connection %d acquired', connection.threadId);
  // });
  //
  // pool.on('connection', function (connection) {
  //   connection.query('SET SESSION auto_increment_increment=1')
  // });
  //
  // pool.on('enqueue', function () {
  //   console.log('Waiting for available connection slot');
  // });
  //
  // pool.on('release', function (connection) {
  //   console.log('Connection %d released', connection.threadId);
  // });

  this.getDependencyInfo = function( connection ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select execution, type, name, version, url, license from wellformedit.TB_DEPENDENCY order by id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getReleaseHistory = function( connection ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select version, changes, date, committer from wellformedit.TB_HISTORY order by date desc;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getPopularSearchWord = function( connection ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select word from wellformedit.TB_SEARCHWORD where type = 'normal' order by hitlevel desc limit 1;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getContentList = function( connection ){
    return new Promise( function(resolve, reject){
      let queryString = "select id, type, title from wellformedit.TB_CONTENT";

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getTopMenuList = function( connection ){
    return new Promise( function(resolve, reject){
      let queryString = `select id, level, sequence, name, displayName from wellformedit.TB_MENU where parent = 'root' order by level, sequence;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getSavedContent = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `select id, title, subtitle, summary, specifics, parentMenu, type from wellformedit.TB_CONTENT where id = '` + contentId + `'`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getSavedKeywords = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `select A.keyword_id, B.name, B.displayName from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_KEYWORD B where A.content_id = '` + contentId + `' and A.keyword_id = B.id;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getDefaultContent = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = "";

      queryString = `select * from wellformedit.TB_CONTENT where type = 'main' and parentMenu = (select id from wellformedit.TB_MENU where redirectPath = '` + contentId + `');`;

      connection.query( queryString, function(err, results, fields){
        resolve( results[0] );
        if( err ) console.err;
      } );
    } );
  }

  this.getSpecificContent = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = "";
      queryString = `select * from wellformedit.TB_CONTENT where id = '` + contentId + `';`;

      connection.query( queryString, function(err, results, fields){
        resolve( results[0] );
        if( err ) reject( err );
      } );
    } );
  }

  this.updateDirectContentHitCount = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = "";
      queryString = `Update wellformedit.TB_CONTENT set hitCount = hitCount + 1 where id = '` + contentId + `';`;

      connection.query( queryString, function(err, results, fields){
        console.log( queryString );

        resolve( results[0] );
        if( err ) reject( err );
      } );
    } );
  }

  this.getDefaultModelValue = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select id, content_id, sequence, name from wellformedit.TB_CONTENT_SPECIFIC_MODELVALUE where content_id = ( select id from wellformedit.TB_CONTENT where type = 'main' and parentMenu = (select id from wellformedit.TB_MENU where redirectPath = '` + contentId + `') );
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getSpecificModelValue = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select id, content_id, sequence, name from wellformedit.TB_CONTENT_SPECIFIC_MODELVALUE where content_id = '` + contentId + `';
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getMostRecentImgs = function( connection ){
    return new Promise( function(resolve, reject){
      // let queryString = `select A.savedFileName, A.thumbnailRectangleFileName, A.savedPath, B.title, B.subtitle, B.writer, A.savedDate from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B where A.content_id = B.id order by savedDate desc limit 3`;

      let queryString = `
        select
          A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
          B.id as content_id, B.title as content_title, B.summary as content_summary, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, C.redirectPath as topRedirect
        from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B, wellformedit.TB_MENU C
        where A.content_id = B.id and B.parentMenu = C.id
        order by savedDate desc limit 9;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getMostPopularImgs = function( connection ){
    return new Promise( function(resolve, reject){
      // let queryString = `select A.savedFileName, A.thumbnailRectangleFileName, A.savedPath, B.title, B.subtitle, B.writer, A.savedDate from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B where A.content_id = B.id order by A.hitCount desc limit 3`;

      let queryString = `
        select
          A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
          B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, C.redirectPath as topRedirect
        from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B, wellformedit.TB_MENU C
        where A.content_id = B.id and B.parentMenu = C.id
        order by A.hitCount desc limit 9;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }





  // menu - start
  this.getMenuList = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `select id, level, parent, sequence, name, displayName, redirectPath from wellformedit.TB_MENU where TB_MENU.usage = 'Y' and TB_MENU.level <= 0 and TB_MENU.display != 'N' group by level, parent, sequence;`;

      connection.query( queryString, function( err, results, fields ){
        console.log( "getMenuList" );

        resolve( results );
        if( err ) reject(err);
      } );
    } );
  }

  this.getSubMenuList = function( connection, path ){
    return new Promise( function(resolve, reject){
      var queryString = `select id, level, parent, sequence, name, displayName, redirectPath from wellformedit.TB_MENU where TB_MENU.usage = 'Y' and TB_MENU.parent = (select id from wellformedit.TB_MENU where redirectPath = '` + path + `') group by level, parent, sequence;`;

      connection.query( queryString, function(err, results, fields){
        console.log( "getSubMenuList" );

        resolve( results );
        if( err ) reject(err);
      } );
    } );
  }

  this.getSpecificMenuList = function( connection, path ){
    return new Promise( function(resolve, reject){
      var queryString = `
      select id, level, parent, sequence, name, displayName, redirectPath
        from wellformedit.TB_MENU
        where TB_MENU.usage = 'Y'
        and (
          TB_MENU.parent in (
            select id from wellformedit.TB_MENU where parent in (  select id from wellformedit.TB_MENU where redirectPath = '` + path + `')
          )
        )
        group by level, parent, sequence;`;

      connection.query( queryString, function(err, results, fields){
        console.log( "getSpecificMenuList" );

        resolve( results );
        if( err ) reject(err);
      } );
    } );
  }

  this.getDefaultSideMenuList = function( connection, path ){
    return new Promise( function(resolve, reject){
      let queryString = `
      select id, replace(lower(innerHTML), ' ', '') as name, sequence, nodeName, innerHTML as displayName, outerHTML, concat( '#', id, '_redirect' ) as redirectPath from wellformedit.TB_CONTENT_SPECIFIC_TAG
      where content_id in
      	(	select id from wellformedit.TB_CONTENT
      	 	where type = 'main' and parentMenu = (select id from wellformedit.TB_MENU where redirectPath = '` + path + `')
      	 )
      and (nodeName = 'H3' or nodeName = 'H4')
      order by sequence;`;

      connection.query( queryString, function(err, results, fields){
        console.log( "getDefaultSideMenuList" );

        resolve( results );
        if( err ) reject( err );
      } );
    } );
  }

  this.getDefaultContentImageInfo = function( connection, path ){
    return new Promise( function(resolve, reject){

      let queryString = `
        select
        id, content_id, title, subtitle, description, savedDate, originalFileName, savedFileName, thumbnailWithRatioFileName, thumbnailRectangleFileName, ratio, savedPath, encoding, mimetype, hitCount
        from wellformedit.TB_CONTENT_IMAGE
        where content_id = ( select id from wellformedit.TB_CONTENT where parentMenu = ( select id from wellformedit.TB_MENU where redirectPath = '/` + path.split("/")[1] + `') and type = 'main' )
      `;

      connection.query( queryString, function(err, results, fields){
        console.log( queryString );
        console.log( results );

        console.log( "getDefaultContentImageInfo" );

        resolve( results );
        if( err ) reject( err );
      } );
    } );
  }

  this.getSpecificSideMenuList = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `
      select id, replace(lower(innerHTML), ' ', '') as name, sequence, nodeName, innerHTML as displayName, outerHTML, concat( '#', id, '_redirect' ) as redirectPath from wellformedit.TB_CONTENT_SPECIFIC_TAG
      where content_id = '` + contentId +`'
      and (nodeName = 'H3' or nodeName = 'H4')
      order by sequence;
      `;

      if( contentId == undefined ){
        resolve( [] );
      } else{
        connection.query( queryString, function(err, results, fields){
          console.log( "getSpecificSideMenuList" );

          resolve( results );
          if( err ) reject( err );
        } );
      }
    } );
  }

  this.getSpecificContentImageInfo = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
        id, content_id, title, subtitle, description, savedDate, originalFileName, savedFileName, thumbnailWithRatioFileName, thumbnailRectangleFileName, ratio, savedPath, encoding, mimetype, hitCount
        from wellformedit.TB_CONTENT_IMAGE
        where content_id = '` + contentId + `';
      `;

      connection.query( queryString, function(err, results, fields){
        console.log( "getSpecificContentImageInfo" );

        resolve( results );
        if( err ) reject( err );
      } );
    } );
  }

  this.getMenuDescription = function( connection, path ){
    return new Promise( function(resolve, reject){
      var queryString = "select id, name, displayName, redirectPath, description from wellformedit.TB_MENU where TB_MENU.usage = 'Y' and TB_MENU.redirectPath = '" + path + "';"

      connection.query( queryString, function( err, results, fields ){
        console.log( "getMenuDescription" );

        resolve( results );
        if( err ) reject(err);
      } )
    } );
  }

  this.getKeywordList = function(connection){
    return new Promise( function(resolve, reject){
      connection.query( "select id, level, parent, sequence, name, displayName from wellformedit.TB_KEYWORD where TB_KEYWORD.usage = 'Y' group by parent, level, sequence;", function( err, results, fields ){
        console.log( "getKeywordList" );

        resolve( results );
        if( err ) reject(err);
      } );
    } );
  }
  // menu - end

  // search words - start
  this.insertSearchWords = function( connection, searchWordObject ){
    return new Promise( function(resolve, reject){
      getInsertSearchWordsPromises( connection, searchWordObject )
      .then( function( resultPromises ){
        Promise.all( resultPromises )
        .then( function( results ){
          resolve( searchWordObject );
        } );
      } );
    } );
  }

  function getInsertSearchWordsPromises( connection, searchWordObject ){
    return new Promise( function(resolve, reject){
      let searchWords = searchWordObject.searchWordsWithLevel;

      var promises = [];

      for( let i=0; i<searchWords.length; i++ ){
        var eachPromise = new Promise( function(_resolve,_reject){

          let searchWord = searchWords[i].word;

          let queryStringSelect = `select count(*) from wellformedit.TB_SEARCHWORD where word = '` + searchWord + `' and type='normal'`;
          connection.query( queryStringSelect, function( err, results, fields ){

            if( results && results[0]['count(*)'] > 0 ){
              let queryStringUpdate = `Update wellformedit.TB_SEARCHWORD set hitLevel = hitLevel + ` + searchWords[i].level + ` where word = '` + searchWord + `' and type ='normal'`;

              connection.query( queryStringUpdate, function( _err, _results, _fields ){
                _resolve( _results );
              } );

            } else{
              let queryStringInsert = `Insert into wellformedit.TB_SEARCHWORD values ( 'normal', '` + searchWord + `', ` + searchWords[i].level + `, 0 );`;

              connection.query( queryStringInsert, function( _err, _results, _fields ){
                _resolve( _results );
              } );
            }

          } );
        } );

        promises.push( eachPromise );
      }

      let keywordWords = searchWordObject.searchKeywordWordsWithLevel;

      for( let i=0; i<keywordWords.length; i++ ){
        var eachPromise = new Promise( function(_resolve, _reject){
          let keywordWord = keywordWords[i].word;

          let queryStringSelect = `select count(*) from wellformedit.TB_SEARCHWORD where word = '` + keywordWord + `' and type = 'keyword'`;

          connection.query( queryStringSelect, function( err, results, fields ){

            if( results && results[0]['count(*)'] > 0 ){
              let queryStringUpdate = `Update wellformedit.TB_SEARCHWORD set hitLevel = hitLevel + ` + keywordWords[i].level + ` where word = '` + keywordWord + `' and type ='keyword'`;

              connection.query( queryStringUpdate, function( _err, _results, _fields ){
                _resolve( _results );
              } );

            } else{
              let queryStringInsert = `Insert into wellformedit.TB_SEARCHWORD values ( 'keyword', '` + keywordWord + `', ` + keywordWords[i].level +  `, 0 );`;

              connection.query( queryStringInsert, function( _err, _results, _fields ){
                _resolve( _results );
              } );
            }

          } );
        } );

        promises.push( eachPromise );
      }

      let cheatsheetWords = searchWordObject.searchCheatsheetWordsWithLevel;

      for( let i=0; i<cheatsheetWords.length; i++ ){
        var eachPromise = new Promise( function(_resolve, _reject){
          let cheatsheetWord = cheatsheetWords[i].word;

          let queryStringSelect = `select count(*) from wellformedit.TB_SEARCHWORD where word = '` + cheatsheetWord + `' and type = 'cheatsheet'`;

          connection.query( queryStringSelect, function( err, results, fields ){

            if( results && results[0]['count(*)'] > 0 ){
              let queryStringUpdate = `Update wellformedit.TB_SEARCHWORD set hitLevel = hitLevel + ` + cheatsheetWords[i].level + ` where word = '` + cheatsheetWord + `' and type ='cheatsheet'`;

              connection.query( queryStringUpdate, function( _err, _results, _fields ){
                _resolve( _results );
              } );

            } else{
              let queryStringInsert = `Insert into wellformedit.TB_SEARCHWORD values ( 'cheatsheet', '` + cheatsheetWord + `', ` + cheatsheetWords[i].level + `, 0 );`;

              connection.query( queryStringInsert, function( _err, _results, _fields ){
                _resolve( _results );
              } );
            }

          } );
        } );

        promises.push( eachPromise );
      }


      resolve( promises );
    } );
  }

  this.getCheatsheet = function( connection, searchWordObject ){
    return new Promise( function(resolve, reject){
      let promises = [];


      // type : topic
      let eachPromise = new Promise( function(_resolve, _reject){
        let searchWherePhaseTemplate = `( title like '%WFIT%' or subtitle like '%WFIT%' or summary like '%WFIT%' )`;

        let searchWherePhase = ``;

        let searchWords = searchWordObject.searchWordsWithLevel;

        for( let i=0; i<searchWords.length; i++ ){
          searchWherePhase += searchWherePhaseTemplate.replace( /WFIT/gi, searchWords[i].word );

          if( i != searchWords.length - 1 ){
            searchWherePhase += ' or ';
          }
        }

        // let queryString = `select * from wellformedit.TB_CONTENT_IMAGE where id in ( select distinct(id) from wellformedit.TB_CONTENT_IMAGE where title in (` + searchWherePhase + `) or subtitle in (` + searchWherePhase + `) or description in (` + searchWherePhase + `) ) order by hitCount;`;

        // let queryString = `
        //   select
        //     A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
        //     B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, false as duplicated, C.redirectPath as topRedirect
        //   from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B, wellformedit.TB_MENU C
        //   where A.id in ( select distinct(id) from wellformedit.TB_CONTENT_IMAGE where ` + searchWherePhase + ` )
        //   and A.content_id = B.id and B.parentMenu = C.id
        //   order by A.hitCount;
        // `;

        let queryString = `
          select distinct
            B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName, false as duplicated
          from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
          where B.id in ( select distinct(id) from wellformedit.TB_CONTENT where ` + searchWherePhase + ` )
            and A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu
            and B.parentMenu = D.id and B.id = E.content_id
          order by B.hitCount;
        `;

        // console.log( queryString );

        connection.query( queryString, function(err, results, fields){
          _resolve( { "searchWords":searchWords, "cheatsheets":results } );
        } );
      } );

      promises.push( eachPromise );


      // type : keyword
      eachPromise = new Promise( function(_resolve, _reject){
        let searchWherePhaseTemplate = `displayName like '%WFIT%'`;
        let searchWherePhase = ``;

        let searchWords = searchWordObject.searchKeywordWordsWithLevel;

        for( let i=0; i<searchWords.length; i++ ){
          searchWherePhase += searchWherePhaseTemplate.replace( /WFIT/gi, searchWords[i].word );
          if( i != searchWords.length - 1 ){
            searchWherePhase += ' or ';
          }
        }

        // let queryString = `select * from wellformedit.TB_CONTENT_IMAGE where content_id in ( select distinct(content_id) from wellformedit.TB_CONTENT_KEYWORD where keyword_id in ( select id from wellformedit.TB_KEYWORD where displayName in ( ` + searchWherePhase + `) ) ) order by hitCount;`;

        // let queryString = `
        //   select
        //     A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
        //     B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, false as duplicated
        //   from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B
        //   where A.content_id in ( select distinct(content_id) from wellformedit.TB_CONTENT_KEYWORD where keyword_id in ( select id from wellformedit.TB_KEYWORD where ( ` + searchWherePhase + ` ) ) )
        //   and A.content_id = B.id
        //   order by A.hitCount;
        // `;

        let queryString = `
          select
            B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName, false as duplicated
          from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
          where B.id in ( select distinct(content_id) from wellformedit.TB_CONTENT_KEYWORD where keyword_id in ( select id from wellformedit.TB_KEYWORD where ( ` + searchWherePhase + ` ) ) )
            and A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu
            and B.parentMenu = D.id and B.id = E.content_id
          order by B.hitCount;
        `;

        // console.log( queryString );

        connection.query( queryString, function(err, results, fields){
          _resolve( { "searchWords":searchWords, "cheatsheets":results } );
        } );
      } );

      promises.push( eachPromise );


      // type : image
      eachPromise = new Promise( function(_resolve, _reject){
        let searchWherePhaseTemplate = `( title like '%WFIT%' or subtitle like '%WFIT%' or description like '%WFIT%' )`;
        let searchWherePhase = ``;

        let searchWords = searchWordObject.searchCheatsheetWordsWithLevel;

        for( let i=0; i<searchWords.length; i++ ){
          searchWherePhase += searchWherePhaseTemplate.replace( /WFIT/gi, searchWords[i].word );
          if( i != searchWords.length - 1 ){
            searchWherePhase += ' or ';
          }
        }

        // let queryString = `select * from wellformedit.TB_CONTENT_IMAGE where content_id in ( select id from wellformedit.TB_CONTENT where title in( ` + searchWherePhase + ` ) ) order by hitCount;`;

        // let queryString = `
        //   select
        //     A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
        //     B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, false as duplicated
        //   from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B
        //   where A.content_id in ( select id from wellformedit.TB_CONTENT where ( ` + searchWherePhase + ` ) )
        //   and A.content_id = B.id
        //   order by A.hitCount;
        // `;

        let queryString = `
          select distinct
            B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName, false as duplicated
          from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
          where E.id in ( select distinct(id) from wellformedit.TB_CONTENT_IMAGE where ` + searchWherePhase + ` )
            and A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu
            and B.parentMenu = D.id and B.id = E.content_id
          order by B.hitCount;
        `;

        // console.log( queryString );

        connection.query( queryString, function(err, results, fields){
          _resolve( { "searchWords":searchWords, "cheatsheets":results } );
        } );
      } );

      promises.push( eachPromise );

      Promise.all( promises )
      .then( function(){
        let cheatsheets = [];
        let cheatsheetObject = {};
        let argv = arguments[0];

        if( argv[0].cheatsheets != undefined && argv[0].cheatsheets != null ) cheatsheets = cheatsheets.concat( argv[0].cheatsheets );
        if( argv[1].cheatsheets != undefined && argv[1].cheatsheets != null ) cheatsheets = cheatsheets.concat( argv[1].cheatsheets );
        if( argv[2].cheatsheets != undefined && argv[2].cheatsheets != null ) cheatsheets = cheatsheets.concat( argv[2].cheatsheets );

        resolve( cheatsheets );
      } );

    } );
  }

  this.getCheatsheet__ = function( connection, searchWordObject ){
    return new Promise( function(resolve, reject){
      let promises = [];


      // type : normal
      let eachPromise = new Promise( function(_resolve, _reject){
        let searchWherePhaseTemplate = `( title like '%WFIT%' or subtitle like '%WFIT%' or description like '%WFIT%' )`;

        let searchWherePhase = ``;

        let searchWords = searchWordObject.searchWordsWithLevel;

        for( let i=0; i<searchWords.length; i++ ){
          searchWherePhase += searchWherePhaseTemplate.replace( /WFIT/gi, searchWords[i].word );

          if( i != searchWords.length - 1 ){
            searchWherePhase += ' or ';
          }
        }

        // let queryString = `select * from wellformedit.TB_CONTENT_IMAGE where id in ( select distinct(id) from wellformedit.TB_CONTENT_IMAGE where title in (` + searchWherePhase + `) or subtitle in (` + searchWherePhase + `) or description in (` + searchWherePhase + `) ) order by hitCount;`;

        let queryString = `
          select
            A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
            B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, false as duplicated, C.redirectPath as topRedirect
          from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B, wellformedit.TB_MENU C
          where A.id in ( select distinct(id) from wellformedit.TB_CONTENT_IMAGE where ` + searchWherePhase + ` )
          and A.content_id = B.id and B.parentMenu = C.id
          order by A.hitCount;
        `;

        // let queryString = `
        //   select
        //     B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName
        //   from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
        //   where E.id in ( select distinct(id) from wellformedit.TB_CONTENT_IMAGE where ` + searchWherePhaseForImageTable + ` )
        //     and A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu and B.id = E.content_id
        //   order by hitCount desc;
        // `;

        console.log( queryString );

        connection.query( queryString, function(err, results, fields){
          _resolve( { "searchWords":searchWords, "cheatsheets":results } );
        } );
      } );

      promises.push( eachPromise );


      // type : keyword
      eachPromise = new Promise( function(_resolve, _reject){
        let searchWherePhaseTemplate = `displayName like '%WFIT%'`;
        let searchWherePhase = ``;

        let searchWords = searchWordObject.searchKeywordWordsWithLevel;

        for( let i=0; i<searchWords.length; i++ ){
          searchWherePhase += searchWherePhaseTemplate.replace( /WFIT/gi, searchWords[i].word );
          if( i != searchWords.length - 1 ){
            searchWherePhase += ' or ';
          }
        }

        // let queryString = `select * from wellformedit.TB_CONTENT_IMAGE where content_id in ( select distinct(content_id) from wellformedit.TB_CONTENT_KEYWORD where keyword_id in ( select id from wellformedit.TB_KEYWORD where displayName in ( ` + searchWherePhase + `) ) ) order by hitCount;`;

        let queryString = `
          select
            A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
            B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, false as duplicated
          from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B
          where A.content_id in ( select distinct(content_id) from wellformedit.TB_CONTENT_KEYWORD where keyword_id in ( select id from wellformedit.TB_KEYWORD where ( ` + searchWherePhase + ` ) ) )
          and A.content_id = B.id
          order by A.hitCount;
        `;

        // console.log( queryString );

        connection.query( queryString, function(err, results, fields){
          _resolve( { "searchWords":searchWords, "cheatsheets":results } );
        } );
      } );

      promises.push( eachPromise );


      // type : discussion
      eachPromise = new Promise( function(_resolve, _reject){
        let searchWherePhaseTemplate = `title like '%WFIT%'`;
        let searchWherePhase = ``;

        let searchWords = searchWordObject.searchDiscussionWordsWithLevel;

        for( let i=0; i<searchWords.length; i++ ){
          searchWherePhase += searchWherePhaseTemplate.replace( /WFIT/gi, searchWords[i].word );
          if( i != searchWords.length - 1 ){
            searchWherePhase += ' or ';
          }
        }

        // let queryString = `select * from wellformedit.TB_CONTENT_IMAGE where content_id in ( select id from wellformedit.TB_CONTENT where title in( ` + searchWherePhase + ` ) ) order by hitCount;`;

        let queryString = `
          select
            A.id, A.title, A.subtitle, A.description, A.savedDate, A.originalFileName, A.savedFileName, A.thumbnailWithRatioFileName, A.thumbnailRectangleFileName, A.ratio, A.savedPath, A.encoding, A.mimetype, A.hitCount as image_hitcount,
            B.id as content_id, B.title as content_title, B.subtitle as content_subtitle, B.summary as content_summary, B.specifics as content_specifics, B.type as content_type, B.writer, B.hitCount as content_hitcount, false as duplicated
          from wellformedit.TB_CONTENT_IMAGE A, wellformedit.TB_CONTENT B
          where A.content_id in ( select id from wellformedit.TB_CONTENT where ( ` + searchWherePhase + ` ) )
          and A.content_id = B.id
          order by A.hitCount;
        `;

        // console.log( queryString );

        connection.query( queryString, function(err, results, fields){
          _resolve( { "searchWords":searchWords, "cheatsheets":results } );
        } );
      } );

      promises.push( eachPromise );

      Promise.all( promises )
      .then( function(){
        let cheatsheets = [];
        let cheatsheetObject = {};
        let argv = arguments[0];

        if( argv[0].cheatsheets != undefined && argv[0].cheatsheets != null ) cheatsheets = cheatsheets.concat( argv[0].cheatsheets );
        if( argv[1].cheatsheets != undefined && argv[1].cheatsheets != null ) cheatsheets = cheatsheets.concat( argv[1].cheatsheets );
        if( argv[2].cheatsheets != undefined && argv[2].cheatsheets != null ) cheatsheets = cheatsheets.concat( argv[2].cheatsheets );

        resolve( cheatsheets );
      } );

    } );
  }

  this.updateCheatsheetHitCount = function( connection, cheatsheets ){
    return new Promise( function(resolve, reject){

      var promises = [];

      for( let i=0; i<cheatsheets.length; i++ ){
        promises.push( updateEachCheatsheetHitCount(connection, cheatsheets[i].id) );
      }

      Promise.all( promises )
      .then( function(){
        resolve( cheatsheets );
      } );
    } );
  }

  function updateEachCheatsheetHitCount( connection, cheatsheetId ){
    return new Promise( function(resolve, reject){
      let queryString = `Update wellformedit.TB_CONTENT_IMAGE set hitCount = hitCount + 1 where id = '` + cheatsheetId + `'`;

      connection.query( queryString, function(err, results, fields){
        if( !err ){
          resolve();
        }
      } );
    } );
  }

  this.updateContentHitCount = function( connection, cheatsheets ){
    return new Promise( function(resolve, reject){

      var promises = [];

      for( let i=0; i<cheatsheets.length; i++ ){
        promises.push( updateEachContentHitCount(connection, cheatsheets[i].content_id) );
      }

      Promise.all( promises )
      .then( function(){
        resolve( cheatsheets );
      } );
    } );
  }

  function updateEachContentHitCount( connection, contentId ){
    return new Promise( function(resolve, reject){
      let queryString = `Update wellformedit.TB_CONTENT set hitCount = hitCount + 1 where id = '` + contentId + `'`;

      connection.query( queryString, function(err, results, fields){
        if( !err ){
          resolve();
        }
      } );
    } );
  }

  // search words - end

  // cheatsheet - start
  this.getTop10SearchWords = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `select * from wellformedit.TB_SEARCHWORD order by hitLevel desc limit 10;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getKeywordsRanking = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `select A.keyword_id, count(A.keyword_id) as count, B.displayName from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_KEYWORD B where A.keyword_id = B.id group by keyword_id order by count desc limit 5;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getContentsRanking = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `select * from wellformedit.TB_CONTENT where type = 'content' order by hitCount desc limit 5;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }
  // cheatsheet - end




  // discussion - Start
  this.getContentId = function( connection, contentTitle ){
    return new Promise( function(resolve, reject){
      let queryString = `select id from wellformedit.TB_CONTENT where title = '` + contentTitle + `'`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getKeywordId = function( connection, keywordTitle ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select content_id as specificId, id as keywordId from TB_CONTENT_SPECIFIC_TAG
        where content_id = ( select id from wellformedit.TB_CONTENT where title like '%Content Specification%' and type = 'content' )
        and outerText = '` + keywordTitle + `'
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getDiscussionKeywordsRanking = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `select A.keyword_id, count(A.keyword_id) as count, B.displayName from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_KEYWORD B where A.keyword_id = B.id group by keyword_id order by count desc limit 10;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getDiscussionHitCountRanking = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `select * from wellformedit.TB_CONTENT where type = 'content' order by hitCount desc limit 10;`;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListArchitecture = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0005' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListInterpretationNAnalysis = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0006' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListDesignNProgramming = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0007' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListFrameworkNArchitecture = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0008' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListConnectionNCommunication = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0009' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        console.log( queryString );
        console.log( results );

        resolve( results );
      } );
    } );
  }

  this.getListDiscussionNHotPotato = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0010' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListComputerArchitecture = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0014' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getContentIdByImg = function( connection, imgId ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select id as imgId, content_id as contentId from wellformedit.TB_CONTENT_IMAGE
        where id = '` + imgId + `';
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results[0] );
      } );
    } );
  }

  this.getListSignalTransfer = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0015' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListMath = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0016' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListDataStructure = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0017' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListAlgorithm = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0018' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListC = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0019' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListCPlusPlus = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0020' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListJava = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0021' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListJavascript = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0022' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListHtml5 = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0023' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListCss3 = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0024' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListUml = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0025' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListWebApplicationArchitecture = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0026' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListSpring = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0027' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListBootstrap = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0028' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListJquery = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0029' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListNodejs = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0030' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListNetwork = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0031' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListCloud = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0032' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListBigdata = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0033' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListSecurity = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0034' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getListMachineLearning = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B
        where A.keyword_id = 'id_keyword_0035' and A.content_id = B.id;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getDiscussionStatus = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select count(distinct(id)) as count, sum(hitCount) as hitCount from wellformedit.TB_CONTENT
          union all
        select count(distinct(id)) as count, sum(hitCount) as hitCount from wellformedit.TB_CONTENT_IMAGE;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getWholeTopicList = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
        where A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu and B.id = E.content_id
        order by hitCount desc;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getRecentTopicList = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
        where A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu and B.id = E.content_id
        order by createdDate desc limit 10;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getPopularTopicList = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect, E.id as imageId, E.thumbnailRectangleFileName as thumbnailRectangleFileName
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D, wellformedit.TB_CONTENT_IMAGE E
        where A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu and B.id = E.content_id
        order by hitCount desc limit 10;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getKeywordsInfo = function( connection, displayName ){
    return new Promise( function(resolve, reject){
      let queryString = `
      select A.level, A.sequence, A.imageFileName, A.description, A.id, A.parent, A.displayName, A.name, concat( B.id ,'_redirect' ) as redirectUrl
      from wellformedit.TB_KEYWORD A, wellformedit.TB_CONTENT_SPECIFIC_TAG B
      where ( A.DisplayName = '` + displayName + `'
       or A.parent = ( select id from wellformedit.TB_KEYWORD where DisplayName = '` + displayName + `' ) )
      and A.displayName = B.outerText
      and B.content_id = 'id_content_0051'
      order by level, sequence;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getContentTop1 = function( connection, displayName ){
    return new Promise( function(resolve, reject){
      let queryString = `
        select id, title, subtitle, hitCount from wellformedit.TB_CONTENT
        where id = ( select content_id from wellformedit.TB_CONTENT_KEYWORD where keyword_id = ( select id from wellformedit.TB_KEYWORD where DisplayName = '` + displayName + `') limit 1 );
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }

  this.getTopicListTable = function(connection){
    return new Promise( function(resolve, reject){
      let queryString = `
        select
          B.id as content_id, B.title, B.subtitle, B.summary, B.writer, B.createdDate, B.hitCount, C.displayName as keywordDisplayName, B.type as content_type, D.redirectPath as topRedirect
        from wellformedit.TB_CONTENT_KEYWORD A, wellformedit.TB_CONTENT B, wellformedit.TB_KEYWORD C, wellformedit.TB_MENU D
        where A.content_id = B.id and A.keyword_id = C.id and D.id = B.parentMenu
        order by hitCount desc;
      `;

      connection.query( queryString, function(err, results, fields){
        resolve( results );
      } );
    } );
  }
  // discussion - end




  // contentSaver - start
  this.clearLastContent = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      let queryString = `delete from wellformedit.TB_CONTENT where id = '` + content_id + `';`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( results );
      } );
    } );
  }

  this.clearLastSpecific = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      let queryString = `delete from wellformedit.TB_CONTENT_SPECIFIC where id = '` + content_id + `'`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( results );
      } );
    } );
  }

  this.clearLastSpecificTag = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      let queryString = `delete from wellformedit.TB_CONTENT_SPECIFIC_TAG where content_id = '` + content_id + `'`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( results );
      } );
    } );
  }

  this.clearLastImage = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      let queryString = `delete from wellformedit.TB_CONTENT_IMAGE where id = '` + content_id + `'`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( results );
      } );
    } );
  }

  this.clearLastKeyword = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      let queryString = `delete from wellformedit.TB_CONTENT_KEYWORD where content_id = '` + content_id + `'`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( results );
      } );
    } );
  }

  this.clearLastModelValues = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      let queryString = `delete from wellformedit.TB_CONTENT_SPECIFIC_MODELVALUE where content_id = '` + content_id + `'`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( results );
      } );
    } );
  }






  this.getContentID = function( connection ){
    return new Promise( function(resolve, reject){
      var queryString = `select max(id) as id from wellformedit.TB_CONTENT;`;
      var maxID = "";

      connection.query( queryString, function(err, results, fields){

        if( results == undefined || results[0].id == null ){
          maxID = "id_content_0001";
        } else{
          var temp = results[0].id;
          temp = temp.replace( "id_content_", "" );

          var maxSequence = parseInt( temp ) + 1;

          var maxSequenceString = maxSequence.toString();
          if( maxSequenceString.length == 4 ){
          } else if( maxSequenceString.length == 3 ){
            maxSequenceString = "0" + maxSequenceString;
          } else if( maxSequenceString.length == 2 ){
            maxSequenceString = "00" + maxSequenceString;
          } else if( maxSequenceString.length == 1 ){
            maxSequenceString = "000" + maxSequenceString;
          }

          maxID = "id_content_" + maxSequenceString;
        }

        // console.log( queryString );
        // console.log( results );

        resolve( maxID );

        if( err ) reject( err );
      } );
    } );
  }

  this.getContentSpecificID = function( connection, content_id ){
    return new Promise( function(resolve, reject){
      var queryString = `select CASE WHEN max(id) is null THEN 'id_content_specific_0000' ELSE max(id) END AS MAXID from wellformedit.TB_CONTENT_SPECIFIC_TAG;`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        resolve( {"content_id" : content_id, "specific_id" : results[0].MAXID} );
      } );
    } );
  }

  this.getContentSpecificModelValueId = function( connection, current_ids ){
    return new Promise( function(resolve, reject){
      var queryString = `select CASE WHEN max(id) is null THEN 'id_content_specific_modelvalue_0000' ELSE max(id) END AS MAXID from wellformedit.TB_CONTENT_SPECIFIC_MODELVALUE;`;

      connection.query( queryString, function(err, results, fields){
        // console.log( queryString );
        // console.log( results );

        current_ids[ "model_value_id" ] = results[0].MAXID;
        resolve( current_ids );
      } );
    } );
  }

  this.insertContent = function( connection, category, top_menu_id, content_id, title, subtitle, summary, specifics, writer, current_ids ){
    return new Promise( function(resolve, reject){
      var currentTime = new Date();
      currentTime = currentTime.toISOString();
      currentTime = currentTime.substring( 0, 9 );

      specifics = specifics.split( "WI%-" ).join( "<div class=image-info>" );
      specifics = specifics.split( "%IW" ).join( `,"end":"true"</div>` );

      var queryString = `
      INSERT INTO wellformedit.TB_CONTENT (type, parentMenu, id, title, subtitle, summary, specifics, writer, createdDate, updatedDate, hitCount)
      VALUES
      ('` + category + `', '` + top_menu_id + `', '` + current_ids.content_id + `', '` + title + `', '` + subtitle + `', '` + summary + `', '` + specifics + `', '` + writer +`', '` + currentTime + `', '` + currentTime + `', ` + 0 + `);`;

      connection.query( queryString, function( err, results, fields ){
        // console.log( queryString );
        // console.log( results );

        resolve( current_ids );
      } );
    } );
  }

  this.insertContentsKeywords = function( connection, keywords_id, current_ids ){
    return new Promise( function(resolve, reject){

      let promises = [];

      if( keywords_id ){
        for( var i=0; i<keywords_id.length; i++ ){
          var queryString = `insert into wellformedit.TB_CONTENT_KEYWORD (content_id, keyword_id) values ('` + current_ids.content_id + `', '` + keywords_id[i] + `');`;
          promises.push( connection.query( queryString, function(err, _results, fields){ resolve(_results); } ) );
        }

        Promise.all( promises )
        .then( function(){
          resolve( current_ids );
        } );
      }

      resolve( current_ids );
    } );
  }

  this.insertContentSpecifics = function( connection, specifics_index, current_ids ){
    return new Promise( function(resolve, reject){

      var current_specific_id = current_ids.specific_id;
      var funcResult = "";

      let promises = [];

      if( specifics_index ){
        let index = 0;

        for( var i=0; i<specifics_index.length; i++ ){

          if( specifics_index[i].nodeName == "H3" && specifics_index[i].innerHTML != "<br>" ){
            current_specific_id = current_specific_id.replace( "id_content_specific_", "" );

            var maxSequence = parseInt( current_specific_id ) + 1;

            var maxSequenceString = maxSequence.toString();
            if( maxSequenceString.length == 4 ){
            } else if( maxSequenceString.length == 3 ){
              maxSequenceString = "0" + maxSequenceString;
            } else if( maxSequenceString.length == 2 ){
              maxSequenceString = "00" + maxSequenceString;
            } else if( maxSequenceString.length == 1 ){
              maxSequenceString = "000" + maxSequenceString;
            }

            maxID = "id_content_specific_" + maxSequenceString;
            current_specific_id = maxID;

            var queryString = `insert into wellformedit.TB_CONTENT_SPECIFIC (id, content_id, sequence, header) values ( '` + maxID + `','` + current_ids.content_id + `',` + index + `,'` + specifics_index[i].innerText + `' );`

            promises.push( connection.query( queryString, function(err, _results, fields){ resolve(_results) } ) );
            index++;
          }
        }

        Promise.all( promises )
        .then( function(){
          resolve( current_ids );
        } );
      }
      resolve( current_ids );
    } );
  }

  this.insertContentSpecificsTag = function( connection, specifics_tags, current_ids ){
    return new Promise( function(resolve, reject){
      var current_specific_id = current_ids.specific_id;
      var funcResult = "";
      var index = 0;
      var specifics_index = [];

      let promises = [];

      if( specifics_tags ){
        for( let i=0; i<specifics_tags.length; i++){
          if( specifics_tags[i].nodeName != "P" && specifics_tags[i].innerHTML != "<br>" ){
            current_specific_id = current_specific_id.replace( "id_content_specific_", "" );

            var maxSequence = parseInt( current_specific_id ) + 1;

            var maxSequenceString = maxSequence.toString();
            if( maxSequenceString.length == 4 ){
            } else if( maxSequenceString.length == 3 ){
              maxSequenceString = "0" + maxSequenceString;
            } else if( maxSequenceString.length == 2 ){
              maxSequenceString = "00" + maxSequenceString;
            } else if( maxSequenceString.length == 1 ){
              maxSequenceString = "000" + maxSequenceString;
            }

            maxID = "id_content_specific_" + maxSequenceString;
            current_specific_id = maxID;

            let queryString = `INSERT INTO wellformedit.TB_CONTENT_SPECIFIC_TAG (id, content_id, sequence, nodeName, nodeId, class, innerHTML, innerText, outerHTML, outerText)
                                VALUES
                                ('` + maxID + `', '` + current_ids.content_id +  `', ` + index + `,'` + specifics_tags[i].nodeName + `', '` + specifics_tags[i].nodeId + `'
                                , '` + specifics_tags[i].class + `', '` + specifics_tags[i].innerHTML + `', '` + specifics_tags[i].innerText + `', '` + specifics_tags[i].outerHTML + `', '` + specifics_tags[i].outerText + `' );`;


            promises.push( connection.query( queryString, function(err, _results, fields){ resolve(_results) } ) );

            specifics_index.push( specifics_tags[i].innerText );

            index++;
          }
        }

        Promise.all( promises )
        .then( function(){
          resolve( current_ids );
        } );
      }

      resolve( current_ids );
    } );
  }

  this.insertContentSpecificsModelValue = function( connection, specifics, current_ids ){
    return new Promise( function(resolve, reject){
      var promises = [];

      var current_model_value_id = current_ids.model_value_id;
      var index = 0;
      var funcResult = "";

      specifics = specifics.replace( /\&nbsp;/gi, " " );

      while( specifics.indexOf( "W%-" ) > -1 ){
        var startIndex = specifics.indexOf( "W%-" );
        var endIndex = specifics.indexOf( "%W" );

        var modelValue = specifics.substring( startIndex + 3, endIndex );

        modelValue = modelValue.replace(/\s+/, "");//왼쪽 공백제거
        modelValue = modelValue.replace(/\s+$/g, "");//오른쪽 공백제거




        current_model_value_id = current_model_value_id.replace( "id_content_specific_modelvalue_", "" );

        var maxSequence = parseInt( current_model_value_id ) + 1;

        var maxSequenceString = maxSequence.toString();
        if( maxSequenceString.length == 4 ){
        } else if( maxSequenceString.length == 3 ){
          maxSequenceString = "0" + maxSequenceString;
        } else if( maxSequenceString.length == 2 ){
          maxSequenceString = "00" + maxSequenceString;
        } else if( maxSequenceString.length == 1 ){
          maxSequenceString = "000" + maxSequenceString;
        }

        maxID = "id_content_specific_modelvalue_" + maxSequenceString;
        current_model_value_id = maxID;



        let queryString = `
          INSERT INTO wellformedit.TB_CONTENT_SPECIFIC_MODELVALUE (id, content_id, sequence, name)
          VALUES ('` + maxID +`', '` + current_ids.content_id + `', ` + index + `, '` + modelValue + `');
        `;

        promises.push(
          connection.query( queryString, function(err, _results, fields){
            resolve( _results );
          } )
        );

        var modelValueTag = "W%-" + modelValue + "%W";
        var newModelValueTag = "<%-" + modelValue + "%>";

        specifics = specifics.replace( "W%-", "<%-" );
        specifics = specifics.replace( "%W", "%>" );

        // specifics = specifics.replace( modelValueTag, newModelValueTag );

        index++;
      }

      Promise.all( promises )
      .then( function(){
        resolve( current_ids );
      } );
    } );
  }

  this.updateImageId = function( connection, img_srcs, current_ids ){
    return new Promise( function(resolve, reject){
      var funcResult = "";

      let promises = [];

      if( img_srcs ){
        for( let i=0; i<img_srcs.length; i++ ){
          var queryString = `update wellformedit.TB_CONTENT_IMAGE set content_id = '` + current_ids.content_id + `' where savedFileName = '` + decodeURIComponent(img_srcs[i]) + `';`

          promises.push( connection.query( queryString, function(err, results, fields){
            funcResult += results.toString();
          } ) );
        }

        Promise.all( promises )
        .then( function(){
          resolve( current_ids );
        } );
      }

      resolve( current_ids );
    } );
  }

  this.updateImageInfo = function( connection, specifics, current_ids ){
    return new Promise( function(resolve, reject){
      var funcResult = "";

      specifics = specifics.replace( /\&nbsp;/gi, " " );
      specifics = specifics.replace( /<br>/gi, " " );
      specifics = specifics.replace( /&#39;/gi, "'" );

      specifics = specifics.replace( /<div class='imge-info'>/gi, "WI%-" );
      specifics = specifics.replace( /<\/div>/gi, "%IW" );

      let promises = [];

      while( specifics.indexOf( "WI%-" ) > -1 ){
        var startIndex = specifics.indexOf( "WI%-" );
        var endIndex = specifics.indexOf( "%IW" );

        var imageInfo = specifics.substring( startIndex + 4, endIndex );

        var imageInfoTag = "<div class='image-info'>" + imageInfo + "</div>";
        // specifics = specifics.replace( "WI%-" + imageInfo + "%IW", "" );
        specifics = specifics.replace( "WI%-", "<%-" );
        specifics = specifics.replace ("%IW", "%>" );

        imageInfo = imageInfo.replace(/\s+/, "");//왼쪽 공백제거
        imageInfo = imageInfo.replace(/\s+$/g, "");//오른쪽 공백제거

        imageInfo = "{ " + imageInfo + " }";

        var imageInfoJSON = JSON.parse( imageInfo );

        imageInfoJSON.title = imageInfoJSON.title.replace( /'/gi, "&#39;" );
        imageInfoJSON.subtitle = imageInfoJSON.subtitle.replace( /'/gi, "&#39;" );
        imageInfoJSON.description = imageInfoJSON.description.replace( /'/gi, "&#39;" );
        imageInfoJSON.tempImageID = imageInfoJSON.tempImageID.replace( /'/gi, "&#39;" );

        let queryString = `
          Update wellformedit.TB_CONTENT_IMAGE
          set title = '` + imageInfoJSON.title + `', subtitle = '` + imageInfoJSON.subtitle + `', description = '` + imageInfoJSON.description + `', content_id = '` + current_ids.content_id + `'
          where id = '` + imageInfoJSON.tempImageID + `'
        `;

        promises.push( connection.query( queryString, function(err, results, fields){
          funcResult = results;
        } ) );
      }

      Promise.all( promises )
      .then( function(){
        resolve( current_ids );
      } );
    } );
  }
  // contentSaver - end





}
