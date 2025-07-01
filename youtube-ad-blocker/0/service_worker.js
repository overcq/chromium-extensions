/******************************************************************************/
function remove_sponsored(
){  const f = () =>
    {   const es = document.getElementsByTagName( "ytd-ad-slot-renderer" );
        for( const e of es )
            e.parentNode.style.display = "none";
    }
    setInterval( f, 2000 );
}
function remove_player_ads(
){  const player = document.getElementById( "movie_player" );
    const player_video = player.getElementsByTagName( "video" )[0];
    const f = () =>
    {   const e = document.getElementById( "player-ads" );
        if( e !== null )
            e.style.display = "none";
        const es = document.getElementsByTagName( "ytd-engagement-panel-section-list-renderer" );
        for( const e of es )
            e.style.display = "none";
        player.style.visibility = player.classList.contains( "ad-interrupting" ) ? "hidden" : "unset";
        player_video.muted = player.classList.contains( "ad-interrupting" );
    }
    setInterval( f, 2000 );
}
chrome.tabs.onUpdated.addListener(( tab_id, info, tab ) =>
  {   if( info.status === "complete" )
      {   if( tab.url.match( /^https:\/\/www\.youtube\.com\// ) !== null )
              chrome.scripting.executeScript({
                target: { tabId: tab_id }
              , func: remove_sponsored
              });
          if( tab.url.match( /^https:\/\/www\.youtube\.com\/watch\?/ ) !== null )
              chrome.scripting.executeScript({
                target: { tabId: tab_id }
              , func: remove_player_ads
              });
          
      }
  }
);
/******************************************************************************/
