/******************************************************************************/
const S_idle_delay = 1830;
const S_look_delay = 360;
//==============================================================================
let S_current_tab;
let S_bar_width, S_bar_height;
let S_saved_x, S_saved_y, S_x, S_y, S_dx, S_dy;
let S_canvas, S_canvas_context;
let S_image;
let Q_show_S_data;
//==============================================================================
function I_begin(
){  const es = document.getElementsByTagName( "input" );
    for( const e of es )
        e.setAttribute( "disabled", "" );
    S_image = document.getElementById( "image" );
    S_image.parentNode.parentNode.setAttribute( "hidden", "" );
    S_image.setAttribute( "hidden", "" );
    S_image.parentNode.removeEventListener( "click", I_open );
    S_image.src = "";
    S_canvas = document.getElementById( "canvas" );
    S_canvas.width = S_canvas.height = 0;
    S_canvas.setAttribute( "hidden", "" );
    S_canvas_context = S_canvas.getContext( "2d" );
}
function I_end(
){  S_image = null;
    S_canvas_context = null;
    S_canvas = null;
    const es = document.getElementsByTagName( "input" );
    for( const e of es )
        e.removeAttribute( "disabled" );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function I_open(
){  await chrome.runtime.sendMessage(
      [ 1
      , S_current_tab
      , Q_show_S_data
      ]
    );
    await chrome.tabs.create(
      { "url": "page_image.html?"+ S_current_tab.id
      }
    );
    close();
}
function I_enable_I_cont_3(
){  Q_show_S_data = S_canvas.toDataURL();
    S_canvas.parentNode.addEventListener( "click", I_open );
    setTimeout( I_end, S_look_delay );
}
function I_enable_I_cont_2(
){  S_image.removeEventListener( "load", I_enable_I_cont_2 );
    S_image.parentNode.addEventListener( "click", I_open );
    S_image.removeAttribute( "hidden" );
    S_image.parentNode.parentNode.removeAttribute( "hidden" );
    setTimeout( I_end, S_look_delay );
}
function I_enable_I_cont_1( data
){  S_image.style.maxHeight = screen.availHeight >> 1;
    S_image.addEventListener( "load", I_enable_I_cont_2 );
    Q_show_S_data = data;
    S_image.src = data;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function I_visible_I_run(
){  I_begin();
    chrome.tabs.captureVisibleTab( null
    , { format: "png"
      }
    , I_enable_I_cont_1
    );
}
//------------------------------------------------------------------------------
async function I_all_X_load(
){  S_image.removeEventListener( "load", I_all_X_load );
    S_canvas_context.drawImage( S_image
    , S_x <= S_canvas.width - ( S_image.naturalWidth - S_bar_width ) ? S_x : S_canvas.width - ( S_image.naturalWidth - S_bar_width )
    , S_y <= S_canvas.height - ( S_image.naturalHeight - S_bar_height ) ? S_y : S_canvas.height - ( S_image.naturalHeight - S_bar_height )
    );
    S_x += S_dx - S_bar_width;
    if( S_x >= S_canvas.width )
    {   S_x = 0;
        S_y += S_dy - S_bar_height;
        if( S_y >= S_canvas.height )
        {   Q_document_I_scroll_restore();
            I_enable_I_cont_3();
        }else
        {   await chrome.scripting.executeScript(
              { "target":
                { "tabId": S_current_tab.id
                }
              , "args":
                [ S_y
                ]
              , "func": ( S_y ) =>
                  {   scrollTo( 0, S_y );
                  }
              }
            );
            setTimeout( I_all_I_cont, S_idle_delay );
        }
    }else
    {   await chrome.scripting.executeScript(
          { "target":
            { "tabId": S_current_tab.id
            }
          , "func": ( S_bar_width ) =>
              {   scrollBy( innerWidth - S_bar_width, 0 );
              }
          }
        );
        setTimeout( I_all_I_cont, S_idle_delay );
    }
}
async function I_all_I_cont(
){  S_image.addEventListener( "load", I_all_X_load );
    S_image.src = await chrome.tabs.captureVisibleTab(
      { format: "png"
      }
    );
}
async function Q_document_I_scroll_restore(
){  await chrome.scripting.executeScript(
      { "target":
        { "tabId": S_current_tab.id
        }
      , "args":
        [ S_saved_x
        , S_saved_y
        ]
      , "func": ( S_saved_x, S_saved_y ) =>
          {   scrollTo( S_saved_x, ( S_saved_y + 1 ));
              scrollTo( S_saved_x, S_saved_y );
          }
      }
    );
}
document.addEventListener( "DOMContentLoaded", async () =>
  {   const e = document.getElementById( "area" );
      e.style.overflow = "hidden";
      e.removeAttribute( "hidden" );
      S_bar_width = e.clientWidth;
      S_bar_height = e.clientHeight;
      e.style.overflow = "scroll";
      S_bar_width -= e.clientWidth;
      S_bar_height -= e.clientHeight;
      e.setAttribute( "hidden", "" );
      chrome.runtime.onMessage.addListener(
        async (
          data
        , sender
        , response
        ) =>
        {   switch( data[0] )
            { case 0:
                  if( S_saved_x == undefined )
                  {   S_saved_x = data[1];
                      S_saved_y = data[2];
                  }
                  if( !data[5] )
                      S_bar_width = 0;
                  if( !data[6] )
                      S_bar_height = 0;
                  S_canvas.width = data[3];
                  S_canvas.height = data[4];
                  S_canvas.removeAttribute( "hidden" );
                  S_canvas.parentNode.parentNode.removeAttribute( "hidden" );
                  S_canvas.style.maxWidth = ( screen.width / 3 ) +"px";
                  S_canvas.style.maxHeight = ( screen.height / 3 - S_canvas.parentNode.parentNode.offsetTop ) +"px";
                  S_dx = data[7];
                  S_dy = data[8];
                  await chrome.scripting.executeScript(
                    { "target":
                      { "tabId": S_current_tab.id
                      }
                    , "func": () =>
                        {   scrollTo( 0, 1 );
                            scrollTo( 0, 0 );
                        }
                    }
                  );
                  S_x = S_y = 0;
                  setTimeout( I_all_I_cont, S_idle_delay );
                  break;
            }
            return false;
        }
      );
      const es = document.getElementsByTagName( "input" );
      es[0].addEventListener( "change", I_all_I_run );
      es[1].addEventListener( "change", I_visible_I_run );
      [ S_current_tab ] = await chrome.tabs.query(
        { "active": true
        , "currentWindow": true
        }
      );
  }
);
async function I_all_I_run(
){  I_begin();
    await chrome.scripting.executeScript(
      { "target":
        { "tabId": S_current_tab.id
        }
      , "args":
        [ S_bar_width
        , S_bar_height
        ]
      , "func": async ( S_bar_width, S_bar_height ) =>
          {   let horiz = false;
              let vert = false;
              if( document.body.scrollWidth > innerWidth )
                  horiz = true;
              if( document.body.scrollHeight > innerHeight )
                  vert = true;
              if( vert
              && !horiz
              && document.body.scrollWidth > innerWidth - S_bar_width
              )
                  horiz = true;
              if( horiz
              && !vert
              && document.body.scrollHeight > innerHeight - S_bar_height
              )
                  vert = true;
              await chrome.runtime.sendMessage(
                [ 0
                , document.body.scrollLeft
                , document.body.scrollTop
                , document.body.scrollWidth
                , document.body.scrollHeight
                , vert
                , horiz
                , innerWidth
                , innerHeight
                ]
              );
          }
      }
    );
}
/******************************************************************************/
