/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   local storage
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒4‒28 *
*******************************************************************************/
const Q_interval_S_delta = 400;
//==============================================================================
const Q_tabs_S_opener = {};
const Q_tabs_S_cookie_urls = {};
const Q_tabs_S_cookie_hosts = {};
const Q_tabs_S_cookie_domains = {};
const Q_tabs_S_after_main = {};
const Q_oth_req_S_first_url = [];
const Q_oth_req_S_uid = [];
let Q_oth_req_S_interval;
const Q_oth_req_S_timeout = 4000;
//==============================================================================
function Q_cookie_set_P_clean_url( url
){  chrome.cookies.getAll(
      { "url": url
      }
    , function( cookies
      ){  for( let i = 0; i !== cookies.length; i++ )
          {   const cookie_url = "://"+ ( cookies[i].domain.charAt(0) === "." ? cookies[i].domain.substring(1) : cookies[i].domain ) + cookies[i].path;
              chrome.cookies.remove(
                { "url": "http"+ cookie_url
                , "name": cookies[i].name
                }
              );
              chrome.cookies.remove(
                { "url": "https"+ cookie_url
                , "name": cookies[i].name
                }
              );
              chrome.cookies.remove(
                { "url": "ftp"+ cookie_url
                , "name": cookies[i].name
                }
              );
          }
      }
    );
}
//------------------------------------------------------------------------------
function Q_cookie_set_M( tab_id
, url
){  Q_tabs_S_cookie_urls[ tab_id ] = [];
    Q_tabs_S_cookie_hosts[ tab_id ] = [];
    Q_tabs_S_cookie_domains[ tab_id ] = [];
    Q_tabs_S_after_main[ tab_id ] = false;
    if( url !== undefined )
        Q_cookie_set_I_add( tab_id, url );
}
function Q_cookie_set_I_add( tab_id
, url
, into_main_frame
){  if( into_main_frame === undefined
    || !into_main_frame
    )
    {   for( let i = 0; i !== Q_tabs_S_cookie_urls[ tab_id ].length; i++ )
            if( Q_tabs_S_cookie_urls[ tab_id ][i] === url )
                return;
        Q_tabs_S_cookie_urls[ tab_id ].push(url);
        let s = H_ocq_Q_s_Z_url_R_host(url);
        if( s === "" )
            return;
        let b = false;
        for( let i = 0; i !== Q_tabs_S_cookie_hosts[ tab_id ].length; i++ )
            if( Q_tabs_S_cookie_hosts[ tab_id ][i] === s )
            {   b = true;
                break;
            }
        if( !b )
            Q_tabs_S_cookie_hosts[ tab_id ].push(s);
        s = H_ocq_Q_s_Z_url_Z_host_R_domain(s);
        b = false;
        for( let i = 0; i !== Q_tabs_S_cookie_domains[ tab_id ].length; i++ )
            if( Q_tabs_S_cookie_domains[ tab_id ][i] === s )
            {   b = true;
                break;
            }
        if( !b )
            Q_tabs_S_cookie_domains[ tab_id ].push(s);
    }else
    {   let h;
        for( let i = 0; i !== Q_tabs_S_cookie_urls[ tab_id ].length; i++ )
        {   if( Q_tabs_S_cookie_urls[ tab_id ][i] === "" )
            {   h = i;
                continue;
            }
            if( Q_tabs_S_cookie_urls[ tab_id ][i] === url )
                return;
        }
        if( h === undefined )
            Q_tabs_S_cookie_urls[ tab_id ].push(url);
        else
            Q_tabs_S_cookie_urls[ tab_id ].splice( h, 0, url );
        const s = H_ocq_Q_s_Z_url_R_host(url);
        if( s === "" )
            return;
        h = undefined;
        let b = false;
        for( let i = 0; i !== Q_tabs_S_cookie_hosts[ tab_id ].length; i++ )
        {   if( Q_tabs_S_cookie_hosts[ tab_id ][i] === "" )
            {   h = i;
                continue;
            }
            if( Q_tabs_S_cookie_hosts[ tab_id ][i] === s )
            {   b = true;
                break;
            }
        }
        if( !b )
            if( h === undefined )
                Q_tabs_S_cookie_hosts[ tab_id ].push(s);
            else
                Q_tabs_S_cookie_hosts[ tab_id ].splice( h, 0, s );
    }
}
function Q_cookie_set_W( tab_id
){  for( let i = 0; i !== Q_tabs_S_cookie_urls[ tab_id ].length; i++ )
    {   if( Q_tabs_S_cookie_urls[ tab_id ][i] === "" )
            continue;
        let b = false;
        for( let id in Q_tabs_S_cookie_urls )
        {   if( id == tab_id )
                continue;
            for( let j = 0; j !== Q_tabs_S_cookie_urls[id].length; j++ )
            {   if( Q_tabs_S_cookie_urls[id][j] === "" )
                    break;
                if( Q_tabs_S_cookie_urls[id][j] === Q_tabs_S_cookie_urls[ tab_id ][i] )
                {   b = true; // Czy jest w innej karcie główny ‘url’ taki jak ten z tej karty?
                    break;
                }
            }
            if(b)
                break;
        }
        if(b)
            continue;
        b = false;
        const domain = H_ocq_Q_s_Z_url_R_domain( Q_tabs_S_cookie_urls[ tab_id ][i] );
        for( let id in Q_tabs_S_cookie_domains )
        {   if( id == tab_id )
                 continue;
            if( Q_tabs_S_cookie_domains[id][0] === domain )
            {   b = true; // Czy jest w innej karcie główna ‘domena’ taka jak ta z tej karty?
                break;
            }
        }
        if( !b ) // Usuń wszystkie ciastka dla ‘domeny’.
            Q_cookie_set_P_clean_url( Q_tabs_S_cookie_urls[ tab_id ][i] );
    }
    delete Q_tabs_S_cookie_urls[ tab_id ];
    delete Q_tabs_S_cookie_hosts[ tab_id ];
    delete Q_tabs_S_cookie_domains[ tab_id ];
    delete Q_tabs_S_after_main[ tab_id ];
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_content_script_I_document_load( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
            function( my_var
            ){  if( window[ my_var +"clear" ] !== undefined )
                    return;
                window[ my_var +"clear" ] = true;
                const req = indexedDB.webkitGetDatabaseNames();
                req.addEventListener( "success"
                , function( e
                ){  for( let i = 0; i !== e.target.result.length; i++ )
                        indexedDB.deleteDatabase( e.target.result[i] );
                }
                );
                localStorage.clear();
                sessionStorage.clear();
            }
        +")( "+ JSON.stringify( H_ocq_E_sh_lib_Q_init_R_session_name() )
        +" );"
      , "allFrames": true
      , "runAt": "document_start"
      }
    );
}
function Q_content_script_I_document_load_delay( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
            function( my_var
            , tab_id
            ){  window.addEventListener( "focus", window[ my_var +"focus_func" ] = function( e
                ){  const msg = {};
                    msg.cmd = 1;
                    msg.tab_id = tab_id;
                    chrome.runtime.sendMessage( msg, function( response
                    ){  if( response === false )
                        {   window.removeEventListener( "focus", window[ my_var +"focus_func" ], false );
                            delete window[ my_var +"focus_func" ];
                            location.reload();
                        }
                    });
                }
                , false
                );
            }
        +")( "+ JSON.stringify( H_ocq_E_sh_lib_Q_init_R_session_name() ) +", "+ JSON.stringify( tab_id )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function Q_content_script_I_document_load_delay_check( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
            function( my_var
            ){  if( window[ my_var +"focus_func" ] !== undefined )
                {   const e = {};
                    window[ my_var +"focus_func" ](e);
                }
            }
        +")( "+ JSON.stringify( H_ocq_E_sh_lib_Q_init_R_session_name() )
        +" );"
      }
    );
}
//------------------------------------------------------------------------------
function Q_request_I_main_frame( tab_id
, url
){  if( Q_tabs_S_cookie_domains[ tab_id ] !== undefined )
    {   const domain = H_ocq_Q_s_Z_url_R_domain(url);
        if( Q_tabs_S_cookie_domains[ tab_id ][0] === domain )
        {   let i;
            for( i = 0; i !== Q_tabs_S_cookie_urls[ tab_id ].length; i++ )
                if( Q_tabs_S_cookie_urls[ tab_id ][i] === "" )
                {   i++;
                    break;
                }
            for( ; i !== Q_tabs_S_cookie_urls[ tab_id ].length; i++ )
                if( Q_tabs_S_cookie_domains[ tab_id ][0] !== domain )
                    Q_cookie_set_P_clean_url( Q_tabs_S_cookie_urls[ tab_id ][i] );
            Q_cookie_set_I_add( tab_id, url, true );
            return;
        }
        Q_cookie_set_W( tab_id );
    }
    Q_cookie_set_M( tab_id, url );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_oth_req_I_interval(
){  const now = H_ocq_Q_date_M_now();
    for( let i = 0; i !== Q_oth_req_S_first_url.length; i++ )
        for( let j = 0; j !== Q_oth_req_S_first_url[i][1].length; j++ )
            if( Q_oth_req_S_first_url[i][1][j][1] <= now )
                if( Q_oth_req_S_first_url[i][1].length > 1 )
                    Q_oth_req_S_first_url[i][1].splice( j--, 1 );
                else
                {   Q_oth_req_S_first_url.splice( i--, 1 );
                    break;
                }
    for( let i = 0; i !== Q_oth_req_S_uid.length; i++ )
        if( Q_oth_req_S_uid[i][1] <= now )
            Q_oth_req_S_uid.splice( i--, 1 );
    if( !Q_oth_req_S_first_url.length
    && !Q_oth_req_S_uid.length
    )
    {   window.clearInterval( Q_oth_req_S_interval );
        Q_oth_req_S_interval = undefined;
    }
}
window.addEventListener( "load"
, function(
  ){  //NDFN Nie zawsze usuwa bazy danych.
      chrome.browsingData.remove( {}
      , { "cookies": true
        , "fileSystems": true
        , "indexedDB": true
        , "localStorage": true
        , "serverBoundCertificates": true
        , "pluginData": true
        , "webSQL": true
        }
      , function(
        ){  init_end;
        }
      );
      chrome.tabs.query( {}
      , function( tabs
        ){  for( let i = 0; i !== tabs.length; i++ )
            {   if( tabs[i].url === undefined )
                    continue;
                const url = H_ocq_Q_url_M( tabs[i].url );
                if( !H_ocq_Q_url_T_www(url) )
                    continue;
                Q_cookie_set_M( tabs[i].id, H_ocq_Q_s_Z_url_R_without_query( H_ocq_Q_url_R(url) ));
                Q_tabs_S_cookie_urls[ tabs[i].id ].push( "" );
                Q_tabs_S_cookie_hosts[ tabs[i].id ].push( "" );
                Q_tabs_S_after_main[ tabs[i].id ] = true;
            }
            init_end;
        }
      );
      chrome.webRequest.onBeforeRequest.addListener(
        function( details
        ){  const url = H_ocq_Q_s_Z_url_I_normalize( details.url );
            const host = H_ocq_Q_s_Z_url_R_host(url);
            if( host === ""
            || host === "p.p"
            || host === "config.privoxy.org"
            )
                return {};
            const domain = H_ocq_Q_s_Z_url_Z_host_R_domain(host);
            if( details.tabId !== -1 )
            {   if( Q_tabs_S_cookie_domains[ details.tabId ] === undefined )
                {   if( Q_tabs_S_opener[ details.tabId ] !== undefined
                    && details.type === "main_frame"
                    && domain === Q_tabs_S_cookie_domains[ Q_tabs_S_opener[ details.tabId ]][0]
                    )
                    {   Q_cookie_set_M( details.tabId, url );
                        return {}; //zezwolenie na pobranie pierwszego głównego ‘urla’ z referencji otwartej karty: z otwartej witryny można otworzyć cokolwiek w nowej karcie.
                    }
                }else if( domain === Q_tabs_S_cookie_domains[ details.tabId ][0] )
                {   if( details.type === "main_frame" )
                        Q_cookie_set_I_add( details.tabId, url, true );
                    return {}; //zezwolenie na pobranie ‘urla’ z głównej domeny tej karty.
                }
                if( details.type === "main_frame" )
                    for( let id in Q_tabs_S_cookie_hosts )
                    {   if( id == details.tabId )
                            continue;
                        for( let i = 0; i !== Q_tabs_S_cookie_hosts[id].length; i++ )
                        {   if( Q_tabs_S_cookie_hosts[id][i] === "" )
                                break;
                            if( Q_tabs_S_cookie_hosts[id][i] === host )
                            {   Q_request_I_main_frame( details.tabId, url );
                                return {}; //zezwolenie na pobranie głownego ‘urla’ z głównym ‘hostem’ w którejś karcie.
                            }
                        }
                    }
            }else if( details.type === "other" )
            {   for( let i = 0; i !== Q_oth_req_S_uid.length; i++ )
                    if( Q_oth_req_S_uid[i][0] === details.requestId )
                    {   Q_oth_req_S_uid[i][1] = H_ocq_Q_date_M_now() + Q_oth_req_S_timeout;
                        return {}; //zezwolenie na kolejne ‘urle’ zarejestrowanego, nie blokowanego żądania “chrome.downloads”.
                    }
                for( let i = 0; i !== Q_oth_req_S_first_url.length; i++ )
                    if( Q_oth_req_S_first_url[i][0] === url )
                        return {}; //delegowanie decyzji o blokowaniu żądań “chrome.downloads” do procedury nagłówków ‘http’ przed wysłaniem żądania ‘http’.
            }
            for( let id in Q_tabs_S_cookie_domains )
            {   if( id == details.tabId )
                    continue;
                for( let i = 0; i !== Q_tabs_S_cookie_domains[id].length; i++ )
                    if( Q_tabs_S_cookie_domains[id][i] === domain )
                    {   if( details.type === "main_frame"
                        && Q_tabs_S_cookie_urls[ details.tabId ] !== undefined
                        )
                            Q_cookie_set_W( details.tabId );
                        return { "cancel": true }; //zablokowanie ‘urla’ z domeną w którejś karcie.
                    }
            }
            if( details.type === "main_frame" )
                Q_request_I_main_frame( details.tabId, url );
            return {};
        }
      , { "urls":
          [ "file://*"
          , "http://*/*"
          , "https://*/*"
          , "ftp://*/*"
          ]
        }
      , [ "blocking" ]
      );
      chrome.webRequest.onBeforeSendHeaders.addListener(
        function( details
        ){  for( let i = 0; i !== Q_oth_req_S_first_url.length; i++ )
                if( Q_oth_req_S_first_url[i][0] === H_ocq_Q_s_Z_url_I_normalize( details.url ))
                {   if( details.requestHeaders !== undefined )
                        for( let j = 0; j !== details.requestHeaders.length; j++ )
                            if( details.requestHeaders[j].name === H_ocq_E_sh_lib_Q_init_R_session_name() )
                            {   for( let k = 0; k !== Q_oth_req_S_first_url[i][1].length; k++ )
                                    if( details.requestHeaders[j].value === Q_oth_req_S_first_url[i][1][k][0] )
                                    {   if( Q_oth_req_S_first_url[i][1].length > 1 )
                                            Q_oth_req_S_first_url[i][1].splice( k, 1 );
                                        else
                                            Q_oth_req_S_first_url.splice( i, 1 );
                                        Q_oth_req_S_uid.push( [ details.requestId, H_ocq_Q_date_M_now() + Q_oth_req_S_timeout ] );
                                        details.requestHeaders.splice( j, 1 );
                                        return { "requestHeaders": details.requestHeaders };
                                    }
                                return { "cancel": true };
                            }
                }
            return {};
        }
      , { "urls":
          [ "file://*"
          , "http://*/*"
          , "https://*/*"
          , "ftp://*/*"
          ]
        , "types": [ "other" ]
        , "tabId": -1
        }
      , [ "blocking"
        , "requestHeaders"
        ]
      );
      chrome.webRequest.onHeadersReceived.addListener(
        function( details
        ){  if( details.tabId === -1 )
                return {};
            if( details.type === "main_frame"
            || details.type === "sub_frame"
            )
                Q_content_script_I_document_load( details.tabId );
            if( details.type !== "main_frame" )
            {   if( !Q_tabs_S_after_main[ details.tabId ] )
                {   Q_tabs_S_cookie_urls[ details.tabId ].push( "" );
                    Q_tabs_S_cookie_hosts[ details.tabId ].push( "" );
                    Q_tabs_S_after_main[ details.tabId ] = true;
                }
                Q_cookie_set_I_add( details.tabId, H_ocq_Q_s_Z_url_I_normalize( details.url ));
            }
            return {};
        }
      , { "urls":
          [ "file://*"
          , "http://*/*"
          , "https://*/*"
          , "ftp://*/*"
          ]
        }
      , [ "blocking" ]
      );
      chrome.tabs.onCreated.addListener(
        function( tab
        ){  if( tab.openerTabId !== undefined )
                Q_tabs_S_opener[ tab.id ] = tab.openerTabId;
        }
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  if( info.url === undefined
            || !H_ocq_Q_s_Z_url_T_www( info.url )
            )
                return;
            Q_content_script_I_document_load( tab_id );
            Q_request_I_main_frame( tab_id, H_ocq_Q_s_Z_url_R_without_query( info.url ));
            let b = false;
            for( let id in Q_tabs_S_cookie_domains )
            {   if( id == tab_id )
                    continue;
                for( let i = 0; i !== Q_tabs_S_cookie_domains[ tab_id ].length; i++ )
                    if( Q_tabs_S_cookie_domains[id][i] === Q_tabs_S_cookie_domains[ tab_id ][0] )
                    {   b = true;
                        break;
                    }
                if(b)
                    break;
            }
            if(b)
                Q_content_script_I_document_load_delay( tab_id );
        }
      );
      chrome.tabs.onRemoved.addListener(
        function( tab_id
        , info
        ){  delete Q_tabs_S_opener[ tab_id ];
            if( Q_tabs_S_cookie_urls[ tab_id ] !== undefined )
                Q_cookie_set_W( tab_id );
            for( id in Q_tabs_S_cookie_urls )
                Q_content_script_I_document_load_delay_check( Number(id) );
        }
      );
      chrome.runtime.onMessage.addListener(
        function( message
        , sender
        , response
        ){  if( message.cmd !== 1 )
                return false;
            for( let tab_id in Q_tabs_S_cookie_domains )
            {   if( tab_id == message.tab_id )
                    continue;
                for( let i = 0; i !== Q_tabs_S_cookie_domains[ tab_id ].length; i++ )
                    if( Q_tabs_S_cookie_domains[ tab_id ][i] === Q_tabs_S_cookie_domains[ message.tab_id ][0] )
                    {   response(true);
                        return false;
                    }
            }
            response(false);
            return false;
        }
      );
      chrome.runtime.onMessageExternal.addListener(
        function( message
        , sender
        , response
        ){  const now = H_ocq_Q_date_M_now();
            const req_header =
            [ now.toString()
            , now + Q_oth_req_S_timeout
            ];
            if( Q_oth_req_S_interval === undefined )
                Q_oth_req_S_interval = window.setInterval( Q_oth_req_I_interval, Q_oth_req_S_timeout + Q_interval_S_delta );
            for( let i = 0; i !== Q_oth_req_S_first_url.length; i++ )
                if( Q_oth_req_S_first_url[i][0] === message )
                {   Q_oth_req_S_first_url[i][1].push( req_header )
                    response( [ H_ocq_E_sh_lib_Q_init_R_session_name(), req_header[0] ] );
                    return false;
                }
            Q_oth_req_S_first_url.push(
              [ message
              , [ req_header ]
              ]
            );
            response( [ H_ocq_E_sh_lib_Q_init_R_session_name(), req_header[0] ] );
            return false;
        }
      );
  }
);
/******************************************************************************/
