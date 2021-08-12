/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   alternative history database
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒2‒26 *
*******************************************************************************/
const H_ocq_E_request_S_pending = {};
let H_ocq_Q_database_S_readonly = false;
let H_ocq_Q_database_S_queue = {};
let H_ocq_Q_database_S_queue_next_time = 0;
let H_ocq_Q_database_S_timeout;
//==============================================================================
function H_ocq_Q_database_P( k
, v
){  if( k !== undefined )
        H_ocq_Q_database_S_queue[k] = v;
    else if( H_ocq_Q_object_Z_hash_table_T_empty( H_ocq_Q_database_S_queue ))
        return;
    if( !H_ocq_Q_database_S_readonly
    && H_ocq_Q_date_M_now() > H_ocq_Q_database_S_queue_next_time
    )
    {   H_ocq_Q_database_S_readonly = true;
        const o = H_ocq_Q_database_S_queue;
        H_ocq_Q_database_S_queue = {};
        if( H_ocq_Q_database_S_timeout !== undefined )
        {   window.clearTimeout( H_ocq_Q_database_S_timeout );
            H_ocq_Q_database_S_timeout = undefined;
        }
        chrome.storage.local.set( o
        , function(
          ){  H_ocq_Q_database_S_queue_next_time = H_ocq_Q_date_M_now() + H_ocq_E_date_I_u_delta( 1, 1 );
              H_ocq_Q_database_S_readonly = false;
          }
        );
    }else if( H_ocq_Q_database_S_timeout === undefined )
        H_ocq_Q_database_S_timeout = window.setTimeout( H_ocq_Q_database_P, 1000 );
}
//==============================================================================
window[ "E_conf_S_defaults" ] =
{ "Q_purge_C_interval": 100
, "Q_purge_C_next_time": 0
, "Q_purge_C_idle_delay": 150
, "Q_list_C_idle_period": 5
, "Q_list_C_last_count": 10
};
//==============================================================================
function E_conf_Q_storage_T( k
, v
){  let b;
    switch(k)
    { case "Q_purge_C_interval": ///dni
            b = v >= 1;
            break;
      case "Q_purge_C_next_time": ///milisekundy (data)
            b = v >= 1;
            break;
      case "Q_purge_C_idle_delay": ///sekundy
            b = v >= 15;
            break;
      case "Q_list_C_idle_period": ///godziny
            b = v >= 1;
            break;
      case "Q_list_C_last_count": ///liczba elementów
            b = v >= 1;
            break;
    }
    return b;
}
function E_conf_Q_storage_R_conv( k
, v
){  v = H_ocq_Q_number_N_int(v);
    switch(k)
    { case "Q_purge_C_interval":
            v *= H_ocq_E_date_I_u_delta( 4, 1 );
            break;
      case "Q_list_C_idle_period":
            v *= H_ocq_E_date_I_u_delta( 3, 1 );
            break;
    }
    return v;
}
function E_conf_Q_storage_P_conv( k
, v
){  switch(k)
    { case "Q_purge_C_interval":
            v /= H_ocq_E_date_I_u_delta( 4, 1 );
            break;
      case "Q_list_C_idle_period":
            v /= H_ocq_E_date_I_u_delta( 3, 1 );
            break;
    }
    return v;
}
function Q_conf_X( o
){  for( let k in o )
        switch(k)
        { case "Q_purge_C_idle_delay":
                chrome.idle.setDetectionInterval( o[k] );
                break;
        }
}
//------------------------------------------------------------------------------
window.addEventListener( "load"
, function(
  ){  chrome.storage.sync.get( //OLET masowe usunięcie starych nazw z początkowych wersji rozszerzenia.
        [ "E_idle_S_delay"
        , "E_idle_S_purge_interval"
        , "E_idle_S_purge_time"
        , "E_list_S_last_active_idle_period"
        ]
      , function( o
        ){  const o_conv =
            { "E_idle_S_delay": "Q_purge_C_idle_delay"
            , "E_idle_S_purge_interval": "Q_purge_C_interval"
            , "E_idle_S_purge_time": "Q_purge_C_next_time"
            , "E_list_S_last_active_idle_period": "Q_list_C_idle_period"
            }
            if( !H_ocq_Q_object_Z_hash_table_T_empty(o) )
            {   for( let k in o_conv )
                {   chrome.storage.sync.remove(k);
                    if( o[k] !== undefined )
                    {   o[ o_conv[k] ] = o[k];
                        delete o[k];
                    }
                    window[ o_conv[k] ] = E_conf_Q_storage_R_conv( o_conv[k], o[k] );
                }
                chrome.storage.sync.set(o);
            }
            init_end;
        }
      );
      chrome.tabs.onRemoved.addListener(
        function( tab_id
        , info
        ){  delete H_ocq_E_request_S_pending[ tab_id ];
        }
      );
      chrome.webRequest.onErrorOccurred.addListener(
        function( details
        ){  if( H_ocq_E_request_S_pending[ details.tabId ] === undefined )
                return;
            //if( H_ocq_E_request_S_pending[ details.tabId ] === null )
                //alert( "onErrorOccurred" );
            const t = H_ocq_Q_date_M_now().toString();
            const url = H_ocq_Q_s_Z_url_I_normalize( details.url );
            if( H_ocq_E_request_S_pending[ details.tabId ] === url )
                H_ocq_Q_database_P( t, url );
            else
                H_ocq_Q_database_P( t, [ url, H_ocq_E_request_S_pending[ details.tabId ] ] );
            H_ocq_E_request_S_pending[ details.tabId ] = null;
        }
      , { "urls":
          [ "file://*"
          , "http://*/*"
          , "https://*/*"
          , "ftp://*/*"
          ]
        , "types": [ "main_frame" ]
        }
      );
      ///‘urle’ zakończonej realizacji żądania dla przeglądarki ‘www’.
      chrome.webRequest.onCompleted.addListener(
        function( details
        ){  if( H_ocq_E_request_S_pending[ details.tabId ] === undefined )
                return;
            const t = H_ocq_Q_date_M_now().toString();
            const url = H_ocq_Q_s_Z_url_I_normalize( details.url );
            if( H_ocq_E_request_S_pending[ details.tabId ] === null
            || H_ocq_E_request_S_pending[ details.tabId ] === url
            )
                H_ocq_Q_database_P( t, url );
            else
                H_ocq_Q_database_P( t, [ url, H_ocq_E_request_S_pending[ details.tabId ] ] );
            H_ocq_E_request_S_pending[ details.tabId ] = null;
        }
      , { "urls":
          [ "file://*"
          , "http://*/*"
          , "https://*/*"
          , "ftp://*/*"
          ]
        , "types": [ "main_frame" ]
        }
      );
      ///‘urle’ początkowo zażądane do nawigacji w przeglądarce ‘www’.
      chrome.webRequest.onBeforeRequest.addListener(
        function( details
        ){  if( details.tabId == -1
            || ( H_ocq_E_request_S_pending[ details.tabId ] !== undefined
              && H_ocq_E_request_S_pending[ details.tabId ] !== null
            ))
                return;
            H_ocq_E_request_S_pending[ details.tabId ] = H_ocq_Q_s_Z_url_I_normalize( details.url );
        }
      , { "urls":
          [ "file://*"
          , "http://*/*"
          , "https://*/*"
          , "ftp://*/*"
          ]
        , "types": [ "main_frame" ]
        }
      );
      ///uzupełnianie o ‘urle’ ładowane z pamięci własnej przeglądarki ‘www’.
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  if( info.url !== undefined
            && H_ocq_E_request_S_pending[ tab_id ] === undefined
            ) ///jeśli nie było ani w “webRequest”, ani w “loading” (tutaj).
            {   if( info.url === null )
                    alert( "onUpdated" );
                H_ocq_E_request_S_pending[ tab_id ] = H_ocq_Q_s_Z_url_I_normalize( info.url );
            }
            if( info.status === "complete"
            && H_ocq_E_request_S_pending[ tab_id ] !== undefined
            ) ///jeśli było w “webRequest” lub w “loading”.
            {   if( H_ocq_E_request_S_pending[ tab_id ] !== null ) ///nie było w “webRequest” (tylko w “loading”).
                {   const t = H_ocq_Q_date_M_now().toString();
                    const url = H_ocq_Q_s_Z_url_I_normalize( tab.url );
                    if( H_ocq_E_request_S_pending[ tab_id ] === url )
                        H_ocq_Q_database_P( t, url );
                    else
                        H_ocq_Q_database_P( t, [ url, H_ocq_E_request_S_pending[ tab_id ] ] );
                }
                delete H_ocq_E_request_S_pending[ tab_id ];
            }
        }
      );
      chrome.idle.onStateChanged.addListener(
        function( state
        ){  if(( state !== "idle"
            && state !== "locked"
            ) || H_ocq_Q_database_S_readonly
            )
                return;
            if( H_ocq_Q_date_M_now() < Q_purge_C_next_time )
                return;
            H_ocq_Q_database_S_readonly = true;
            chrome.storage.local.get( null
            , function( items
              ){  const rm_keys = [];
                  for( let k in items )
                  {   if( parseInt(k) > Q_purge_C_next_time )
                          break;
                      rm_keys.push(k);
                  }
                  chrome.storage.local.remove( rm_keys
                  , function(
                    ){  Q_purge_C_next_time = H_ocq_Q_date_M_now() + Q_purge_C_interval;
                        const o = {};
                        o[ "Q_purge_C_next_time" ] = Q_purge_C_next_time;
                        H_ocq_E_sh_lib_Q_conf_I_save( H_ocq_E_sh_lib_Q_conf_I_msg_P_conv(o) );
                        H_ocq_Q_database_S_readonly = false;
                    }
                  );
              }
            );
        }
      );
  }
);
/******************************************************************************/
