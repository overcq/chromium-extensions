/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦Inc¦  ‟chromium” extension
*   ---   recently closed
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
var E_conf_S_defaults =
{ "C_max_count": 20
};
var Q_url_S_a = [];
var Q_url_S_removed = [];
//==============================================================================
function E_conf_Q_storage_T( k
, v
){  var b;
    switch(k)
    { case "C_max_count":
            b = v === H_ocq_Q_number_N_int(v)
            && v >= 0
            && v <= 50;
            break;
    }
    return b;
}
function Q_url_M( tab_id
, url
){  chrome.tabs.executeScript( tab_id
    , { "code": "document.title;"
      }
    , (function( url
      ){ return function( result
         ){  var o =
             { "title": result !== undefined ? result[0] : "[no title]"
             , "url": url
             };
             Q_url_S_a[ tab_id ] = o;
             if( result !== undefined )
                 for( var i = 0; i !== Q_url_S_removed.length; i++ )
                     if( Q_url_S_removed[i][ "title" ] === "[no title]"
                     && Q_url_S_removed[i][ "url" ] === Q_url_S_a[ tab_id ][ "url" ]
                     )
                         Q_url_S_removed[0][ "title" ] = Q_url_S_a[ tab_id ][ "title" ];
         }
      })(url)
    );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
chrome.runtime.onMessage.addListener(
  function( msg
  , sender
  , response
  ){  if( H_ocq_E_sh_lib_Q_conf_I_msg( msg, response ))
          return false;
      if( msg[0] === 10 )
          response( H_ocq_Q_object_R_encode_undefined( Q_url_S_removed ));
      else if( msg[0] === 11 )
      {   Q_url_S_removed.splice( msg[1], 1 );
          chrome.browserAction.setBadgeText(
            { "text": Q_url_S_removed.length ? ""+ Q_url_S_removed.length : ""
            }
          );
      }
      return false;
  }
);
window.addEventListener( "load"
, function(
  ){  chrome.browserAction.setBadgeText(
        { "text": ""
        }
      );
      chrome.browserAction.setBadgeBackgroundColor(
        { 'color': [ 122, 122, 127, 255 ]
        }
      );
      chrome.tabs.query( {}
      , function( tabs
        ){  for( var i = 0; i !== tabs.length; i++ )
                Q_url_M( tabs[i].id, tabs[i].url );
            init_end;
        }
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  var url;
            if( info.status === "complete" ) //WA bo kasuje ‘badge’.
                url = info.url !== undefined ? info.url : tab.url;
            else if( info.url !== undefined )
                url = info.url;
            else
                return;
            Q_url_M( tab_id, H_ocq_Q_s_Z_url_I_normalize(url) );
        }
      );
      chrome.tabs.onRemoved.addListener(
        function( tab_id
        , info
        ){  if(( !Q_url_S_removed.length || Q_url_S_removed[0][ "url" ] !== Q_url_S_a[ tab_id ][ "url" ] )
            && Q_url_S_a[ tab_id ][ "url" ] !== "chrome://newtab/"
            ){  Q_url_S_removed.unshift( Q_url_S_a[ tab_id ] );
                if( Q_url_S_removed.length === C_max_count )
                    Q_url_S_removed.pop();
                else
                    chrome.browserAction.setBadgeText(
                      { "text": ""+ Q_url_S_removed.length
                      }
                    );
            }
            delete Q_url_S_a[ tab_id ];
        }
      );
  }
);
/******************************************************************************/
