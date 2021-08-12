/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” library
*  ¦/C+¦  ‟chromium” extension
*   ---   privoxy func
*         page menu scripts
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”             2020‒9‒23 g
*******************************************************************************/
function Q_button_I_click( n
){  chrome.runtime.sendMessage(
      [ n
      ]
    );
    window.close();
}
document.addEventListener( "DOMContentLoaded", function(
){  let e = document.getElementById( "button_go" );
    e.addEventListener( "click", function(
    ){  Q_button_I_click(1);
    }
    , false
    );
    e = document.getElementById( "button_why" );
    e.addEventListener( "click", function(
    ){  Q_button_I_click(0);
    }
    , false
    );
}
, false
);
/******************************************************************************/