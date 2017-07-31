exports.menuGenerator = function(){

  this.createMenuList = function( menuList, reqPath ){
    return new Promise( function(resolve, reject){
      var innerMenuCodes = "";
      var innerTitleCodes = "";
      var innerRightMenuCodes = "";

      // Top Menu
      if( menuList ){
        for( var i=0; i<menuList.length; i++ ){
          var id = menuList[i].id;
          var name = menuList[i].name;
          var displayName = menuList[i].displayName;
          var redirectPath = menuList[i].redirectPath;

          if( menuList[i].level == 0 ){
            if( reqPath.indexOf(redirectPath) > -1 ){
              innerMenuCodes += `<li class="active"><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li>`;
            } else{
              innerMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li>`;
            }
          } else if( menuList[i].level == -1 ){
            // innerTitleCodes += `<a class="mobile-hidden navbar-brand" href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a>`;
            // innerTitleCodes += `<a class="mobile-show glyphicon glyphicon-home navbar-brand" href="` + redirectPath + `" id="` + id + `" name="` + name + `"></a>`;
            innerTitleCodes += `<a class="navbar-brand" href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a>`;
          } else if( menuList[i].level == -2 ){
            innerRightMenuCodes += `<li ><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li>`;
          }
        }
      }

      resolve( { "innerMenuCodes" : innerMenuCodes, "innerTitleCodes" : innerTitleCodes, "innerRightMenuCodes" : innerRightMenuCodes } );
    } );
  }

  this.createSubMenuList = function( subMenuList, specificMenuList, reqPath, contentType ){
    return new Promise( function(resolve, reject){
      var innerSubMenuCodes = "";

      // Sub Side Nav
      for( var i=0; i<subMenuList.length; i++ ){
        var id = subMenuList[i].id;
        var name = subMenuList[i].name;
        var displayName = subMenuList[i].displayName;
        var redirectPath = subMenuList[i].redirectPath;

        if( contentType ){
          innerSubMenuCodes += `<li class="content-header"><a href="` + redirectPath + `" id="` + id + `" name="` + name + `" class="active">` + displayName + `</a>`;
        } else{
          innerSubMenuCodes += `<li class="menu-header"><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a>`;
        }

        var specificMenuCodes = `<ul class="sub-side-nav affix">`;
        for( var j=0; j<specificMenuList.length; j++ ){
          if( id == specificMenuList[j].parent ){

            var subId = specificMenuList[j].id;
            var subName = specificMenuList[j].name;
            var subDisplayName = specificMenuList[j].displayName;
            var subRedirectPath = specificMenuList[j].redirectPath;

            specificMenuCodes += `<li><a href="` + subRedirectPath + `" id="` + subId + `" name="` + subName + `">` + subDisplayName + `</a></li>`;
          }
        }
        specificMenuCodes += `</ul>`;

        if( specificMenuCodes != `<ul class="sub-side-nav affix"></ul>` ){
          innerSubMenuCodes += specificMenuCodes;
        }

        innerSubMenuCodes += `</li>`;

      }

      resolve( innerSubMenuCodes );
    } );
  }

  this.createSideMenu = function( mainSideMenuList, contentSideMenuList ){
    return new Promise( function(resolve, reject){
      var innerSubMenuCodes = "";
      var specificMenuCodes = "";

      if( contentSideMenuList.length > 0 ){
        for( var i=0; i<contentSideMenuList.length; i++ ){
          var id = contentSideMenuList[i].id;
          var name = contentSideMenuList[i].name;
          var displayName = contentSideMenuList[i].displayName;
          var redirectPath = contentSideMenuList[i].redirectPath;
          var nodeName = contentSideMenuList[i].nodeName;

          if( nodeName == "H3" ){
            innerSubMenuCodes += `<li class="menu-header"><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a> \n`;
            specificMenuCodes = "";
          } else if( nodeName == "H4" ){
            specificMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li> \n`;

            if( i == contentSideMenuList.length - 1 || contentSideMenuList[i+1].nodeName == "H3" ){
              specificMenuCodes = `<ul class="sub-side-nav affix">` + specificMenuCodes +  `</ul>`;
              innerSubMenuCodes += specificMenuCodes;
            }
          }

          if( i == contentSideMenuList.length-1 || contentSideMenuList[i+1].nodeName != "H4" ){
            innerSubMenuCodes += `</li> \n`;
          }
        }
      }

      if( mainSideMenuList && mainSideMenuList.length > 0 ){

        if( contentSideMenuList.length > 0 ){
          innerSubMenuCodes += `<hr> \n`;
        }

        for( var i=0; i<mainSideMenuList.length; i++ ){
          var id = mainSideMenuList[i].id;
          var name = mainSideMenuList[i].name;
          var displayName = mainSideMenuList[i].displayName;
          var redirectPath = mainSideMenuList[i].redirectPath;
          var nodeName = mainSideMenuList[i].nodeName;

          if( contentSideMenuList.length > 0 ){
            redirectPath = "./discussion" + redirectPath;
          }

          if( nodeName == "H3" ){
            innerSubMenuCodes += `<li class="menu-header"><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a> \n`;
            specificMenuCodes = "";
          } else if( nodeName == "H4" ){
            specificMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li> \n`;

            if( i == mainSideMenuList.length - 1 || mainSideMenuList[i+1].nodeName == "H3" ){
              specificMenuCodes = `<ul class="sub-side-nav affix">` + specificMenuCodes +  `</ul>`;
              innerSubMenuCodes += specificMenuCodes;
            }
          }

          if( i == mainSideMenuList.length-1 || mainSideMenuList[i+1].nodeName != "H4" ){
            innerSubMenuCodes += `</li> \n`;
          }
        }
      }

      resolve( innerSubMenuCodes );
    } );
  }

  this.createSideManuCollapsed = function( mainSideMenuList, contentSideMenuList, menuList, reqPath ){
    return new Promise( function(resolve, reject){
      var innerSubMenuCodes = "";
      var specificMenuCodes = "";

      if( contentSideMenuList.length > 0 ){
        for( var i=0; i<contentSideMenuList.length; i++ ){
          var id = contentSideMenuList[i].id;
          var name = contentSideMenuList[i].name;
          var displayName = contentSideMenuList[i].displayName;
          var redirectPath = contentSideMenuList[i].redirectPath;
          var nodeName = contentSideMenuList[i].nodeName;

          if( nodeName == "H3" ){
            innerSubMenuCodes += `<li class="collapsed-menu-header"><a href="` + redirectPath + `" id="` + id + `_collapsed` + `" name="` + name + `">` + displayName + `</a> \n`;
            specificMenuCodes = "";
          } else if( nodeName == "H4" ){
            specificMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `_collapsed` + `" name="` + name + `">` + displayName + `</a></li> \n`;

            if( i == contentSideMenuList.length - 1 || contentSideMenuList[i+1].nodeName == "H3" ){
              specificMenuCodes = `<ul>` + specificMenuCodes +  `</ul>`;
              innerSubMenuCodes += specificMenuCodes;
            }
          }

          if( i == contentSideMenuList.length-1 || contentSideMenuList[i+1].nodeName != "H4" ){
            innerSubMenuCodes += `</li> \n`;
          }
        }
      }

      if( mainSideMenuList && mainSideMenuList.length > 0 ){

        if( contentSideMenuList.length > 0 ){
          innerSubMenuCodes += `</ul><hr class="nav-divider"><ul class="nav navbar-nav top-nav"><p class="navbar-text">[ ` + getTopMenu(menuList, reqPath) + ` ]</p> \n`;
        }

        for( var i=0; i<mainSideMenuList.length; i++ ){
          var id = mainSideMenuList[i].id;
          var name = mainSideMenuList[i].name;
          var displayName = mainSideMenuList[i].displayName;
          var redirectPath = mainSideMenuList[i].redirectPath;
          var nodeName = mainSideMenuList[i].nodeName;

          if( contentSideMenuList.length > 0 ){
            redirectPath = "./discussion" + redirectPath;
          }

          if( nodeName == "H3" ){
            innerSubMenuCodes += `<li class="collapsed-menu-header"><a href="` + redirectPath + `" id="` + id + `_collapsed` + `" name="` + name + `">` + displayName + `</a> \n`;
            specificMenuCodes = "";
          } else if( nodeName == "H4" ){
            specificMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `_collapsed` + `" name="` + name + `">` + displayName + `</a></li> \n`;

            if( i == mainSideMenuList.length - 1 || mainSideMenuList[i+1].nodeName == "H3" ){
              specificMenuCodes = `<ul>` + specificMenuCodes +  `</ul>`;
              innerSubMenuCodes += specificMenuCodes;
            }
          }

          if( i == mainSideMenuList.length-1 || mainSideMenuList[i+1].nodeName != "H4" ){
            innerSubMenuCodes += `</li> \n`;
          }
        }
      }

      resolve( innerSubMenuCodes );
    } );
  }

  this.createMenuDescription = function( menuDescription, reqPath ){
    return new Promise( function(resolve, reject){

      if( menuDescription.length ){
        var innerMenuDescriptionCode = "";

        // Sub Side Nav Description
        innerMenuDescriptionCode += `<h3>` + menuDescription[0].displayName + `</h3><p class="doc-description-content">` + menuDescription[0].description + `</p>`;

        resolve( innerMenuDescriptionCode );
      } else{
        resolve( "" );
      }
    } );
  }

  this.createKeywordList = function( keywordList ){
    return new Promise( function(resolve, reject){
      var innerKeywordList = [];
      var subIndex = 0;

      if( keywordList ){
        for( var i=0; i<keywordList.length; i++ ){
          if( keywordList[i].level == 0 ){

            subIndex = i + 1;
            if( subIndex == keywordList.length ){
              break;
            }

            var children = [];

            while( subIndex < keywordList.length && keywordList[subIndex].level == 1 ){
              children.push( {"text" : keywordList[subIndex].displayName, "id" : keywordList[subIndex].id, "name" : keywordList[subIndex].name} );
              subIndex++;
            }

            innerKeywordList.push( {"text" : keywordList[i].displayName, "id" : keywordList[i].id, "name" : keywordList[i].name, "nodes" : children} );
            i = subIndex - 1;
          }
        }
      }

      resolve( innerKeywordList );
    } );
  }
}

function getTopMenu( menuList, reqPath ){
  if( menuList ){
    for( var i=0; i<menuList.length; i++ ){
      var redirectPath = menuList[i].redirectPath;

      if( menuList[i].level == 0 ){
        if( reqPath.indexOf(redirectPath) > -1 ){
          return menuList[i].displayName;
        }
      }
    }
  }
  return "";
}
