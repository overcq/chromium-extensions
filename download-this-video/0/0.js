/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   download This Video
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒4‒28 *
*******************************************************************************/
const Q_navigated_S_data = {};
//==============================================================================
function E_cda_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              window[ "H_ocq_S_interval" ] = window.setInterval(
                function(
                ){  const es = document.getElementsByClassName( "pb-video-player" );
                    if( !es.length )
                        return;
                    const url = es[0].getAttribute( "src" );
                    if( url === null )
                        return;
                    const o =
                    { "type": "cda.pl"
                    , "elem":
                      { "title": H_ocq_E_html_Q_element_R_text( document.getElementById( "naglowek" ))
                      , "stream": url
                      }
                    };
                    chrome.runtime.sendMessage(
                      [ 13
                      , H_ocq_Q_object_R_encode_undefined(o)
                      ]
                    );
                }
              , H_ocq_E_flow_S_interval
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined", "H_ocq_E_flow_S_interval", "H_ocq_E_html_Q_element_R_text" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_cnn_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              const es = document.getElementsByClassName( "media__video--responsive" );
              if( !es.length )
                  return;
              const o =
              { "type": "cnn.com"
              , "elem": []
              };
              for( let i = 0; i !== es.length; i++ )
              {   const video_id = es[i].getAttribute( "data-video-id" );
                  const req = new XMLHttpRequest();
                  req.open( "GET", location.protocol +"//"+ location.host +"/video/data/3.0/video/"+  video_id +"/index.xml?xml=true", false );
                  req.send(null);
                  if( req.status !== 200 )
                      return;
                  const d = req.responseXML;
                  let es_ = d.getElementsByTagName( "headline" );
                  if( !es_.length )
                      return;
                  const title = es_[0].firstChild.nodeValue;
                  es_ = d.getElementsByTagName( "description" );
                  if( !es_.length )
                      return;
                  const desc = es_[0].firstChild.nodeValue;
                  es_ = d.getElementsByTagName( "files" );
                  if( !es_.length )
                      return;
                  es_ = es_[0].getElementsByTagName( "file" );
                  if( !es_.length )
                      return;
                  const url = H_ocq_Q_url_M( d.getElementById( "AkamaiHDN1" ).getElementsByTagName( "file" )[0].firstChild.nodeValue );
                  const url_0 = url[ "protocol" ] +"://"+ url[ "host" ] +"/cnn/big";
                  const a = {};
                  for( let j = 0; j !== es_.length; j++ )
                  {   const fmt = es_[j].getAttribute( "bitrate" );
                      if( fmt === null )
                          continue;
                      const url = es_[j].firstChild.nodeValue;
                      if( !( url.endsWith( ".flv" )
                      || url.endsWith( ".mp4" )
                      ))
                          continue;
                      a[fmt] = url_0 + url;
                  }
                  o[ "elem" ].push(
                    { "title": title
                    , "desc": desc
                    , "streams": a
                    }
                  );
              }
              chrome.runtime.sendMessage(
                [ 13
                , H_ocq_Q_object_R_encode_undefined(o)
                ]
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined", "H_ocq_Q_url_M" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_onet_pl_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              window[ "H_ocq_S_interval" ] = window.setInterval(
                function(
                ){  const es = document.getElementsByTagName( "iframe" );
                    if( !es.length )
                        return;
                    const o =
                    { "type": "onet.pl"
                    , "elem": []
                    };
                    for( let i = 0; i !== es.length; i++ )
                    {   const s = es[i].getAttribute( "src" );
                        if( s === null )
                            continue;
                        if( !/\bpulsembed\.eu\//.test(s) )
                            continue;
                        if( window[ "H_ocq_S_interval" ] !== undefined )
                        {   window.clearInterval( window[ "H_ocq_S_interval" ] );
                            delete window[ "H_ocq_S_interval" ];
                        }
                        let req = new XMLHttpRequest();
                        req.open( "GET", s, false );
                        req.send(null);
                        if( req.status !== 200 )
                            return;
                        const a_ = req.responseText.match( / data-mvp="([0-9]+\.[0-9]+)"/ );
                        if( a_ === null )
                            return;
                        const mvp_id = a_[1];
                        req = new XMLHttpRequest();
                        req.open( "GET", "http://qi.ckm.onetapi.pl/?body%5Bid%5D="+ mvp_id +"&body%5Bjsonrpc%5D=2.0&body%5Bmethod%5D=get_asset_detail&body%5Bparams%5D%5BID_Publikacji%5D="+ mvp_id +"&body%5Bparams%5D%5BService%5D=onet.onet.pl&content-type=application%2Fjsonp&x-onet-app=player.front.onetapi.pl&callback=", false );
                        req.send(null);
                        if( req.status !== 200 )
                            return;
                        let d;
                        try
                        {   d = JSON.parse( req.responseText );
                        }catch(e)
                        {   return;
                        }
                        d = d[ "result" ];
                        if( d === undefined )
                            return;
                        d = d[ "0" ];
                        if( d === undefined )
                            return;
                        const a = {};
                        for( let k in d[ "formats" ][ "wideo" ] )
                            if( k !== "ism"
                            && k !== "mpd"
                            )
                                for( let j = 0; j !== d[ "formats" ][ "wideo" ][k].length; j++ )
                                {   const fmt = k +" "+ d[ "formats" ][ "wideo" ][k][j][ "vertical_resolution" ];
                                    a[fmt] =
                                    { "audio_bitrate": d[ "formats" ][ "wideo" ][k][j][ "audio_bitrate" ]
                                    , "video_bitrate": d[ "formats" ][ "wideo" ][k][j][ "video_bitrate" ]
                                    };
                                    const req = new XMLHttpRequest();
                                    req.open( "GET", d[ "formats" ][ "wideo" ][k][j][ "url" ] +"?sessionId="+ d[ "meta" ][ "image" ].substring( 0, 32 ).toUpperCase() +"&type=df-html5&format=json", false );
                                    req.send(null);
                                    if( req.status !== 200 )
                                        return;
                                    let d_;
                                    try
                                    {   d_ = JSON.parse( req.responseText );
                                    }catch(e)
                                    {   return;
                                    }
                                    d_ = d_[ "result" ];
                                    if( d_ === undefined )
                                        return;
                                    a[fmt][ "url" ] = d_[ "media_url" ];
                                }
                        o[ "elem" ].push(
                          { "author": d[ "license" ][ "source" ][ "name" ]
                          , "title": d[ "meta" ][ "title" ]
                          , "desc": d[ "meta" ][ "description" ]
                          , "streams": a
                          }
                        );
                        break;
                    }
                    if( o[ "elem" ].length )
                        chrome.runtime.sendMessage(
                          [ 13
                          , H_ocq_Q_object_R_encode_undefined(o)
                          ]
                        );
                }
              , H_ocq_E_flow_S_interval
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined", "H_ocq_E_flow_S_interval" )
        +" );"
      , "allFrames": true
      , "runAt": "document_end"
      }
    );
}
function E_onet_tv_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              window[ "H_ocq_S_interval" ] = window.setInterval(
                function(
                ){  const es = document.getElementsByClassName( "mvp" );
                    if( !es.length )
                        return;
                    window.clearInterval( window[ "H_ocq_S_interval" ] );
                    const o =
                    { "type": "onet.tv"
                    , "elem": []
                    };
                    for( let i = 0; i !== es.length; i++ )
                    {   const s = es[i].id;
                        if( s === null )
                            continue;
                        const a_ = s.match( /^mvp:([0-9]+\.[0-9]+)$/ );
                        if( a_ === null )
                            continue;
                        const mvp_id = a_[1];
                        const req = new XMLHttpRequest();
                        req.open( "GET", "http://qi.ckm.onetapi.pl/?body%5Bid%5D="+ mvp_id +"&body%5Bjsonrpc%5D=2.0&body%5Bmethod%5D=get_asset_detail&body%5Bparams%5D%5BID_Publikacji%5D="+ mvp_id +"&body%5Bparams%5D%5BService%5D=onet.onet.pl&content-type=application%2Fjsonp&x-onet-app=player.front.onetapi.pl&callback=", false );
                        req.send(null);
                        if( req.status !== 200 )
                            return;
                        let d;
                        try
                        {   d = JSON.parse( req.responseText );
                        }catch(e)
                        {   return;
                        }
                        d = d[ "result" ];
                        if( d === undefined )
                            return;
                        d = d[ "0" ];
                        if( d === undefined )
                            return;
                        const a = {};
                        for( let k in d[ "formats" ][ "wideo" ] )
                            if( k !== "ism"
                            && k !== "mpd"
                            )
                                for( let j = 0; j !== d[ "formats" ][ "wideo" ][k].length; j++ )
                                {   const fmt = k +" "+ d[ "formats" ][ "wideo" ][k][j][ "vertical_resolution" ];
                                    a[fmt] =
                                    { "audio_bitrate": d[ "formats" ][ "wideo" ][k][j][ "audio_bitrate" ]
                                    , "video_bitrate": d[ "formats" ][ "wideo" ][k][j][ "video_bitrate" ]
                                    };
                                    const req = new XMLHttpRequest();
                                    req.open( "GET", d[ "formats" ][ "wideo" ][k][j][ "url" ] +"?sessionId="+ d[ "meta" ][ "image" ].substring( 0, 32 ).toUpperCase() +"&type=df-html5&format=json", false );
                                    req.send(null);
                                    if( req.status !== 200 )
                                        return;
                                    let d_;
                                    try
                                    {   d_ = JSON.parse( req.responseText );
                                    }catch(e)
                                    {   return;
                                    }
                                    d_ = d_[ "result" ];
                                    if( d_ === undefined )
                                        return;
                                    a[fmt][ "url" ] = d_[ "media_url" ];
                                }
                        o[ "elem" ].push(
                          { "author": d[ "license" ][ "source" ][ "name" ]
                          , "title": d[ "meta" ][ "title" ]
                          , "desc": d[ "meta" ][ "description" ]
                          , "streams": a
                          }
                        );
                    }
                    chrome.runtime.sendMessage(
                      [ 13
                      , H_ocq_Q_object_R_encode_undefined(o)
                      ]
                    );
                }
              , H_ocq_E_flow_S_interval
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined", "H_ocq_E_flow_S_interval" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_tvn24_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              const es = document.getElementsByClassName( "videoPlayer" );
              if( !es.length )
                  return;
              const s = es[0].getAttribute( "data-quality" );
              if( s === undefined )
                  return;
              const o =
              { "type": "tvn24.pl"
              , "title": es[0].getAttribute( "data-video-id" )
              , "streams": JSON.parse(s)
              };
              chrome.runtime.sendMessage(
                [ 13
                , H_ocq_Q_object_R_encode_undefined(o)
                ]
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_vimeo_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              let config_url;
              const es = document.getElementsByTagName( "script" );
              for( let i = 0; i < es.length; i++ )
              {   if( es[i].hasAttribute( "src" ))
                      continue;
                  const a = es[i].firstChild.nodeValue.match( /"config_url":("[^"]+")/ );
                  if( a === null )
                      continue;
                  config_url = JSON.parse( a[1] );
              }
              const req = new XMLHttpRequest();
              req.open( "GET", config_url, false );
              req.send(null);
              if( req.status !== 200 )
                  return;
              let d_;
              try
              {   d_ = JSON.parse( req.responseText );
              }catch(e)
              {   return;
              }
              d = d_[ "request" ];
              if( d === undefined )
                  return;
              d = d[ "files" ];
              if( d === undefined )
                  return;
              d = d[ "progressive" ];
              if( d === undefined )
                  return;
              const a = {};
              for( let i = 0; i !== d.length; i++ )
                  a[ d[i][ "quality" ] +" "+ d[i][ "mime" ] ] = d[i][ "url" ];
              const o =
              { "type": "vimeo.com"
              , "author": d_[ "video" ][ "owner" ][ "name" ]
              , "title": d_[ "video" ][ "title" ].replace( /^[^-]+ - /, "" )
              , "streams": a
              };
              chrome.runtime.sendMessage(
                [ 13
                , H_ocq_Q_object_R_encode_undefined(o)
                ]
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_wp_pl_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              window[ "H_ocq_S_interval" ] = window.setInterval(
                function(
                ){  const mid = [];
                    const es = document.getElementsByClassName( "wp-player" );
                    if( !es.length )
                        return;
                    for( let i = 0; i !== es.length; i++ )
                    {   const es_ = es[i].getElementsByClassName( "title" );
                        if( !es_.length )
                            continue;
                        const s = es_[0].getAttribute( "href" );
                        if( s === null )
                            continue
                        const a = s.match( /,mid,([0-9]+)/ );
                        if( a === null )
                            continue;
                        mid.push( a[1] );
                    }
                    if( mid[0] === null
                    && mid.length === 1
                    )
                        return;
                    window.clearInterval( window[ "H_ocq_S_interval" ] );
                    const o =
                    { "type": "wp.pl"
                    , "elem": []
                    };
                    for( let mid_i = 0; mid_i !== mid.length; mid_i++ )
                    {   if( mid[ mid_i ] === null )
                        {   o[ "elem" ].push(null);
                            continue;
                        }
                        const req = new XMLHttpRequest();
                        req.open( "GET", "http://wp.tv/player/mid,"+ mid[ mid_i ] +",embed.json", false );
                        req.send(null);
                        if( req.status !== 200 )
                            return;
                        let d;
                        try
                        {   d = JSON.parse( req.responseText );
                        }catch(e)
                        {   return;
                        }
                        d = d[ "clip" ];
                        if( d === undefined )
                            return;
                        let a = {};
                        let i;
                        if( d[ "url" ].length )
                        {   for( i = 0; i !== d[ "url" ].length; i++ )
                                a[ d[ "url" ][i][ "quality" ] +" "+ d[ "url" ][i][ "type" ] ] = location.protocol + d[ "url" ][i][ "url" ];
                        }else
                        {   const req = new XMLHttpRequest();
                            req.open( "GET", "http://wp.tv/player/related.json?domain="+ encodeURIComponent( location.hostname ) +"&mid="+ mid[ mid_i ] +"&type=video", false );
                            req.send(null);
                            if( req.status !== 200 )
                                return;
                            let d;
                            try
                            {   d = JSON.parse( req.responseText );
                            }catch(e)
                            {   return;
                            }
                            d = d[ "related" ];
                            if( d === undefined )
                                return;
                            a = {};
                            let i;
                            for( i = 0; i !== d.length; i++ )
                                if( d[i][ "mid" ] == mid[ mid_i ] )
                                {   for( let j = 0; j !== d[i][ "url" ].length; j++ )
                                        a[ d[i][ "url" ][j][ "quality" ] +" "+ d[i][ "url" ][j][ "type" ] ] = location.protocol + d[i][ "url" ][j][ "url" ];
                                    break;
                                }
                            if( i === d.length )
                                return;
                            d = d[i];
                        }
                        o[ "elem" ].push(
                          { "author": d[ "mediaSource" ]
                          , "title": d[ "title" ]
                          , "desc": d[ "description" ]
                          , "streams": a
                          }
                        );
                    }
                    chrome.runtime.sendMessage(
                      [ 13
                      , H_ocq_Q_object_R_encode_undefined(o)
                      ]
                    );
                }
              , H_ocq_E_flow_S_interval
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined", "H_ocq_E_flow_S_interval" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_wp_tv_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function(
          ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              const a_ = location.pathname.match( /,mid,([0-9]+)/ );
              if( a_ === null )
                  return;
              const mid = a_[1];
              const req = new XMLHttpRequest();
              req.open( "GET", "http://wp.tv/player/mid,"+ mid +",embed.json", false );
              req.send(null);
              if( req.status !== 200 )
                  return;
              let d;
              try
              {   d = JSON.parse( req.responseText );
              }catch(e)
              {   return;
              }
              d = d[ "clip" ];
              if( d === undefined )
                  return;
              let a = {};
              let i;
              if( d[ "url" ].length )
              {   for( i = 0; i !== d[ "url" ].length; i++ )
                      a[ d[ "url" ][i][ "quality" ] +" "+ d[ "url" ][i][ "type" ] ] = location.protocol + d[ "url" ][i][ "url" ];
              }else
              {   const req = new XMLHttpRequest();
                  req.open( "GET", "http://wp.tv/player/related.json?domain="+ encodeURIComponent( location.hostname ) +"&mid="+ mid +"&type=video", false );
                  req.send(null);
                  if( req.status !== 200 )
                      return;
                  let d;
                  try
                  {   d = JSON.parse( req.responseText );
                  }catch(e)
                  {   return;
                  }
                  d = d[ "related" ];
                  if( d === undefined )
                      return;
                  a = {};
                  let i;
                  for( i = 0; i !== d.length; i++ )
                      if( d[i][ "mid" ] == mid )
                      {   for( let j = 0; j !== d[i][ "url" ].length; j++ )
                              a[ d[i][ "url" ][j][ "quality" ] +" "+ d[i][ "url" ][j][ "type" ] ] = location.protocol + d[i][ "url" ][j][ "url" ];
                          break;
                      }
                  if( i === d.length )
                      return;
                  d = d[i];
              }
              const o =
              { "type": "wp.tv"
              , "author": d[ "source" ]
              , "title": d[ "title" ]
              , "desc": d[ "description" ]
              , "streams": a
              };
              chrome.runtime.sendMessage(
                [ 13
                , H_ocq_Q_object_R_encode_undefined(o)
                ]
              );
          }
        +")( "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
function E_youtube_Q_document_I_script( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "("+
          function( my_var
          ){  if( window[ my_var +"int" ] !== undefined )
                  return;
              eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
              window[ my_var +"int" ] = window.setInterval(
                function(
                ){  if( window[ "ytplayer" ] === undefined
                    && document.getElementById( "movie_player" ) === null
                    )
                        return;
                    let p = location.search.indexOf( "?v=" );
                    if( p === -1 )
                    {   p = location.search.indexOf( "&v=" );
                        if( p === -1 )
                            return;
                    }
                    let uid = location.search.substring( p + 3 );
                    p = uid.indexOf( "&" );
                    if( p !== -1 )
                        uid = uid.substring( 0, p );
                    if( uid === window[ my_var +"uid" ] )
                        return;
                    let e = document.createElement( "script" );
                    e.appendChild( document.createTextNode( "("+
                        function( my_var
                        ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
                            const e = document.createElement( "pre" );
                            e.style.display = "none";
                            let y;
                            if( window[ "ytplayer" ] !== undefined )
                                y = window[ "ytplayer" ];
                            else
                            {   y = { "config": { "args": {} }};
                                const es = document.getElementById( "movie_player" ).getElementsByTagName( "param" );
                                for( let i = 0; i !== es.length; i++ )
                                    if( es[i].getAttribute( "name" ) === "flashvars" )
                                    {   const a = es[i].getAttribute( "value" ).split( /&/ );
                                        for( let i = 0; i !== a.length; i++ )
                                        {   const p = a[i].indexOf( "=" );
                                            y[ "config" ][ "args" ][ a[i].substring( 0, p ) ] = decodeURIComponent( a[i].substring( p + 1 ));
                                        }
                                        break;
                                    }
                            }
                            const a = {};
                            a[ "js" ] = y[ "bootstrapWebPlayerContextConfig" ][ "jsUrl" ];
                            a[ "uid" ] = y[ "config" ][ "args" ][ "video_id" ];
                            a[ "title" ] = y[ "config" ][ "args" ][ "title" ].replace( /\++/g, " " );
                            const y_res = y[ "config" ][ "args" ][ "raw_player_response" ];
                            a[ "streams" ] = [];
                            a[ "streams" ][0] = y_res[ "streamingData" ][ "adaptiveFormats" ];
                            a[ "streams" ][1] = y_res[ "streamingData" ][ "formats" ];
                            if( y[ "config" ][ "args" ][ "ttsurl" ] !== undefined )
                                a[ "subtitle" ] = y[ "config" ][ "args" ][ "ttsurl" ] + "&type=track&lang=pl&name&kind&fmt=1";
                            const cpn_0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
                            let cpn = "";
                            for( let i = 0; i !== 16; i++ )
                                cpn += cpn_0.charAt( Math.floor( Math.random() * cpn_0.length ));
                            a[ "cpn" ] = cpn;
                            e.appendChild( document.createTextNode( JSON.stringify( H_ocq_Q_object_R_encode_undefined(a) )));
                            document.body.appendChild(e);
                        }
                      +")( "+ JSON.stringify( my_var )
                      +", "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( "H_ocq_Q_object_R_encode_undefined" )
                      +" )();"
                    ));
                    document.body.appendChild(e);
                    document.body.removeChild(e);
                    e = document.body.childNodes[ document.body.childNodes.length - 1 ]
                    const a = H_ocq_Q_object_R_decode_undefined( JSON.parse( e.firstChild.nodeValue ));
                    document.body.removeChild(e);
                    a[ "type" ] = "youtube.com";
                    window[ my_var +"uid" ] = a[ "uid" ];
                    const es = document.getElementsByClassName( "ytd-channel-name" );
                    if( es.length )
                        a[ "author" ] = es[0].firstElementChild.firstElementChild.firstElementChild.firstChild.nodeValue.replace( /­/g, "" );
                    const req = new XMLHttpRequest();
                    req.open( "GET", location.protocol + a[ "js" ] );
                    delete a[ "js" ];
                    req.addEventListener( "readystatechange", () =>
                      {   if( req.readyState !== 4
                          || req.status !== 200
                          )
                              return;
                          const re_identifier = "[_A-Za-z$][_0-9A-Za-z$]*";
                          let m = req.responseText.match( "=("+ re_identifier +")\\(decodeURIComponent\\("+ re_identifier +"\\)\\),"+ re_identifier +"\\.set\\("+ re_identifier +",encodeURIComponent\\(" );
                          let re = new RegExp( "\\b"+ m[1].replace( /\$/g, "\\$" ) +"=function\\(a\\)\\{([^{}]*)\\}", "" );
                          m = req.responseText.match(re);
                          if( m !== null )
                          {   a[ "Q_ytplayer_S_signature" ] = [];
                              const a_ = m[1].split( ";" );
                              const t = {};
                              for( let i = 1; i !== a_.length; i++ )
                              {   if(( m = a_[i].match( "\\b"+ re_identifier +"\\.("+ re_identifier +")\\("+ re_identifier +",([0-9]+)\\)$" )) !== null )
                                  {   m.shift();
                                      if( t[ m[0] ] === undefined )
                                      {   re = new RegExp( "\\b"+ m[0].replace( /\$/g, "\\$" ) +":function\\("+ re_identifier +"(?:,"+ re_identifier +")*\\)\\{"+ re_identifier +"\.(reverse|splice)\\([^)]*\\)\\}", "" );
                                          let m_;
                                          if(( m_ = req.responseText.match(re) ) !== null )
                                          {   m_.shift();
                                              m[0] = t[ m[0] ] = m_[0];
                                              const v = m.pop();
                                              if( m[0] === "splice" )
                                              {   m.push(0);
                                                  m.push( parseInt(v) );
                                              }
                                          }else
                                              m = parseInt( m[1] );
                                      }else
                                      {   m[0] = t[ m[0] ];
                                          const v = m.pop();
                                          if( m[0] === "splice" )
                                          {   m.push(0);
                                              m.push( parseInt(v) );
                                          }
                                      }
                                      a[ "Q_ytplayer_S_signature" ].push(m);
                                      continue;
                                  }
                                  if( /^return a\.join\(""\)$/.test( a_[i] ))
                                      break;
                                  a[ "Q_ytplayer_S_signature" ] = undefined;
                                  //TODO dodać ograniczone ilościowo raportowanie.
                                  break;
                              }
                          }
                          chrome.runtime.sendMessage(
                            [ 13
                            , H_ocq_Q_object_R_encode_undefined(a)
                            ]
                          );
                      }
                    );
                    req.send(null);
                }
              , H_ocq_E_flow_S_interval
              );
          }
        +")( "+ JSON.stringify( H_ocq_E_sh_lib_Q_init_R_session_name() )
        +", "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_object_R_encode_undefined", "H_ocq_Q_object_R_decode_undefined", "H_ocq_E_flow_S_interval" )
        +" );"
      , "runAt": "document_start"
      }
    );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener( "load"
, function(
  ){  chrome.tabs.query( {}
      , function( tabs
        ){  for( let i = 0; i !== tabs.length; i++ )
            {   const url = H_ocq_Q_url_M( tabs[i].url );
                if( !H_ocq_Q_url_T_www(url)
                || url[ "host" ] === undefined
                )
                    continue;
                const domain = H_ocq_Q_s_Z_url_Z_host_R_domain( url[ "host" ] );
                if( domain === "cda.pl" )
                    E_cda_Q_document_I_script( tabs[i].id );
                else if( domain === "cnn.com" )
                    E_cnn_Q_document_I_script( tabs[i].id );
                else if( domain === "onet.pl"
                || domain === "fakt.pl"
                )
                    E_onet_pl_Q_document_I_script( tabs[i].id );
                else if( domain === "onet.tv" )
                    E_onet_tv_Q_document_I_script( tabs[i].id );
                else if( domain === "vimeo.com" )
                    E_vimeo_Q_document_I_script( tabs[i].id );
                else if( domain === "tvn24.pl" )
                    E_tvn24_Q_document_I_script( tabs[i].id );
                else if( domain === "wp.pl" )
                    E_wp_pl_Q_document_I_script( tabs[i].id );
                else if( domain === "wp.tv" )
                    E_wp_tv_Q_document_I_script( tabs[i].id );
                else if(( url[ "host" ] === "www.youtube.com"
                  || url[ "host" ] === "youtube.com"
                )
                && url[ "path" ] === "/watch"
                && url[ "server_query" ] !== undefined
                )
                    E_youtube_Q_document_I_script( tabs[i].id );
            }
            init_end;
        }
      );
      chrome.runtime.onMessage.addListener(
        function( msg
        , sender
        , response
        ){  if( H_ocq_E_sh_lib_Q_conf_I_msg( msg, response ))
                return false;
            switch( msg[0] )
            { case 10:
                    if( Q_navigated_S_data[ sender.tab.id ][ "dload" ] !== undefined
                    && Q_navigated_S_data[ sender.tab.id ][ "dload" ]
                    )
                        break;
                    const req =
                    { "url": msg[1][ "url" ]
                    , "method": "POST"
                    , "filename": msg[1][ "filename" ]
                    , "conflictAction": "prompt"
                    , "saveAs": true
                    };
                    Q_navigated_S_data[ sender.tab.id ][ "dload" ] = true;
                    chrome.downloads.download( req
                    , function( id
                      ){  if( id === undefined )
                              alert( chrome.runtime.lastError.message );
                          Q_navigated_S_data[ sender.tab.id ][ "dload" ] = false;
                      }
                    );
                    break;
              case 13:
                    chrome.pageAction.show( sender.tab.id );
              case 11:
                    Q_navigated_S_data[ sender.tab.id ] = {};
                    msg = H_ocq_Q_object_R_decode_undefined(msg);
                    for( let k in msg[1] )
                        Q_navigated_S_data[ sender.tab.id ][k] = msg[1][k];
                    break;
              case 12:
                    response( H_ocq_Q_object_R_encode_undefined( Q_navigated_S_data[ msg[1][ "tab_id" ]] ));
                    break;
            }
            return false;
        }
      );
      chrome.webRequest.onBeforeRequest.addListener(
        function( details
        ){  if( details.tabId === -1 )
                return {};
            return { "cancel": true };
        }
      , { "urls":
          [ "http://s.youtube.com/*"
          , "https://s.youtube.com/*"
          , "http://*.google.com/generate_*"
          , "https://*.google.com/generate_*"
          , "http://*.googlevideo.com/generate_*"
          , "https://*.googlevideo.com/generate_*"
          , "http://*.youtube.com/gen_*"
          , "https://*.youtube.com/gen_*"
          , "http://*.youtube.com/generate_*"
          , "https://*.youtube.com/generate_*"
          , "http://*.youtube.com/player_*"
          , "https://*.youtube.com/player_*"
          , "http://*.youtube.com/api/stats/*"
          , "https://*.youtube.com/api/stats/*"
          , "http://*.youtube.com/ptracking"
          , "https://*.youtube.com/ptracking"
          ]
        , "types":
          [ "script"
          , "image"
          , "xmlhttprequest"
          ]
        }
      , [ "blocking" ]
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  if( info.status !== "complete" )
                return;
            const url = H_ocq_Q_url_M( tab.url );
            if( !H_ocq_Q_url_T_www(url)
            || url[ "host" ] === undefined
            )
                return;
            const domain = H_ocq_Q_s_Z_url_Z_host_R_domain( url[ "host" ] );
            if( domain === "cda.pl" )
                E_cda_Q_document_I_script( tab.id );
            else if( domain === "cnn.com" )
                E_cnn_Q_document_I_script( tab.id );
            else if( domain === "onet.pl"
            || domain === "fakt.pl"
            )
                E_onet_pl_Q_document_I_script( tab.id );
            else if( domain === "onet.tv" )
                E_onet_tv_Q_document_I_script( tab.id );
            else if( domain === "tvn24.pl" )
                E_tvn24_Q_document_I_script( tab.id );
            else if( domain === "vimeo.com" )
                E_vimeo_Q_document_I_script( tab.id );
            else if( domain === "wp.pl" )
                E_wp_pl_Q_document_I_script( tab.id );
            else if( domain === "wp.tv" )
                E_wp_tv_Q_document_I_script( tab.id );
            else if(( url[ "host" ] === "www.youtube.com"
              || url[ "host" ] === "youtube.com"
            )
            && url[ "path" ] === "/watch"
            && url[ "server_query" ] !== undefined
            )
                E_youtube_Q_document_I_script( tab.id );
            else
            {   chrome.pageAction.hide( tab.id );
                if( Q_navigated_S_data[ tab.id ] !== undefined )
                    delete Q_navigated_S_data[ tab.id ];
            }
        }
      );
      chrome.tabs.onRemoved.addListener(
        function( tab_id
        , info
        ){  if( Q_navigated_S_data[ tab_id ] !== undefined )
                delete Q_navigated_S_data[ tab_id ];
        }
      );
  }
);
/******************************************************************************/
