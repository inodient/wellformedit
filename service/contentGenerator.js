exports.contentGenerator = function(){

  this.setContentSpecificID = function( content, specifics ){
    if( specifics ){
      for( var i=0; i<specifics.length; i++ ){
        let specificHeader = "<h3>" + specifics[i].displayName + "</h3>";
        let newSpecificHeader = "<h3 class='header' id='" + specifics[i].id + "_redirect" + "'>" + specifics[i].displayName + "</h3>";

        content[0].specifics = ( content[0].specifics ).replace( specificHeader, newSpecificHeader );
      }
    }
  }

  this.setContentsNavId = function( content, specifics ){
    return new Promise( function(resolve, reject){
      if( specifics ){
        for( var i=0; i<specifics.length; i++ ){
          let specificHeader = specifics[i].outerHTML;
          let newSpecificHeader = "";

          if( specifics[i].nodeName == "H3" ){
            newSpecificHeader = "<h3 class='header' id='" + (specifics[i].redirectPath).replace("#", "") + "'>" + specifics[i].displayName + "</h3>";
          } else if( specifics[i].nodeName == "H4" ){
            newSpecificHeader = "<h4 class='header' id='" + (specifics[i].redirectPath).replace("#", "") + "'>" + specifics[i].displayName + "</h4>";
          }

          content.specifics = ( content.specifics ).replace( specificHeader, newSpecificHeader );
          resolve( content );
        }
      }
    } );
  }

  this.getContentSelectList = function( contents ){
    let contentSelectList = `<option value="` + `new_creation` + `">` + `New Creation` + `</option>`;

    if( contents ){
      for( var i=0; i<contents.length; i++ ){
        contentSelectList += `<option value="` + contents[i].id + `">` + `[` + contents[i].type + `]   ` + contents[i].title + `</option>`;
      }
    }

    return contentSelectList;
  }

  this.getTopMenuSelectList = function( menus ){
    let menuSelectList = ``;

    if( menus ){
      for( var i=0; i<menus.length; i++ ){
        menuSelectList += `<option value="` + menus[i].id + `">` + menus[i].displayName + `</option>`;
      }
    }

    return menuSelectList;
  }

  this.setContentsModelValue = function( modelValueCode, content ){
    return new Promise( function(resolve,reject){
      for( var name in modelValueCode ){
        content.specifics = ( content.specifics ).split( `W%-` + name + `%W` ).join( modelValueCode[name] );
      }

      resolve( content );
    } );
  }

  this.setContentsImageId = function( imageInfo, content ){
    return new Promise( function(resolve, reject){

      if( imageInfo ){
        for( let i=0; i<imageInfo.length; i++ ){
          let savedFileName = imageInfo[i].savedFileName;
          let imageId = imageInfo[i].id;

          content.specifics = ( content.specifics ).split( `src="` + savedFileName + `"` ).join( `style="margin-top:-80px; padding-top:80px;" id="` + imageId + `" src="` + savedFileName + `"` );
        }
      }

      resolve( content );
    } );
  }

  this.setOpenGraphMetaTag = function( imageInfo, content ){
    return new Promise( function(resolve, reject){

      let baseUrl = 'http://www.wellformedit.com';

      let url = baseUrl;
      let title = 'Well Formed IT';
      let description = 'Divide specifically, Build well-formedly';
      let image = 'http://www.wellformedit.com/wellformedit_logo_og.png';

      if( content ){
        if( content.type == "main" ){
          url = baseUrl + "/" + content.redirectPath;
          title = content.title;
          description = ( content.description ).split("<br>").join();
        } else if( content.type == "content" ){
          url = baseUrl + "/" + content.redirectPath + "?contentid=" + content.id;
          title = content.title;
          description = ( content.summary ).split("<br>").join();
        }
      }

      if( imageInfo && imageInfo.length ){
        image = baseUrl + "/" + imageInfo[0].savedFileName;
      }

      let metaTag = `
        <!-- opengraph meta - start -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@wellformedit" />
        <meta name="twitter:creator" content="@wellformedit" />

        <meta property="fb:app_id" content="1910794212495192" />

        <meta property="og:url"                content="` + url + `" />
        <meta property="og:type"               content="blog" />
        <meta property="og:title"              content="` + title + `" />
        <meta property="og:description"        content="` + description + `" />
        <meta property="og:image"              content="` + image + `" />
        <!-- opengraph meta - end -->
      `;

      content.openGraph = metaTag;

      resolve( content );
    } );
  }

  this.getCheatsheetCode = function( searchWordObject, cheatsheetData ){
    return new Promise( function(resolve, reject){

      getRemoveDuplicationCheatsheets( cheatsheetData )
      .then( function( results ){
        cheatsheetData = results;

        if( cheatsheetData.length == 0 ){
          resolve( `<div class="appending-search-result"><H5>No results founded</H5></div>` );
        }


        let cheatsheetCode = "";
        let modalCodes = "";

        if( cheatsheetData.length == 1 ){
          cheatsheetCode += `<H5>Only 1 topic content is founded.</H5>`;
        } else{
          cheatsheetCode += `<H5>Total ` + cheatsheetData.length + ` topic contents are founded.</H5>`;
        }


        let promises = [];

        // console.log( cheatsheetData );

        promises.push( getCheatsheetListCode( searchWordObject, cheatsheetData ) );
        promises.push( getCheatsheetModalCode( cheatsheetData ) );

        Promise.all( promises )
        .then( function(){
          let argv = arguments[0];

          cheatsheetCode += argv[0];
          modalCodes = argv[1];

          resolve( `<div class="appending-search-result">` + cheatsheetCode + `</div><div class="mobile-show"><br><br><br></div>` + modalCodes );
        } );
      } );
    } );
  }

  function getCheatsheetListCode( searchWordObject, modelValueData ){
    return new Promise( function(resolve, reject){

      console.log( searchWordObject );

      // Search Word Parsing - Start
      let separatedSearchWord = ( searchWordObject.separatedSearchWord )[0];
      let searchWordsWithLevel = searchWordObject.searchWordsWithLevel;

      if( !separatedSearchWord ){
        separatedSearchWord = [];
        if( searchWordsWithLevel.length ){
          separatedSearchWord.push( searchWordsWithLevel[0].word );
        }
      }
      // Search Word Parsing - End


      if( modelValueData && modelValueData.length > 0 ){

        let code = `<hr>`;
        let keywords = '';
        let createdData = ``;

        for( let i=0; i<modelValueData.length; i++ ){

          // Bold Search Word - Start
          let orgSummary = modelValueData[i].summary.replace( /<br>/gi, " " );
          orgSummary = orgSummary.replace( /\n/gi, " " );
          orgSummary = orgSummary.replace( /  /gi, " " );

          for( let j=0; j<separatedSearchWord.length; j++ ){
            orgSummary = orgSummary.split( separatedSearchWord[j] ).join( '<b class="bold">' + separatedSearchWord[j] + '</b>' );
          }
          // Bold Search Word - End

          // Extract Search word contained sentence - Start
          let orgSummaryArray = orgSummary.split( ". " );
          let summary = orgSummary;

          for( let j=0; j<orgSummaryArray.length; j++ ){
            for( let k=0; k<separatedSearchWord.length; k++ ){
              if( ( orgSummaryArray[j] ).indexOf( separatedSearchWord[k] ) > -1 ){
                if( j == 0 ){
                  summary = orgSummaryArray[0] + ". " + orgSummaryArray[1] + ". " + orgSummaryArray[2] + ". " + orgSummaryArray[3] + ". ";
                } else if( j >= orgSummaryArray.length - 4 ){
                  summary = orgSummaryArray[orgSummaryArray.length-4] + ". " + orgSummaryArray[orgSummaryArray.length-3] + ". " + orgSummaryArray[orgSummaryArray.length-2] + ". " + orgSummaryArray[orgSummaryArray.length-1] + ". ";
                } else{
                  summary = orgSummaryArray[j] + ". " + orgSummaryArray[j+1] + ". " + orgSummaryArray[j+2] + ". " + orgSummaryArray[j+3] + ". ";
                }

                j = orgSummaryArray.length;
                break;
              }
            }
          }

          console.log( summary );
          // Extract Search word contained sentence - End



          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            contentRedirectPath = `./topic?contentid=` + modelValueData[i].content_id;
          }

          if( i < modelValueData.length-1 && modelValueData[i].content_id == modelValueData[i+1].content_id ){
            if( keywords.indexOf( modelValueData[i].keywordDisplayName ) > -1 ){
              keywords += modelValueData[i].keywordDisplayName + ", ";
            }
            continue;
          } else{

            if( keywords.length > 0 ){
              keywords += modelValueData[i].keywordDisplayName;
            } else{
              keywords = modelValueData[i].keywordDisplayName;
            }

            code += `<div class="row topic_row">`

            code += `<div class="col-lg-9 col-md-9 col-sm-9 topic_content">`;
            code += `<h4>` + modelValueData[i].title  + `<span style="display:inline-block; width:15px"></span><small>` + modelValueData[i].title + `</small></h4>`
            code += `<a href="` + contentRedirectPath + `">` + contentRedirectPath + `</a>`;
            code += `<p class="topic_content_summary">` + summary + `</p>`;
            code += `<p style="display:none" class="topic_content_summary_hidden">` + summary + `</p>`;
            code += `<p>Keyword <b>` + keywords + `</b><p>`;
            code += `<p>Hit Count <b>` + modelValueData[i].hitCount + `</b> / ` + modelValueData[i].writer + ` / ` + modelValueData[i].createdDate.toISOString().split("T")[0] + `</p>`;
            code += `</div>`;

            code += `<div class="col-lg-3 col-md-3 col-sm-3 topic_thumbnail_img">`;
            code += `<img id="` + modelValueData[i].imageId + `" src="` + modelValueData[i].thumbnailRectangleFileName + `" />`;
            code += `</div>`;

            code += `</div>`;

            code += `<hr>`
            keywords = '';

          }
        }

        console.log( code );

        resolve( code );
      }
    } );
  }

  function getCheatsheetModalCode( modelValueData ){
    return new Promise( function(resolve, reject){
      let modalCodes = '';

      if( modelValueData ){
        for( var i=0; i<modelValueData.length; i++ ){
          let ratio = modelValueData[i].ratio;

          let cheatsheetRedirectPath = '';
          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            cheatsheetRedirectPath = modelValueData[i].topRedirect + `#` + modelValueData[i].id;
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            cheatsheetRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id + `#` + modelValueData[i].id;
            contentRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id;
          }

          modalCodes += `
            <div class="modal modal_cheatsheet modal-center" role="dialog" id="modal_` + modelValueData[i].id + `" >
              <div class="modal-dialog modal-center">
                <div class="modal-content">
                  <div class="modal-content row">
                    <div data-col="6" class="col-lg-6 col-md-6 img_container">
                      <img id="modal_img_` + modelValueData[i].id + `" ratio="` + modelValueData[i].ratio + `" class="cheatsheet_img" src="` + modelValueData[i].savedFileName + `"/>
                    </div>
                    <div data-col="6" class="col-lg-6 col-md-6 info_container">
                      <div class="cheatsheet_info">
                        <!-- <button type="button" class="close cheatsheet_close" data-dismiss="modal">&times;</button> -->

                        <p><b>[Cheat Sheet Info]</b></p>
                        <h4>` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small></h5>
                        <p>` + modelValueData[i].description + `</p>
                        <hr style="border-color:rgba(0,0,0,60)">
                        <p>Hit Count : ` + modelValueData[i].image_hitcount + `</p>
                        <p><a style="font-size: 16px; color:#b2b2b4" href="` + cheatsheetRedirectPath + `">Go To Image</a></p>
                        <hr style="border-color:rgba(0,0,0,60)">

                        <p style="margin-top:35px;"><b>[Discussion Info]</b></p>
                        <h4>` + modelValueData[i].content_title + `<br><small>` + modelValueData[i].content_subtitle + `</small></h5>
                        <p>` + modelValueData[i].content_summary + `</p>
                        <hr style="border-color:rgba(0,0,0,60)">
                        <p>Hit Count : </span>` + modelValueData[i].content_hitcount + `</p>
                        <p><a style="font-size: 16px; color:#b2b2b4" href="` + contentRedirectPath + `">Go To Content</a></p>
                        <hr style="border-color:rgba(0,0,0,60)">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      }

      resolve( modalCodes );
    } );
  }

  function getRemoveDuplicationCheatsheets( cheatsheetData ){
    return new Promise( function(resolve, reject){

      for( let i=0; i<cheatsheetData.length; i++ ){
        for( let j=0; j<cheatsheetData.length; j++ ){

          // if( (cheatsheetData[i].imageId == cheatsheetData[j].imageId && cheatsheetData[i].content_id == cheatsheetData[j].content_id) && i != j ){

          if( (cheatsheetData[i].content_id == cheatsheetData[j].content_id) && i != j ){
            if( cheatsheetData[i].duplicated == 0 && cheatsheetData[j].duplicated == 0 ){
              cheatsheetData[i].duplicated = 0;
              cheatsheetData[j].duplicated = 1;
            }
          }
        }
      }

      cheatsheetData = cheatsheetData.filter( function(e){ return (e.duplicated == 0) } );

      console.log( cheatsheetData );

      resolve( cheatsheetData );
    } );
  }

  this.getCheatsheetCode__ = function( cheatsheetData ){
    return new Promise( function(resolve, reject){

      getRemoveDuplicationCheatsheets( cheatsheetData )
      .then( function( results ){
        cheatsheetData = results;

        if( cheatsheetData.length == 0 ){
          resolve( `<div class="appending-search-result"><H5>No results founded</H5></div>` );
        }


        let cheatsheetCode = "";
        let modalCodes = "";

        if( cheatsheetData.length == 1 ){
          cheatsheetCode += `<H5>Only 1 topic content is founded.</H5>`;
        } else{
          cheatsheetCode += `<H5>Total ` + cheatsheetData.length + ` topic contents are founded.</H5>`;
        }


        let promises = [];

        promises.push( getCheatsheetListCode( cheatsheetData ) );
        promises.push( getCheatsheetModalCode( cheatsheetData ) );

        Promise.all( promises )
        .then( function(){
          let argv = arguments[0];

          cheatsheetCode += argv[0];
          modalCodes = argv[1];

          resolve( `<div class="appending-search-result">` + cheatsheetCode + `</div><div class="mobile-show"><br><br><br></div>` + modalCodes );
        } );
      } );
    } );
  }

  function getCheatsheetListCode__( modelValueData ){
    return new Promise( function(resolve, reject){
      var codes = `<hr>`;

      if( modelValueData ){
        for( var i=0; i<modelValueData.length; i++ ){
          if( i % 3 == 0 ){
            codes += `
              <div class="row search-result-row">`;
          }

          let ranking = i+1;

          let cheatsheetRedirectPath = '';
          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            cheatsheetRedirectPath = modelValueData[i].topRedirect + `#` + modelValueData[i].id;
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            cheatsheetRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id + `#` + modelValueData[i].id;
            contentRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id;
          }



          codes += `
            <div class="col-lg-4 col-md-4 search-result-content">
              <div class="mobile-show">
                <p><b><u>
                  Ranking : ` + ranking + `
                </u></b></p>
              </div>
              <div class="mobile-show tablet-show thumbnail search-result-image">
                <img id="` + modelValueData[i].id + `" ratio="" src="` + modelValueData[i].thumbnailWithRatioFileName + `" />
              </div>
              <div class="mobile-hidden tablet-hidden thumbnail search-result-image">
                <img id="` + modelValueData[i].id + `" ratio="" src="` + modelValueData[i].thumbnailRectangleFileName + `" />
              </div>
              <div class="search-result-text">
                <a style="text-decoration:none;" href="` + cheatsheetRedirectPath + `"><h5 class="mobile-hidden tablet-hidden">` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small>` + `</h5></a>
                <p class="mobile-show tablet-show"><b><u>[Cheat Sheet Info]</u></b></p>
                <a style="text-decoration:none;" href="` + cheatsheetRedirectPath + `"><h5 class="mobile-show tablet-show">` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small>` + `</h5></a>
                <a style="text-decoration:none; color:#5a656f;" " href="` + cheatsheetRedirectPath + `"><p class="mobile-show tablet-show">` + modelValueData[i].description + `</p></a><br>
                <p class="mobile-show tablet-show"><b><u>[Content Discussion Info]</u></b></p>
                <a style="text-decoration:none; color:#5a656f;" href="` + contentRedirectPath + `"><h5 class="mobile-show tablet_show"><b>` + modelValueData[i].content_title + `</b><br><small>` + modelValueData[i].content_subtitle + `</small>` + `</a></h5>
                <span>` + modelValueData[i].writer + `, ` + ( (modelValueData[i].savedDate).toISOString() ).substring( 0, 10 ) + `</span>
              </div>
            </div>
            <hr class="mobile-show">
          `;

          if( i % 3 == 2 || i == 8 ){
            codes += `</div>`;
          }
        }
      }

      resolve( codes );
    } );
  }

  function getCheatsheetModalCode__( modelValueData ){
    return new Promise( function(resolve, reject){
      let modalCodes = '';

      if( modelValueData ){
        for( var i=0; i<modelValueData.length; i++ ){
          let ratio = modelValueData[i].ratio;

          let cheatsheetRedirectPath = '';
          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            cheatsheetRedirectPath = modelValueData[i].topRedirect + `#` + modelValueData[i].id;
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            cheatsheetRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id + `#` + modelValueData[i].id;
            contentRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id;
          }

          modalCodes += `
            <div class="modal modal_cheatsheet modal-center" role="dialog" id="modal_` + modelValueData[i].id + `" >
              <div class="modal-dialog modal-center">
                <div class="modal-content">
                  <div class="modal-content row">
                    <div data-col="6" class="col-lg-6 col-md-6 img_container">
                      <img id="modal_img_` + modelValueData[i].id + `" ratio="` + modelValueData[i].ratio + `" class="cheatsheet_img" src="` + modelValueData[i].savedFileName + `"/>
                    </div>
                    <div data-col="6" class="col-lg-6 col-md-6 info_container">
                      <div class="cheatsheet_info">
                        <!-- <button type="button" class="close cheatsheet_close" data-dismiss="modal">&times;</button> -->

                        <p><b>[Cheat Sheet Info]</b></p>
                        <h4>` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small></h5>
                        <p>` + modelValueData[i].description + `</p>
                        <hr style="border-color:rgba(0,0,0,60)">
                        <p>Hit Count : ` + modelValueData[i].image_hitcount + `</p>
                        <p><a style="font-size: 16px; color:#b2b2b4" href="` + cheatsheetRedirectPath + `">Go To Image</a></p>
                        <hr style="border-color:rgba(0,0,0,60)">

                        <p style="margin-top:35px;"><b>[Discussion Info]</b></p>
                        <h4>` + modelValueData[i].content_title + `<br><small>` + modelValueData[i].content_subtitle + `</small></h5>
                        <p>` + modelValueData[i].content_summary + `</p>
                        <hr style="border-color:rgba(0,0,0,60)">
                        <p>Hit Count : </span>` + modelValueData[i].content_hitcount + `</p>
                        <p><a style="font-size: 16px; color:#b2b2b4" href="` + contentRedirectPath + `">Go To Content</a></p>
                        <hr style="border-color:rgba(0,0,0,60)">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      }

      resolve( modalCodes );
    } );
  }

  function getRemoveDuplicationCheatsheets__( cheatsheetData ){
    return new Promise( function(resolve, reject){

      // console.log( cheatsheetData );

      for( let i=0; i<cheatsheetData.length; i++ ){
        for( let j=0; j<cheatsheetData.length; j++ ){

          if( (cheatsheetData[i].id == cheatsheetData[j].id && cheatsheetData[i].content_id == cheatsheetData[j].content_id) && i != j ){

            if( cheatsheetData[i].duplicated == 0 && cheatsheetData[j].duplicated == 0 ){
              cheatsheetData[i].duplicated = 0;
              cheatsheetData[j].duplicated = 1;
            }
          }
        }
      }

      cheatsheetData = cheatsheetData.filter( function(e){ return (e.duplicated == 0) } );

      resolve( cheatsheetData );
    } );
  }
}
