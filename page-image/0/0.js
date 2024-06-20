/******************************************************************************/
const S_tab = [];
//==============================================================================
chrome.runtime.onMessage.addListener(
  function(
    data
  , sender
  , response
  ){  switch( data[0] )
      { case 1:
            S_tab[ data[1].id ] =
            { "url": data[1].url
            , "title": data[1].title
            , "image": data[2]
            };
            break;
        case 2:
            response( S_tab[ data[1] ] );
            return true;
        case 3:
            delete S_tab[ data[1] ];
            break;
      }
      return false;
  }
);
/******************************************************************************/
