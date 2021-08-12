/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  deprecated standalone injection
*  ¦/C+¦  ‟chromium” extension
*   ---   pr0nSusPICiErr
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2016‒4‒13 o
*******************************************************************************/
function Q_page_I_insert_cs( tab_id
){  if( document.documentElement.hasAttribute( "data-ocq" ))
        return;
    chrome.tabs.insertCSS( tab_id
    , { "file": "cs.css"
      , "runAt": "document_start"
      }
    );
    chrome.tabs.executeScript( tab_id
    , { "file": "cs.js"
      , "runAt": "document_start"
      }
    );
}
//==============================================================================
window.addEventListener( "load"
, function(
  ){  chrome.tabs.query( {}
      , function( tabs
        ){  for( let i = 0; i !== tabs.length; i++ )
                if( H_ocq_Q_s_Z_url_T_www( tabs[i].url ))
                    Q_page_I_insert_cs( tabs[i].id );
            init_end;
        }
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  if( info.url !== undefined
            && H_ocq_Q_s_Z_url_T_www( info.url )
            )
                Q_page_I_insert_cs( tab_id );
        }
      );
  }
);
/******************************************************************************/
