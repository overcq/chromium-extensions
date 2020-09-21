/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   hyphenate
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
  ){  document.title = 0%`extension ‟hyphenate”➪options page``;
      var form = H_ocq_E_conf_Q_form_M();
      var group = H_ocq_E_conf_Q_form_I_add_group( form, 1%`required characters before, after hyphenation point`` );
      H_ocq_E_conf_Q_form_I_add( group, "number", "Q_hyphenate_C_min_length_before_hyphen", 2%`before`` );
      H_ocq_E_conf_Q_form_I_add( group, "number", "Q_hyphenate_C_min_length_after_hyphen", 3%`after`` );
      group = H_ocq_E_conf_Q_form_I_add_group( form, 4%`configuration settings`` );
      H_ocq_E_conf_Q_form_I_add_reset( group
      , function(
        ){  chrome.storage.sync.clear();
        }
      );
      H_ocq_E_conf_Q_form_P(form);
  }
);
/******************************************************************************/
