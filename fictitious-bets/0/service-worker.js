/*******************************************************************************
*   ___   public
*  ¦OUX¦  JavaScript
*  ¦/C+¦  Chrome extension
*   ---   fictitious bets
*         service worker
* ©overcq                on ‟Gentoo Linux 23.0” “x86_64”             2024‒9‒13 R
*******************************************************************************/
chrome.tabs.onUpdated.addListener(( tab_id, info, tab ) =>
  {   if( info.url === undefined
      || !info.url.match( /^https:\/\/www\.sts\.pl\// )
      )
          return;
      chrome.tabs.sendMessage( tab_id, { "msg": 0 } );
  }
);
/******************************************************************************/
