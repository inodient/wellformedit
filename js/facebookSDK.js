  window.fbAsyncInit = function() {
    FB.init({
      appId            : '1910794212495192',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
    // FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      $("#id_menu_0045").text( "Logout" );
    } else {
      $("#id_menu_0045").text( "Login" );
    }
  }

  function callFBLogin(){
    FB.getLoginStatus( function(response){
      if (response.status === 'connected') {
        FB.logout( function(response){
          confirm( "Are you sure want to log out?" );
          $("#id_menu_0045").text( "Login" );
        } );
      } else {
        FB.login( function(response){
          $("#id_menu_0045").text( "Logout" );
        } );
      }

      if( $(location).attr("pathname") == "/" ){
        location.reload();
      }
    } );
  }

  $(document).ready( function(){
    // checkLoginState();
  } );