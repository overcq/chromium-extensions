/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  deprecated standalone injection
*  ¦/C+¦  ‟chromium” extension
*   ---   pr0nSusPICiErr
*         content scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2016‒4‒13 o
*******************************************************************************/
(function(
){  const f = function( s
    ){  eval(s);
        const E_pr0n_T_text = function( s
        ){  if( s === undefined )
                return false;
            return /gangbang|groupsex|fuck|orgy|pussy|squirt|suck|swinger/i.test(s)
            || /\b(?:porn)\b/i.test(s)
            || /\b(?:anal|bsdm|cfnm|tits)\b/i.test(s)
            || /\b(?:cock|dick|gay)s?\b/i.test(s);
        }
        const E_pr0n_T_thumb = function( a
        , e
        ){  if( e.tagName !== "IMG"
            || e.getAttribute( "src" ) === null
            )
                return false;
            const src = H_ocq_Q_s_Z_url_R_without_query( e.getAttribute( "src" ));
            return /\.(?:jpg)$/i.test(src)
            && ( E_pr0n_T_text(src)
              || E_pr0n_T_text( e.getAttribute( "alt" ))
              || E_pr0n_T_text( e.getAttribute( "title" ))
              || E_pr0n_T_text( a.getAttribute( "href" ))
            );
        };
        const E_pr0n_T_a_thumb = function( e
        ){  do
            {   const a = e;
                let e_ = e;
                do
                {   e_ = e_.firstElementChild;
                    if( e_ === null )
                        return false;
                }while( e_.tagName !== "IMG" );
                if( E_pr0n_T_thumb( a, e_ ))
                    return true;
                e = e.nextElementSibling;
            }while( e !== null );
            return false;
        };
        const E_pr0n_T_root_tag = function( e
        ){  if( e === null )
                return false;
            const e_root = e.parentNode;
            while(true)
            {   let e_;
                if( e.tagName === "A" )
                {   if( E_pr0n_T_text( e.getAttribute( "title" ))
                    || E_pr0n_T_a_thumb(e)
                    )
                        return true;
                    e_ = null;
                }else
                    e_ = e.firstElementChild;
                if( e_ === null )
                    while(true)
                    {   e_ = e.nextElementSibling;
                        if( e_ !== null )
                            break;
                        e = e.parentNode;
                        if( e === e_root )
                            return false;
                    }
                e = e_;
            }
        };
        let e = document.body.firstElementChild;
        if( e !== null )
        {   while(true)
            {   let e_;
                if( e.tagName === "CENTER"
                || e.tagName === "DIV"
                || e.tagName === "TABLE"
                || e.tagName === "UL"
                || e.tagName === "A"
                ){  if( e.tagName !== "A" )
                    {   if( !H_ocq_Q_s_Z_set_T_in( e.className, "H_ocq_E_pr0n_S_table" )
                        && E_pr0n_T_root_tag( e.firstElementChild )
                        )
                        {   e.className = H_ocq_Q_s_Z_set_I_add( e.className, "H_ocq_E_pr0n_S_table" );
                            window[ "H_ocq_E_pr0n_S_some_blocked" ] = true;
                        }
                    }else if( E_pr0n_T_a_thumb(e) )
                    {   document.body.className = H_ocq_Q_s_Z_set_I_add( document.body.className, "H_ocq_E_pr0n_S_table" );
                        window[ "H_ocq_E_pr0n_S_some_blocked" ] = true;
                    }
                    e_ = null;
                }else
                    e_ = e.firstElementChild;
                if( e_ === null )
                {   let o = false;
                    while(true)
                    {   e_ = e.nextElementSibling;
                        if( e_ !== null )
                            break;
                        e = e.parentNode;
                        if( e === document.body )
                        {   o = true;
                            break;
                        }
                    }
                    if(o)
                        break;
                }
                e = e_;
            }
            if( !window[ "H_ocq_E_pr0n_S_some_blocked" ] )
            {   const head = document.documentElement.getElementsByTagName( "HEAD" )[0];
                //if( E_pr0n_T_text( document.title ))
                    //document.body.className = H_ocq_Q_s_Z_set_I_add( document.body.className, "H_ocq_E_pr0n_S_table" );
                //else
                {   const es = head.getElementsByTagName( "META" );
                    for( let i = 0; i !== es.length; i++ )
                        if( /^(?:Description|Keywords)$/i.test( es[i].getAttribute( "name" ))
                        && E_pr0n_T_text( es[i].getAttribute( "content" ))
                        )
                        {   document.body.className = H_ocq_Q_s_Z_set_I_add( document.body.className, "H_ocq_E_pr0n_S_table" );
                            break;
                        }
                }
            }
        }
        //H_ocq_E_flow_S_interval
    };
    const f_main_0 = function(
    ){  chrome.runtime.sendMessage( "komnhlglakeipoelcnpnbclohbjomglg"
        , f.toString()
        , f
        );
    };
    const f_main = function(
    ){  if( window[ "H_ocq_E_pr0n_S_interval" ] === undefined )
            window[ "H_ocq_E_pr0n_S_interval" ] = window.setInterval(
              f
            , 2000 //H_ocq_E_flow_S_interval
            );
    };
    document.addEventListener( "DOMContentLoaded"
    , (function( f_main_0, f_main
      ){  return function(
          ){  f_main_0();
              f_main();
          };
      })( f_main_0, f_main )
    );
    window[ "H_ocq_E_pr0n_S_some_blocked" ] = false;
    f_main_0();
    f_main();
})();
/******************************************************************************/
