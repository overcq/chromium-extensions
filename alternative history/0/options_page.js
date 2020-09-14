/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  deprecated standalone injection
*  ¦Inc¦  ‟chromium” extension
*   ---   alternative history database
*         options page scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
function E_conf_Q_form_P_conv( k
, v
){  switch(k)
    { case "Q_purge_C_interval":
            v /= H_ocq_E_date_I_u_delta( 4, 1 );
            break;
      case "Q_list_C_idle_period":
            v /= H_ocq_E_date_I_u_delta( 3, 1 );
            break;
    }
    return v;
}
function E_conf_Q_form_R_conv( k
, v
){  switch(k)
    { case "Q_purge_C_interval":
            v *= H_ocq_E_date_I_u_delta( 4, 1 );
            break;
      case "Q_list_C_idle_period":
            v *= H_ocq_E_date_I_u_delta( 3, 1 );
            break;
    }
    return v;
}
//------------------------------------------------------------------------------
document.addEventListener( "DOMContentLoaded"
, function(
  ){  document.title = 25%`extension ‟alternative history”➪options page``;
      var form = H_ocq_E_conf_Q_form_M();
      var group = H_ocq_E_conf_Q_form_I_add_group( form, 26%`purge history`` );
      H_ocq_E_conf_Q_form_I_add( group, "number", "Q_purge_C_interval", 27%`older than$$days`` );
      H_ocq_E_conf_Q_form_I_add( group, "date", "Q_purge_C_next_time", 28%`saved next time is$$`` );
      H_ocq_E_conf_Q_form_I_add( group, "number", "Q_purge_C_idle_delay", 29%`when user is idle for$$seconds or display is locked`` );
      H_ocq_E_conf_Q_form_I_add( form, "number", "Q_list_C_last_count", 36%`last addresses count$$`` );
      H_ocq_E_conf_Q_form_I_add( form, "number", "Q_list_C_idle_period", 30%`last active: idle period$$hours`` );
      group = H_ocq_E_conf_Q_form_I_add_group( form, 31%`configuration settings`` );
      H_ocq_E_conf_Q_form_I_add_reset( group
      , function(
        ){  chrome.storage.sync.clear();
        }
      );
      group = H_ocq_E_conf_Q_form_I_add_group( form, 32%`history database`` );
      H_ocq_E_conf_Q_form_I_add_button( group, "button", "clear_db", "clear all"
      , function(
        ){  chrome.storage.local.clear();
        }
      , true
      );
      H_ocq_E_conf_Q_form_P(form);
  }
);
/******************************************************************************/
