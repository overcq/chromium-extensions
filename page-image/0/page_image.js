/******************************************************************************/
let tab_id;
//==============================================================================
async function I_show( ev
){  ev.target.removeEventListener( "load", I_show );
    await chrome.runtime.sendMessage(
      [ 3
      , tab_id
      ]
    );
}
document.addEventListener( "DOMContentLoaded", async () =>
  {   tab_id = location.search.substring(1);
      const tab = await chrome.runtime.sendMessage(
        [ 2
        , tab_id
        ]
      );
      document.getElementById( "url" ).appendChild( document.createTextNode( tab.url ));
      document.getElementById( "title" ).appendChild( document.createTextNode( tab.title ));
      var e = document.getElementById( "image" );
      var max_h = innerHeight - (( document.documentElement.offsetHeight - document.body.offsetHeight ) + e.parentNode.offsetTop );
      if( max_h < 100 )
          max_h = 100;
      e.parentNode.style.height = max_h +"px";
      e.addEventListener( "load", I_show );
      e.src = tab.image;
  }
);
/******************************************************************************/
