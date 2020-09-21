/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   hyphenate
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
var E_conf_S_defaults =
{ "Q_hyphenate_C_min_length_before_hyphen": 2
, "Q_hyphenate_C_min_length_after_hyphen": 2
};
//==============================================================================
function Q_page_I_hyphenate( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "document.documentElement.hasAttribute( \"data-ocq\" );"
      , "runAt": "document_start"
      }
    , function( result
      ){  if( result === undefined
          || result[0]
          )
              return;
          chrome.tabs.executeScript( tab_id
          , { "file": "cs.js"
            , "allFrames": true
            , "runAt": "document_start"
            }
          );
      }
    );
}
//==============================================================================
function E_conf_Q_storage_T( k
, v
){  var b;
    switch(k)
    { case "Q_hyphenate_C_min_length_before_hyphen":
      case "Q_hyphenate_C_min_length_after_hyphen":
            b = v >= 2
            break;
    }
    return b;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener( "load"
, function(
  ){  chrome.runtime.onMessage.addListener(
        function( msg
        , sender
        , response
        ){  if( H_ocq_E_sh_lib_Q_conf_I_msg( msg, response ))
                return false;
            switch( msg[0] )
            { case 10:
                    response(
                      [ Q_hyphenate_C_min_length_before_hyphen
                      , Q_hyphenate_C_min_length_after_hyphen
                      ]
                    );
                    break;
            }
            return false;
        }
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  if(( info.url !== undefined
              || info.status === "complete"
              )
            && H_ocq_Q_s_Z_url_T_www( info.url !== undefined ? info.url : tab.url )
            )
                Q_page_I_hyphenate( tab_id );
        }
      );
  }
);
/******************************************************************************/
