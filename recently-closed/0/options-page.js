/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   recently closed
*         options page scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
function E_conf_Q_form_P_conv( k
, v
){  return v;
}
function E_conf_Q_form_R_conv( k
, v
){  return v;
}
//------------------------------------------------------------------------------
document.addEventListener( "DOMContentLoaded"
, function(
  ){  document.title = 0%`extension ‟recently closed”➪options page``;
      const form = H_ocq_E_conf_Q_form_M();
      H_ocq_E_conf_Q_form_I_add( form, "number", "C_max_count", 1%`max. count$$`` );
      const group = H_ocq_E_conf_Q_form_I_add_group( form, 2%`configuration settings`` );
      H_ocq_E_conf_Q_form_I_add_reset( group
      , function(
        ){  chrome.storage.sync.clear();
        }
      );
      H_ocq_E_conf_Q_form_P(form);
  }
);
/******************************************************************************/
