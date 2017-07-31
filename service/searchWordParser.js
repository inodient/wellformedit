exports.searchWordParser = function(){

  this.parseSearchWords = function( req ){
    return new Promise( function(resolve, reject){

      let searchWord = req.body.searchWord;

      getSearchWords( searchWord )
      .then( getSeparatedSearchWords )
      .then( getSearchWordsWithSearchLevel )
      .then( getSearchKeywordWordsWithSearchLevel )
      .then( getSearchDiscussionWordsWithSearchLevel )
      .then( getSearchWordsIgnoreDuplication )
      .then( getSearchKeywordWordsIgnoreDuplication )
      .then( getSearchDiscussionWordsIgnoreDuplication )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  function getSearchWords( searchWord ){
    return new Promise( function(resolve, reject){
      var searchWordArray = [];

      // Remove Blank
      while( searchWord.indexOf( "  " ) > -1 ){
        searchWord = searchWord.replace( /  /gi, " " );
      }

      // Remove First / Last Blank
      // console.log( searchWord );
      searchWord = searchWord.replace(/,+$/g, "");//오른쪽 쉼표제거
      searchWord = searchWord.replace(/, /g, ",");
      searchWord = searchWord.replace(/ ,/g, ",");

      // Seperated By ','
      // console.log( searchWord );
      searchWordArray = searchWord.split( /,| ,|, /g );
      searchWordArray = searchWordArray.filter( function(e){ return e });

      // console.log( searchWordArray );

      resolve( {"searchWordArray":searchWordArray} );
    } );
  }

  // sample : asd f,  a s d f , as d f , , asdf   a s d f a sd f ,, 1 2 3 a s df,
  function getSeparatedSearchWords( searchWordObject ){
    return new Promise( function(resolve, reject){
      var separatedSearchWord = [];
      var keywordWord = [];
      var discussionWord = [];

      for( let i=0; i<searchWordObject.searchWordArray.length; i++ ){
        // console.log( searchWordObject.searchWordArray[i] );
        let tempSearchWord = searchWordObject.searchWordArray[i].replace( / : | :|: /g, ":" );

        if( tempSearchWord.indexOf( "KEYWORD:" ) > -1 ){
          keywordWord.push( tempSearchWord.replace( "KEYWORD:", "" ) );
        } else if( tempSearchWord.indexOf( "DISCUSSION" ) > -1 ){
          discussionWord.push( tempSearchWord.replace( "DISCUSSION:", "" ) );
        } else if( searchWordObject.searchWordArray[i].indexOf( " " ) > -1 ){
          separatedSearchWord.push( ( searchWordObject.searchWordArray[i].split( " " ) ).filter( function(e){ return e } ) );
        }
      }

      searchWordObject.separatedSearchWord = separatedSearchWord.filter( function(e){ return e });
      searchWordObject.keywordWord = keywordWord;
      searchWordObject.discussionWord = discussionWord;

      // console.log( searchWordObject );

      resolve( searchWordObject );
    } );
  }

  // sample : DISCUSSION : GOOGLE, DISCUSSION : FACEBOOK, KEYWORD : KEY, KEYWORD : NOTEBOOK, google, facebook amazon
  function getSearchWordsWithSearchLevel( searchWordObject ){
    return new Promise( function(resolve, reject){
      var searchWordsWithLevel = [];

      let searchWordArray = searchWordObject.searchWordArray;
      let separatedSearchWord = searchWordObject.separatedSearchWord;

      for( let i=0; i<searchWordArray.length; i++ ){
        let tempSearchWord = searchWordArray[i].replace( / : | :|: /g, ":" );

        if( tempSearchWord.indexOf( "KEYWORD:" ) < 0 && tempSearchWord.indexOf( "DISCUSSION:" ) ){
          searchWordsWithLevel.push( {"word":searchWordArray[i], "level":10, "duplicated":false} );
        }
      }

      for( let i=0; i<separatedSearchWord.length; i++ ){
        let separatedSearchWordArray = separatedSearchWord[i];

        for( let j=0; j<separatedSearchWordArray.length; j++ ){
          searchWordsWithLevel.push( {"word":separatedSearchWordArray[j], "level":1, "duplicated":false} );
        }
      }

      searchWordObject.searchWordsWithLevel = searchWordsWithLevel;

      // console.log( searchWordsWithLevel );

      resolve( searchWordObject );
    } );
  }

  function getSearchKeywordWordsWithSearchLevel( searchWordObject ){
    return new Promise( function(resolve, reject){
      var searchKeywordWordsWithLevel = [];

      let searchWordArray = searchWordObject.keywordWord;

      for( let i=0; i<searchWordArray.length; i++ ){
        let tempSearchWord = searchWordArray[i].replace( / : | :|: /g, ":" );
        searchKeywordWordsWithLevel.push( {"word":searchWordArray[i], "level":3, "duplicated":false} );
      }

      searchWordObject.searchKeywordWordsWithLevel = searchKeywordWordsWithLevel;

      resolve( searchWordObject );
    } );
  }

  function getSearchDiscussionWordsWithSearchLevel( searchWordObject ){
    return new Promise( function(resolve, reject){
      var searchDiscussionWordsWithLevel = [];

      let searchWordArray = searchWordObject.discussionWord;

      for( let i=0; i<searchWordArray.length; i++ ){
        let tempSearchWord = searchWordArray[i].replace( / : | :|: /g, ":" );
        searchDiscussionWordsWithLevel.push( {"word":searchWordArray[i], "level":3, "duplicated":false} );
      }

      searchWordObject.searchDiscussionWordsWithLevel = searchDiscussionWordsWithLevel;

      resolve( searchWordObject );
    } );
  }




  function getSearchWordsIgnoreDuplication( searchWordObject ){
    return new Promise( function(resolve, reject){
      var searchWordsIgnoreDuplication = [];

      let searchWordsWithLevel = searchWordObject.searchWordsWithLevel;

      for( let i=0; i<searchWordsWithLevel.length; i++ ){
        for( let j=0; j<searchWordsWithLevel.length; j++ ){
          if( searchWordsWithLevel[i].word == searchWordsWithLevel[j].word
            && !searchWordsWithLevel[i].duplicated
            && !searchWordsWithLevel[j].duplicated
            && i != j )
          {
            searchWordsWithLevel[i].level += searchWordsWithLevel[j].level;
            searchWordsWithLevel[i].duplicated = false;
            searchWordsWithLevel[j].duplicated = true;
          }
        }
      }

      // console.log( searchWordsWithLevel );
      // console.log( searchWordsWithLevel.filter( function(e){ return !(e.duplicated) } ) );

      delete searchWordObject.searchWordArray;
      delete searchWordObject.seperatedSearchWord;

      searchWordObject.searchWordsWithLevel = searchWordsWithLevel.filter( function(e){ return !(e.duplicated) } );

      resolve( searchWordObject );
    } );
  }

  function getSearchKeywordWordsIgnoreDuplication( searchWordObject ){
    return new Promise( function(resolve, reject){
      var searchKeywordWordsIgnoreDuplication = [];

      let searchWordsWithLevel = searchWordObject.searchKeywordWordsWithLevel;

      for( let i=0; i<searchWordsWithLevel.length; i++ ){
        for( let j=0; j<searchWordsWithLevel.length; j++ ){
          if( searchWordsWithLevel[i].word == searchWordsWithLevel[j].word
            && !searchWordsWithLevel[i].duplicated
            && !searchWordsWithLevel[j].duplicated
            && i != j )
          {
            searchWordsWithLevel[i].level += searchWordsWithLevel[j].level;
            searchWordsWithLevel[i].duplicated = false;
            searchWordsWithLevel[j].duplicated = true;
          }
        }
      }

      // console.log( searchWordsWithLevel );
      // console.log( searchWordsWithLevel.filter( function(e){ return !(e.duplicated) } ) );

      delete searchWordObject.keywordWord;

      searchWordObject.searchKeywordWordsWithLevel = searchWordsWithLevel.filter( function(e){ return !(e.duplicated) } );

      resolve( searchWordObject );
    } );
  }

  function getSearchDiscussionWordsIgnoreDuplication( searchWordObject ){
    return new Promise( function(resolve, reject){
      var searchKeywordWordsIgnoreDuplication = [];

      let searchWordsWithLevel = searchWordObject.searchDiscussionWordsWithLevel;

      for( let i=0; i<searchWordsWithLevel.length; i++ ){
        for( let j=0; j<searchWordsWithLevel.length; j++ ){
          if( searchWordsWithLevel[i].word == searchWordsWithLevel[j].word
            && !searchWordsWithLevel[i].duplicated
            && !searchWordsWithLevel[j].duplicated
            && i != j )
          {
            searchWordsWithLevel[i].level += searchWordsWithLevel[j].level;
            searchWordsWithLevel[i].duplicated = false;
            searchWordsWithLevel[j].duplicated = true;
          }
        }
      }

      // console.log( searchWordsWithLevel );
      // console.log( searchWordsWithLevel.filter( function(e){ return !(e.duplicated) } ) );

      delete searchWordObject.discussionWord;

      searchWordObject.searchDiscussionWordsWithLevel = searchWordsWithLevel.filter( function(e){ return !(e.duplicated) } );

      resolve( searchWordObject );
    } );
  }
}
