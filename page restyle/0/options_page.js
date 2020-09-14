/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  deprecated standalone injection
*  ¦Inc¦  ‟chromium” extension
*   ---   page restyle
*         options page scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒6‒4 *
*******************************************************************************/
function E_conf_Q_form_P_conv( k
, v
){  switch(k)
    { case "Q_color_C_default_background":
      case "Q_color_C_default_border":
      case "Q_color_C_default_text":
            v = ( v[0] << 16 ) | ( v[1] << 8 ) | v[2];
            break;
      case "Q_color_C_max_gray_diff":
      case "Q_color_C_min_contrast":
            v *= 100;
            break;
    }
    return v;
}
function E_conf_Q_form_R_conv( k
, v
){  switch(k)
    { case "Q_color_C_default_background":
      case "Q_color_C_default_border":
      case "Q_color_C_default_text":
            v =
            [ ( v >> 16 ) & 0xff
            , ( v >> 8 ) & 0xff
            , v & 0xff
            ];
            break;
      case "Q_color_C_max_gray_diff":
      case "Q_color_C_min_contrast":
            v /= 100;
            break;
    }
    return v;
}
//------------------------------------------------------------------------------
document.addEventListener( "DOMContentLoaded"
, function(
  ){  document.title = 0%`extension ‟page restyle”➪options page``;
      var form = H_ocq_E_conf_Q_form_M();
      var group = H_ocq_E_conf_Q_form_I_add_group( form, 1%`forced colors`` );
      H_ocq_E_conf_Q_form_I_add( group, "color", "Q_color_C_default_background", 2%`background$$`` );
      H_ocq_E_conf_Q_form_I_add( group, "color", "Q_color_C_default_border", 3%`frame$$`` );
      H_ocq_E_conf_Q_form_I_add( group, "color", "Q_color_C_default_text", 4%`text$$`` );
      H_ocq_E_conf_Q_form_I_add( form, "number", "Q_color_C_max_gray_diff", 5%`only change colors upto $$% different from gray (saturated)`` );
      H_ocq_E_conf_Q_form_I_add( form, "number", "Q_color_C_min_contrast", 7%`contrast text color if luminance below $$% different from background color`` );
      group = H_ocq_E_conf_Q_form_I_add_group( form, 6%`configuration settings`` );
      H_ocq_E_conf_Q_form_I_add_reset( group
      , function(
        ){  chrome.storage.sync.clear();
        }
      );
      H_ocq_E_conf_Q_form_P(form);
  }
);
/******************************************************************************/
