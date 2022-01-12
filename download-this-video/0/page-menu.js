/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   download This Video
*         page menu scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒4‒28 *
*******************************************************************************/
function Q_doc_P_ex_th( a
){  const d = document.createDocumentFragment();
    for( let i = 0; i !== a.length; i++ )
    {   const e = document.createElement( "TH" );
        e.appendChild( document.createTextNode( a[i] ));
        d.appendChild(e);
    }
    const row = Q_tab_R_e(0).getElementsByTagName( "THEAD" )[0].getElementsByTagName( "TR" )[0];
    row.insertBefore( d, row.getElementsByTagName( "TH" )[1] );
}
function Q_doc_P_n_tabs( n
){  if( n === 1 )
        return;
    const e = document.body.getElementsByTagName( "INPUT" )[0];
    e.setAttribute( "max", n );
    e.addEventListener( "input"
    , function( ev
      ){  ev.stopPropagation();
          const es = document.body.getElementsByClassName( "tab" );
          for( let i = 0; i !== es.length; i++ )
              Q_tab_R_e(i).setAttribute( "hidden", "" );
          Q_tab_R_e( ev.target.value - 1 ).removeAttribute( "hidden" );
      }
    );
    e.parentNode.removeAttribute( "hidden" );
    const datalist = document.getElementById( "video_title_datalist" );
    let div = Q_tab_R_e(0);
    const parent = div.parentNode;
    for( let i = 1; i !== n; i++ )
    {   const e = document.createElement( "OPTION" );
        e.setAttribute( "value", i + 1 );
        datalist.appendChild(e);
        div = div.cloneNode(true);
        div.id = "tab_"+ i;
        div.setAttribute( "hidden", "" );
        parent.appendChild(div);
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_tab_R_e( i
){  return document.getElementById( "tab_"+ i );
}
function Q_tab_P_title( i
, s
, title
){  if( typeof i !== "number" )
    {   title = s;
        s = i;
        i = 0;
    }
    const e = Q_tab_R_e(i).getElementsByTagName( "H1" )[0];
    if( title !== undefined )
        e.setAttribute( "title", title );
    e.appendChild( document.createTextNode(s) );
}
//==============================================================================
function Q_ytplayer_R_signature_I_1( a
, i
){  const v = a[ i % a.length ];
	a[i] = a[0];
	a[0] = v;
	return a;
}
function Q_ytplayer_R_signature( func_a
, signature
){  let a = signature.split( "" );
    if( func_a !== undefined )
        for( let i = 0; i !== func_a.length; i++ )
            if( typeof func_a[i] === "number" )
                a = Q_ytplayer_R_signature_I_1( a, func_a[i] );
            else
                a[ func_a[i][0] ].apply( a, func_a[i].slice(1) );
    return a.join( "" );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_gui_Q_link_I_dload( e
){  e.stopPropagation();
    e.preventDefault();
    let file_ext;
    switch( window[ "H_ocq_E_dload_tv_S_type" ] )
    { default:
        {   let s = e.target.href;
            const p = s.indexOf( "?" );
            if( p !== -1 )
                s = s.substring( 0, p );
            file_ext = s.substring( s.lastIndexOf( "." ) + 1 );
            break;
        }
      case "cda.pl":
            file_ext = "mp4";
            break;
      case "youtube.com":
            file_ext = e.target.parentNode.parentNode.getElementsByTagName( "TD" )[4].firstChild.nodeValue.split( / /, 1 )[0];
            switch( file_ext )
            { case "audio/mp4":
                    file_ext = "mpa";
                    break;
              case "video/mp4":
                    file_ext = "mpv";
                    break;
              default:
                    file_ext = file_ext.split( /\//, 2 )[1].split( /-/ );
                    if( file_ext.length > 1 )
                        file_ext = file_ext[ file_ext.length - 1 ];
                    break;
            }
            break;
    }
    chrome.runtime.sendMessage(
      [ 0 ]
    , function( session_name
      ){  chrome.tabs.executeScript( null
          , { "code": "("+
                function( my_var
                , video_i
                , url
                , title
                , file_ext
                ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
                    const id = my_var;
                    let e = document.getElementsByClassName(id)[ video_i ];
                    if( e === undefined )
                    {   const a = document.createElement( "A" );
                        a.className = id;
                        a.appendChild( document.createTextNode( "save" ));
                        a.addEventListener( "click"
                        , function( e
                          ){  if( e.button
                              || e.shiftKey
                              || e.ctrlKey
                              || e.altKey
                              || e.metaKey
                              )
                                  return;
                              e.stopPropagation();
                              e.preventDefault();
                              chrome.runtime.sendMessage(
                                [ 10
                                , { "url": e.target.getAttribute( "href" )
                                  , "filename": e.target.getAttribute( "data-title" ) +"."+ e.target.getAttribute( "data-ext" )
                                  }
                                ]
                              );
                          }
                        , true
                        );
                        e = document.createElement( "SPAN" );
                        e.style.position = "relative";
                        e.appendChild( document.createTextNode( "‹" ));
                        e.appendChild(a);
                        e.appendChild( document.createTextNode( "› " ));
                        const domain = H_ocq_Q_s_Z_url_Z_host_R_domain( location.hostname );
                        let e_;
                        if( domain === "cda.pl" )
                        {   e_ = document.getElementsByClassName( "mrg-region-video" )[0];
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "cnn.com" )
                        {   e_ = document.getElementsByClassName( "media__video--responsive" )[ video_i ].parentNode;
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "onet.pl"
                        || domain === "fakt.pl"
                        ){  e_ = document.getElementsByClassName( "mvp-embed-wrapper" )[ video_i ];
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "onet.tv" )
                        {   e_ = document.getElementsByClassName( "mvp" )[ video_i ].parentNode.parentNode;
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "tvn24.pl" )
                        {   e_ = document.getElementsByClassName( "mainVideoContainer" );
                            if( !e_.length )
                            {   e_ = document.getElementsByClassName( "articleMainPhoto" );
                                if( !e_.length )
                                    e_ = document.getElementsByClassName( "videoPlayer" );
                            }
                            e_  = e_[ video_i ];
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "vimeo.com" )
                        {   e_ = document.getElementsByClassName( "player" )[0].parentNode.parentNode.parentNode;
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "wp.pl" )
                        {   e_ = document.getElementsByClassName( "wp-player" )[ video_i ].parentNode;
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "wp.tv" )
                        {   e_ = document.getElementsByClassName( "wp-player" )[0];
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }else if( domain === "youtube.com" )
                        {   e_ = document.getElementById( "clarify-box" );
                            e_.parentNode.insertBefore( e, e_.nextSibling );
                        }
                        e = a;
                    }
                    e.setAttribute( "href", url );
                    e.setAttribute( "data-title", title );
                    e.setAttribute( "data-ext", file_ext );
                    e.setAttribute( "title", title );
                }
              +")( "+ JSON.stringify( session_name )
              +", "+ ( document.body.getElementsByTagName( "input" )[0].value - 1 )
              +", "+ JSON.stringify( e.target.getAttribute( "href" ))
              +", "+ JSON.stringify( e.target.getAttribute( "data-title" ))
              +", "+ JSON.stringify( file_ext )
              +", "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args( null, "H_ocq_Q_s_Z_url_Z_host_R_domain" )
              +" );"
            }
          , function( result
            ){  window.setTimeout(
                  function(
                  ){  window.close();
                  }
                , H_ocq_E_ui_Q_menu_S_delay
                );
            }
          );
      }
    );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_string_I_form_filename( s
, type
){  let n;
    if( navigator.platform.startsWith( "Windows" ))
        switch(type)
        { case "author":
                n = 10;
                break;
          case "media":
                n = 10;
                break;
          case "title":
                n = 10;
                s = s.replace( /­/g, "" );
                break;
          case "type":
                n = 11;
                break;
          case "uid":
                n = 11;
                break;
        }
    else
        switch(type)
        { case "author":
                n = 10;
                break;
          case "media":
                n = 20;
                break;
          case "title":
                n = 40;
                s = s.replace( /­/g, "" );
                break;
          case "type":
                n = 11;
                break;
          case "uid":
                n = 11;
                break;
        }
    return s.replace( /[^\w-]+/g, " " ).replace( /^ +/, "" ).substring( 0, n ).replace( / +$/, "" );
}
document.addEventListener( "DOMContentLoaded"
, function(
  ){  chrome.tabs.query(
        { "currentWindow": true
        , "active": true
        }
      , function( tabs
      ){  chrome.runtime.sendMessage(
            [ 12
            , { "tab_id": tabs[0].id
              }
            ]
          , function( data
            ){  data = H_ocq_Q_object_R_decode_undefined(data);
                switch( data[ "type" ] )
                { case "cda.pl":
                    {   let title = Q_string_I_form_filename( data[ "elem" ][ "title" ], "title" );
                        if( title.length
                        && title.length !== data[ "elem" ][ "title" ].length
                        )
                            title += "_";
                        const tbody = Q_tab_R_e(0).getElementsByTagName( "TBODY" )[0];
                        const row = document.createElement( "TR" );
                        let cell = document.createElement( "TD" );
                        cell.appendChild( document.createTextNode( "unknown" ));
                        row.appendChild(cell);
                        cell = document.createElement( "TD" );
                        const e = document.createElement( "A" );
                        e.setAttribute( "href", data[ "elem" ][ "stream" ] );
                        e.setAttribute( "data-title", title );
                        e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                        e.appendChild( document.createTextNode( "link" ));
                        cell.appendChild(e);
                        row.appendChild(cell);
                        tbody.appendChild(row);
                        break;
                    }
                  case "cnn.com":
                        Q_doc_P_n_tabs( data[ "elem" ].length );
                        for( let i = 0; i !== data[ "elem" ].length; i++ )
                        {   let title = Q_string_I_form_filename( data[ "elem" ][i][ "title" ], "title" );
                            if( title.length
                            && title.length !== data[ "elem" ][i][ "title" ].length
                            )
                                title += "_";
                            title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                            Q_tab_P_title( i, title, data[ "elem" ][i][ "desc" ] );
                            const tbody = Q_tab_R_e(i).getElementsByTagName( "TBODY" )[0];
                            for( let k in data[ "elem" ][i][ "streams" ] )
                            {   row = document.createElement( "TR" );
                                let cell = document.createElement( "TD" );
                                cell.appendChild( document.createTextNode( k.replace( /_/g, " " )));
                                row.appendChild(cell);
                                cell = document.createElement( "TD" );
                                const e = document.createElement( "A" );
                                e.setAttribute( "href", data[ "elem" ][i][ "streams" ][k] );
                                e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( k, "media" ));
                                e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                                e.appendChild( document.createTextNode( "link" ));
                                cell.appendChild(e);
                                row.appendChild(cell);
                                tbody.appendChild(row);
                            }
                        }
                        break;
                  case "onet.pl":
                  case "onet.tv":
                        Q_doc_P_ex_th( [ "audio bitrate", "video bitrate" ] );
                        Q_doc_P_n_tabs( data[ "elem" ].length );
                        for( let i = 0; i !== data[ "elem" ].length; i++ )
                        {   let title = Q_string_I_form_filename( data[ "elem" ][i][ "title" ], "title" );
                            if( title.length
                            && title.length !== data[ "elem" ][i][ "title" ].length
                            )
                                title += "_";
                            title = Q_string_I_form_filename( data[ "elem" ][i][ "author" ], "author" ) +" "+ title;
                            title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                            Q_tab_P_title( i, title, data[ "elem" ][i][ "desc" ] );
                            const tbody = Q_tab_R_e(i).getElementsByTagName( "TBODY" )[0];
                            for( let k in data[ "elem" ][i][ "streams" ] )
                            {   row = document.createElement( "TR" );
                                let cell = document.createElement( "TD" );
                                cell.appendChild( document.createTextNode(k) );
                                row.appendChild(cell);
                                cell = document.createElement( "TD" );
                                cell.appendChild( document.createTextNode( data[ "elem" ][i][ "streams" ][k][ "audio_bitrate" ] ));
                                row.appendChild(cell);
                                cell = document.createElement( "TD" );
                                cell.appendChild( document.createTextNode( data[ "elem" ][i][ "streams" ][k][ "video_bitrate" ] ));
                                row.appendChild(cell);
                                cell = document.createElement( "TD" );
                                const e = document.createElement( "A" );
                                e.setAttribute( "href", data[ "elem" ][i][ "streams" ][k][ "url" ] );
                                e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( k, "media" ));
                                e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                                e.appendChild( document.createTextNode( "link" ));
                                cell.appendChild(e);
                                row.appendChild(cell);
                                tbody.appendChild(row);
                            }
                        }
                        break;
                  case "vimeo.com":
                    {   let title = Q_string_I_form_filename( data[ "title" ], "title" );
                        if( title.length
                        && title.length !== data[ "title" ].length
                        )
                            title += "_";
                        title = Q_string_I_form_filename( data[ "author" ], "author" ) +" "+ title;
                        title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                        const tbody = Q_tab_R_e(0).getElementsByTagName( "TBODY" )[0];
                        for( let k in data[ "streams" ] )
                        {   row = document.createElement( "TR" );
                            let cell = document.createElement( "TD" );
                            cell.appendChild( document.createTextNode(k) );
                            row.appendChild(cell);
                            cell = document.createElement( "TD" );
                            const e = document.createElement( "A" );
                            e.setAttribute( "href", data[ "streams" ][k] );
                            e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( k, "media" ));
                            e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                            e.appendChild( document.createTextNode( "link" ));
                            cell.appendChild(e);
                            row.appendChild(cell);
                            tbody.appendChild(row);
                        }
                        break;
                    }
                  case "tvn24.pl":
                    {   let title = Q_string_I_form_filename( data[ "title" ], "title" );
                        if( title.length
                        && title.length !== data[ "title" ].length
                        )
                            title += "_";
                        title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                        Q_tab_P_title( 0, title );
                        const tbody = Q_tab_R_e(0).getElementsByTagName( "TBODY" )[0];
                        for( let k in data[ "streams" ] )
                        {   row = document.createElement( "TR" );
                            let cell = document.createElement( "TD" );
                            cell.appendChild( document.createTextNode(k) );
                            row.appendChild(cell);
                            cell = document.createElement( "TD" );
                            const e = document.createElement( "A" );
                            e.setAttribute( "href", data[ "streams" ][k] );
                            e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( k, "media" ));
                            e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                            e.appendChild( document.createTextNode( "link" ));
                            cell.appendChild(e);
                            row.appendChild(cell);
                            tbody.appendChild(row);
                        }
                        break;
                    }
                  case "wp.pl":
                        Q_doc_P_n_tabs( data[ "elem" ].length );
                        for( let i = 0; i !== data[ "elem" ].length; i++ )
                        {   let title = Q_string_I_form_filename( data[ "elem" ][i][ "title" ], "title" );
                            if( title.length
                            && title.length !== data[ "elem" ][i][ "title" ].length
                            )
                                title += "_";
                            if( data[ "elem" ][i][ "author" ] !== undefined )
                                title = Q_string_I_form_filename( data[ "elem" ][i][ "author" ], "author" ) +" "+ title;
                            title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                            Q_tab_P_title( i, title, data[ "elem" ][i][ "desc" ] );
                            const tbody = Q_tab_R_e(i).getElementsByTagName( "TBODY" )[0];
                            for( let k in data[ "elem" ][i][ "streams" ] )
                            {   row = document.createElement( "TR" );
                                let cell = document.createElement( "TD" );
                                cell.appendChild( document.createTextNode(k) );
                                row.appendChild(cell);
                                cell = document.createElement( "TD" );
                                const e = document.createElement( "A" );
                                e.setAttribute( "href", data[ "elem" ][i][ "streams" ][k] );
                                e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( k, "media" ));
                                e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                                e.appendChild( document.createTextNode( "link" ));
                                cell.appendChild(e);
                                row.appendChild(cell);
                                tbody.appendChild(row);
                            }
                        }
                        break;
                  case "wp.tv":
                    {   let title = Q_string_I_form_filename( data[ "title" ], "title" );
                        if( title.length
                        && title.length !== data[ "title" ].length
                        )
                            title += "_";
                        title = Q_string_I_form_filename( data[ "author" ], "author" ) +" "+ title;
                        title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                        Q_tab_P_title( title, data[ "desc" ] );
                        const tbody = Q_tab_R_e(0).getElementsByTagName( "TBODY" )[0];
                        for( let k in data[ "streams" ] )
                        {   row = document.createElement( "TR" );
                            let cell = document.createElement( "TD" );
                            cell.appendChild( document.createTextNode(k) );
                            row.appendChild(cell);
                            cell = document.createElement( "TD" );
                            const e = document.createElement( "A" );
                            e.setAttribute( "href", data[ "streams" ][k] );
                            e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( k, "media" ));
                            e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                            e.appendChild( document.createTextNode( "link" ));
                            cell.appendChild(e);
                            row.appendChild(cell);
                            tbody.appendChild(row);
                        }
                        break;
                    }
                  case "youtube.com":
                    {   Q_doc_P_ex_th( [ "bitrate", "video freq.", "size", "dimensions", "data type" ] );
                        let title = Q_string_I_form_filename( data[ "title" ], "title" );
                        if( title.length
                        && title.length !== data[ "title" ].length
                        )
                            title += "_";
                        if( data[ "author" ] !== undefined )
                            title = Q_string_I_form_filename( data[ "author" ], "author" ) +" "+ title;
                        title += " "+ Q_string_I_form_filename( data[ "type" ], "type" );
                        title += " "+ Q_string_I_form_filename( data[ "uid" ], "uid" );
                        Q_tab_P_title(title);
                        if( data[ "subtitle" ] !== undefined )
                        {   let e = document.getElementsByTagName( "P" )[0];
                            e.removeAttribute( "hidden" );
                            e = e.childNodes[0];
                            e.setAttribute( "href", data[ "subtitle" ] );
                            e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                        }
                        const tbody = Q_tab_R_e(0).getElementsByTagName( "TBODY" )[0];
                        if( data[ "streams" ][0] !== undefined )
                        {   for( let i in data[ "streams" ][0] )
                            {   const row = document.createElement( "TR" );
                                const stream = data[ "streams" ][0][i];
                                stream[ "mimeType" ] = stream[ "mimeType" ].replace( /; codecs="/, " (" ).replace( /"$/, ")" );
                                let keys = [ "itag" ];
                                for( let j in keys )
                                {   const cell = document.createElement( "TH" );
                                    if( stream[ keys[j] ] !== undefined )
                                        cell.appendChild( document.createTextNode( stream[ keys[j] ] ));
                                    row.appendChild(cell);
                                }
                                keys = [ "bitrate", "fps", "contentLength", "qualityLabel", "mimeType" ];
                                for( let j in keys )
                                {   const cell = document.createElement( "TD" );
                                    if( stream[ keys[j] ] !== undefined )
                                        cell.appendChild( document.createTextNode( stream[ keys[j] ] ));
                                    row.appendChild(cell);
                                }
                                if( stream[ "signatureCipher" ] !== undefined )
                                {   const a = stream[ "signatureCipher" ].split( /&/ );
                                    for( let j in a )
                                    {   const p = a[j].indexOf( "=" );
                                        stream[ a[j].substring( 0, p ) ] = decodeURIComponent(  a[j].substring( p + 1 ));
                                    }
                                }
                                let signature;
                                if( stream[ "s" ] !== undefined )
                                    signature = "&"+ stream[ "sp" ] +"="+ encodeURIComponent( Q_ytplayer_R_signature( data[ "Q_ytplayer_S_signature" ], decodeURIComponent( stream[ "s" ] )));
                                else if( stream[ "sig" ] !== undefined )
                                    signature = "&"+ stream[ "sp" ] +"="+ stream[ "sig" ];
                                else
                                    signature = "";
                                const cell = document.createElement( "TD" );
                                const e = document.createElement( "A" );
                                e.setAttribute( "href", stream[ "url" ] + signature );
                                e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( new String( stream[ "itag" ] ), "media" ));
                                e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                                e.appendChild( document.createTextNode( "link" ));
                                cell.appendChild(e);
                                row.appendChild(cell);
                                tbody.appendChild(row);
                            }
                        }
                        if( data[ "streams" ][1] !== undefined )
                        {   for( let i in data[ "streams" ][1] )
                            {   const row = document.createElement( "TR" );
                                const stream = data[ "streams" ][1][i];
                                stream[ "mimeType" ] = stream[ "mimeType" ].replace( /; codecs="/, " (" ).replace( /"$/, ")" );
                                let keys = [ "itag" ];
                                for( let j in keys )
                                {   const cell = document.createElement( "TH" );
                                    if( stream[ keys[j] ] !== undefined )
                                        cell.appendChild( document.createTextNode( stream[ keys[j] ] ));
                                    row.appendChild(cell);
                                }
                                keys = [ "bitrate" ];
                                for( let j in keys )
                                {   const cell = document.createElement( "TD" );
                                    if( stream[ keys[j] ] !== undefined )
                                        cell.appendChild( document.createTextNode( stream[ keys[j] ] ));
                                    row.appendChild(cell);
                                }
                                row.appendChild( document.createElement( "TD" ));
                                keys = [ "contentLength", "qualityLabel", "mimeType" ];
                                for( let j in keys )
                                {   const cell = document.createElement( "TD" );
                                    if( stream[ keys[j] ] !== undefined )
                                        cell.appendChild( document.createTextNode( stream[ keys[j] ] ));
                                    row.appendChild(cell);
                                }
                                if( stream[ "signatureCipher" ] !== undefined )
                                {   const a = stream[ "signatureCipher" ].split( /&/ );
                                    for( let j in a )
                                    {   const p = a[j].indexOf( "=" );
                                        stream[ a[j].substring( 0, p ) ] = decodeURIComponent(  a[j].substring( p + 1 ));
                                    }
                                }
                                let signature;
                                if( stream[ "s" ] !== undefined )
                                    signature = "&"+ stream[ "sp" ] +"="+ Q_ytplayer_R_signature( data[ "Q_ytplayer_S_signature" ], stream[ "s" ] );
                                else if( stream[ "sig" ] !== undefined )
                                    signature = "&"+ stream[ "sp" ] +"="+ stream[ "sig" ];
                                else
                                    signature = "";
                                const e = document.createElement( "A" );
                                e.setAttribute( "href", stream[ "url" ] + signature );
                                e.setAttribute( "data-title", title +" "+ Q_string_I_form_filename( new String( stream[ "itag" ] ), "media" ));
                                e.addEventListener( "click", Q_gui_Q_link_I_dload, true );
                                e.appendChild( document.createTextNode( "link" ));
                                const cell = document.createElement( "TD" );
                                cell.appendChild(e);
                                row.appendChild(cell);
                                switch( stream[ "itag" ] )
                                { case "36":
                                        row.className = "r_preview";
                                        break;
                                  case "22":
                                        row.className = "r_view";
                                        break;
                                }
                                tbody.appendChild(row);
                            }
                        }
                        //const e = document.createElement( "PRE" );
                        //for( let i = 0; i !== 2; i++ )
                            //if( data[ "streams" ][i] !== undefined )
                            //{   e.appendChild( document.createTextNode( "streams "+ i +":\n" ));
                                //for( let j in data[ "streams" ][i] )
                                //{   e.appendChild( document.createTextNode( j +".\n" ));
                                    //const a = data[ "streams" ][i][j].split( /&/ );
                                    //for( let k in a )
                                        //e.appendChild( document.createTextNode( "\t"+ decodeURIComponent( a[k] ) +"\n" ));
                                //}
                            //}
                        //document.body.appendChild(e);
                        break;
                    }
                }
                window[ "H_ocq_E_dload_tv_S_type" ] = data[ "type" ];
                init_end;
            }
          );
        }
      );
  }
);
/******************************************************************************/
