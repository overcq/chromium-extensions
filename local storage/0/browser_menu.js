/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦Inc¦  ‟chromium” extension
*   ---   local storage
*         browser menu page
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒4‒28 *
*******************************************************************************/
document.addEventListener( "DOMContentLoaded"
, function(
  ){  chrome.cookies.getAllCookieStores(
        function( stores
        ){  for( var i = 0; i !== stores.length; i++ )
            {   chrome.cookies.getAll(
                  { "storeId": stores[i].id
                  }
                , function( cookies
                  ){  var tbody = document.getElementsByTagName( "tbody" )[0];
                      for( var j = 0; j !== cookies.length; j++ )
                      {   var tr = document.createElement( "tr" );
                          var as = [ "storeId", "hostOnly", "httpOnly", "secure", "domain", "path", "session", "expiration", "name", "value" ];
                          for( var k = 0; k !== as.length; k++ )
                          {   var td = document.createElement( "td" );
                              td.appendChild( document.createTextNode( cookies[j][ as[k] ] ));
                              tr.appendChild(td);
                          }
                          tbody.appendChild(tr);
                      }
                  }
                );
            }
            init_end;
        }
      );
  }
);
/******************************************************************************/
