/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   page restyle
*         content scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒4‒28 *
*******************************************************************************/
//TODO Do zrobienia ewentualnie: “style.backgroundImage” (w tym najpierw może “gradient”).
//==============================================================================
(() =>
{   if( window[ "H_ocq_E_restyle_S_observer" ] !== undefined )
    {   window[ "H_ocq_E_restyle_S_observer" ].disconnect();
        delete window[ "H_ocq_E_restyle_S_observer" ];
        if( window[ "H_ocq_E_restyle_S_timeout" ] !== undefined )
        {   if( window[ "H_ocq_E_restyle_S_timeout" ] !== null )
                window.clearTimeout( window[ "H_ocq_E_restyle_S_timeout" ] );
            delete window[ "H_ocq_E_restyle_S_timeout" ];
        }
    }
    chrome.runtime.sendMessage(
      [ 10 ]
    , function( option
      ){  const Q_color_C_default_background = option[0];
          const Q_color_C_default_border = option[1];
          const Q_color_C_default_text = option[2];
          const Q_color_C_max_gray_diff = option[3];
          const Q_number_I_abs = (v) =>
          {   return v > 0 ? v : -v;
          };
          const H_ocq_Q_object_T_eq = ( a
          , b
          ) =>
          {   const t = typeof a;
              if( t !== typeof b )
                  return false;
              if( t === "object" )
                  return JSON.stringify(a) === JSON.stringify(b);
              return a === b;
          };
          const I_restyle_I_add_mutations = ( mutations
          , observer
          ) =>
          {   window[ "H_ocq_E_restyle_S_mutations" ] = window[ "H_ocq_E_restyle_S_mutations" ].concat(mutations);
              window[ "H_ocq_E_restyle_S_observer" ].takeRecords();
              if( window[ "H_ocq_E_restyle_S_timeout" ] === null )
                  return;
              if( window[ "H_ocq_E_restyle_S_timeout" ] !== undefined )
                  window.clearTimeout( window[ "H_ocq_E_restyle_S_timeout" ] );
              window[ "H_ocq_E_restyle_S_timeout" ] = window.setTimeout( I_restyle, 360 );
          };
          const I_restyle = () =>
          {   window[ "H_ocq_E_restyle_S_timeout" ] = null;
              const Q_color_S_named =
              { "aliceblue": [  240, 248, 255 ]
              , "antiquewhite": [  250, 235, 215 ]
              , "aqua": [  0, 255, 255 ]
              , "aquamarine": [  127, 255, 212 ]
              , "azure": [  240, 255, 255 ]
              , "beige": [  245, 245, 220 ]
              , "bisque": [  255, 228, 196 ]
              , "black": [  0, 0, 0 ]
              , "blanchedalmond": [  255, 235, 205 ]
              , "blue": [  0, 0, 255 ]
              , "blueviolet": [  138, 43, 226 ]
              , "brown": [  165, 42, 42 ]
              , "burlywood": [  222, 184, 135 ]
              , "cadetblue": [  95, 158, 160 ]
              , "chartreuse": [  127, 255, 0 ]
              , "chocolate": [  210, 105, 30 ]
              , "coral": [  255, 127, 80 ]
              , "cornflowerblue": [  100, 149, 237 ]
              , "cornsilk": [  255, 248, 220 ]
              , "crimson": [  220, 20, 60 ]
              , "cyan": [  0, 255, 255 ]
              , "darkblue": [  0, 0, 139 ]
              , "darkcyan": [  0, 139, 139 ]
              , "darkgoldenrod": [  184, 134, 11 ]
              , "darkgray": [  169, 169, 169 ]
              , "darkgreen": [  0, 100, 0 ]
              , "darkgrey": [  169, 169, 169 ]
              , "darkkhaki": [  189, 183, 107 ]
              , "darkmagenta": [  139, 0, 139 ]
              , "darkolivegreen": [  85, 107, 47 ]
              , "darkorange": [  255, 140, 0 ]
              , "darkorchid": [  153, 50, 204 ]
              , "darkred": [  139, 0, 0 ]
              , "darksalmon": [  233, 150, 122 ]
              , "darkseagreen": [  143, 188, 143 ]
              , "darkslateblue": [  72, 61, 139 ]
              , "darkslategray": [  47, 79, 79 ]
              , "darkslategrey": [  47, 79, 79 ]
              , "darkturquoise": [  0, 206, 209 ]
              , "darkviolet": [  148, 0, 211 ]
              , "deeppink": [  255, 20, 147 ]
              , "deepskyblue": [  0, 191, 255 ]
              , "dimgray": [  105, 105, 105 ]
              , "dimgrey": [  105, 105, 105 ]
              , "dodgerblue": [  30, 144, 255 ]
              , "firebrick": [  178, 34, 34 ]
              , "floralwhite": [  255, 250, 240 ]
              , "forestgreen": [  34, 139, 34 ]
              , "fuchsia": [  255, 0, 255 ]
              , "gainsboro": [  220, 220, 220 ]
              , "ghostwhite": [  248, 248, 255 ]
              , "gold": [  255, 215, 0 ]
              , "goldenrod": [  218, 165, 32 ]
              , "gray": [  128, 128, 128 ]
              , "green": [  0, 128, 0 ]
              , "greenyellow": [  173, 255, 47 ]
              , "grey": [  128, 128, 128 ]
              , "honeydew": [  240, 255, 240 ]
              , "hotpink": [  255, 105, 180 ]
              , "indianred": [  205, 92, 92 ]
              , "indigo": [  75, 0, 130 ]
              , "ivory": [  255, 255, 240 ]
              , "khaki": [  240, 230, 140 ]
              , "lavender": [  230, 230, 250 ]
              , "lavenderblush": [  255, 240, 245 ]
              , "lawngreen": [  124, 252, 0 ]
              , "lemonchiffon": [  255, 250, 205 ]
              , "lightblue": [  173, 216, 230 ]
              , "lightcoral": [  240, 128, 128 ]
              , "lightcyan": [  224, 255, 255 ]
              , "lightgoldenrodyellow": [  250, 250, 210 ]
              , "lightgray": [  211, 211, 211 ]
              , "lightgreen": [  144, 238, 144 ]
              , "lightgrey": [  211, 211, 211 ]
              , "lightpink": [  255, 182, 193 ]
              , "lightsalmon": [  255, 160, 122 ]
              , "lightseagreen": [  32, 178, 170 ]
              , "lightskyblue": [  135, 206, 250 ]
              , "lightslategray": [  119, 136, 153 ]
              , "lightslategrey": [  119, 136, 153 ]
              , "lightsteelblue": [  176, 196, 222 ]
              , "lightyellow": [  255, 255, 224 ]
              , "lime": [  0, 255, 0 ]
              , "limegreen": [  50, 205, 50 ]
              , "linen": [  250, 240, 230 ]
              , "magenta": [  255, 0, 255 ]
              , "maroon": [  128, 0, 0 ]
              , "mediumaquamarine": [  102, 205, 170 ]
              , "mediumblue": [  0, 0, 205 ]
              , "mediumorchid": [  186, 85, 211 ]
              , "mediumpurple": [  147, 112, 219 ]
              , "mediumseagreen": [  60, 179, 113 ]
              , "mediumslateblue": [  123, 104, 238 ]
              , "mediumspringgreen": [  0, 250, 154 ]
              , "mediumturquoise": [  72, 209, 204 ]
              , "mediumvioletred": [  199, 21, 133 ]
              , "midnightblue": [  25, 25, 112 ]
              , "mintcream": [  245, 255, 250 ]
              , "mistyrose": [  255, 228, 225 ]
              , "moccasin": [  255, 228, 181 ]
              , "navajowhite": [  255, 222, 173 ]
              , "navy": [  0, 0, 128 ]
              , "oldlace": [  253, 245, 230 ]
              , "olive": [  128, 128, 0 ]
              , "olivedrab": [  107, 142, 35 ]
              , "orange": [  255, 165, 0 ]
              , "orangered": [  255, 69, 0 ]
              , "orchid": [  218, 112, 214 ]
              , "palegoldenrod": [  238, 232, 170 ]
              , "palegreen": [  152, 251, 152 ]
              , "paleturquoise": [  175, 238, 238 ]
              , "palevioletred": [  219, 112, 147 ]
              , "papayawhip": [  255, 239, 213 ]
              , "peachpuff": [  255, 218, 185 ]
              , "peru": [  205, 133, 63 ]
              , "pink": [  255, 192, 203 ]
              , "plum": [  221, 160, 221 ]
              , "powderblue": [  176, 224, 230 ]
              , "purple": [  128, 0, 128 ]
              , "red": [  255, 0, 0 ]
              , "rosybrown": [  188, 143, 143 ]
              , "royalblue": [  65, 105, 225 ]
              , "saddlebrown": [  139, 69, 19 ]
              , "salmon": [  250, 128, 114 ]
              , "sandybrown": [  244, 164, 96 ]
              , "seagreen": [  46, 139, 87 ]
              , "seashell": [  255, 245, 238 ]
              , "sienna": [  160, 82, 45 ]
              , "silver": [  192, 192, 192 ]
              , "skyblue": [  135, 206, 235 ]
              , "slateblue": [  106, 90, 205 ]
              , "slategray": [  112, 128, 144 ]
              , "slategrey": [  112, 128, 144 ]
              , "snow": [  255, 250, 250 ]
              , "springgreen": [  0, 255, 127 ]
              , "steelblue": [  70, 130, 180 ]
              , "tan": [  210, 180, 140 ]
              , "teal": [  0, 128, 128 ]
              , "thistle": [  216, 191, 216 ]
              , "tomato": [  255, 99, 71 ]
              , "turquoise": [  64, 224, 208 ]
              , "violet": [  238, 130, 238 ]
              , "wheat": [  245, 222, 179 ]
              , "white": [  255, 255, 255 ]
              , "whitesmoke": [  245, 245, 245 ]
              , "yellow": [  255, 255, 0 ]
              , "yellowgreen": [  154, 205, 50 ]
              };
              const Q_color_Z_channel_T_almost_equal_gray_I_cmp = ( a
              , b
              ) =>
              {  return Q_number_I_abs( a - b ) <= Q_color_C_max_gray_diff * 255;
              };
              const Q_color_T_almost_equal_gray = (a) =>
              {  return Q_color_Z_channel_T_almost_equal_gray_I_cmp( a[0], a[1] )
                  && Q_color_Z_channel_T_almost_equal_gray_I_cmp( a[0], a[2] );
              };
              const Q_color_R_luminance = a =>
              {   switch( a[0] )
                  { case "rgb":
                    case "rgba":
                          return a[1] + a[2] + a[3];
                    case "hsl":
                    case "hsla":
                          return a[3] * 3 * 255;
                  }
                  return;
              };
              const Q_color_N_ext_contrast = ( a
              , b_luminance
              ) =>
              {   const ret = b_luminance <= (( 3 * 255 ) >> 1 ) ? [ 255, 255, 255 ] : [ 0, 0, 0 ];
                  if( a[0] === "rgba"
                  || a[0] === "hsla"
                  )
                  {   ret.unshift( "rgba" );
                      ret.push( a[4] );
                  }else
                      ret.unshift( "rgb" );
                  return ret;
              };
              const Q_css_style_N_color = ( style
              , name
              , stage
              ) =>
              {   let s = style[name];
                  if( s === null
                  || s === ""
                  )
                      return;
                  let a;
                  if( stage === 1
                  && ( a = name.match( /^(?:border|outline)/ ) !== null )
                  && ( style[ a[0] +"Width" ] === ""
                    || style[ a[0] +"Width" ] === "0px"
                  ))
                      return;
                  if( s === "initial" )
                      if( name === "backgroundColor" )
                          s = "transparent";
                      else if( name.indexOf( "border" ) === 0
                      && name.indexOf( "Color" ) === name.length - 5
                      )
                          s = style[ "color" ];
                  if( s === "invert" )
                      return s;
                  if(( a = Q_color_S_named[s] ) !== undefined )
                      a.unshift( "rgb" );
                  else if(( a = s.match( /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/ )) !== null )
                  {   a[0] = "rgb";
                      for( let i = 0; i !== 3; i++ )
                          a[i] = parseInt( "0x"+ a[i] + a[i] );
                  }else if(( a = s.match( /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/ )) !== null )
                  {   a[0] = "rgb";
                      for( let i = 0; i !== 3; i++ )
                          a[i] = parseInt( "0x"+ a[i] );
                  }else if(( a = s.match( /^(rgb)\((\d+(?:(?:\.\d+)?%)?), *(\d+(?:(?:\.\d+)?%)?), *(\d+(?:(?:\.\d+)?%)?)\)$/ )) !== null
                  || ( a = s.match( /^(rgba)\((\d+(?:(?:\.\d+)?%)?), *(\d+(?:(?:\.\d+)?%)?), *(\d+(?:(?:\.\d+)?%)?), *(\d+(?:\.\d+)?)\)$/ )) !== null
                  || ( a = s.match( /^(hsl)\((\d+), *(\d+(?:\.\d+)?)%, *(\d+(?:\.\d+)?)%\)$/ )) !== null
                  || ( a = s.match( /^(hsla)\((\d+), *(\d+(?:\.\d+)?)%, *(\d+(?:\.\d+)?)%, *(\d+(?:\.\d+)?)\)$/ )) !== null
                  )
                  {   a.shift();
                      let percent = false;
                      if(( a[0] === "rgb"
                        || a[0] === "rgba"
                        )
                      && a[1][ a[1].length - 1 ] === '%'
                      )
                          percent = true;
                      for( let i = 1; i !== 4; i++ )
                          a[i] = parseFloat( a[i] );
                      if( a.length === 5 )
                          a[4] = parseFloat( a[4] );
                      if(percent)
                          for( let i = 1; i !== 4; i++ )
                              a[i] = a[i] * 255;
                  }else
                      return;
                  return a;
              };
              const Q_color_P_change = ( style_in
              , style_out
              , name
              , inherited
              , as_transparent
              , stage
              ) =>
              {   if( style_in === null )
                      style_in = style_out;
                  const a = Q_css_style_N_color( style_in, name, stage );
                  if( typeof a !== "object" )
                      return;
                  let a_;
                  if( stage === 1
                  && ( a_ = name.match( /^(?:border|outline)/ ) !== null )
                  && ( style[ a_[0] +"Width" ] === ""
                    || style[ a_[0] +"Width" ] === "0px"
                  ))
                      return;
                  name = name.replace( /[A-Z]/g
                  , (s) =>
                    {   return "-"+ s.toLowerCase()
                    }
                  );
                  if( a === "initial"
                  || a === "invert"
                  )
                      style_out.setProperty( name, typeof as_transparent === "object" ? "rgb("+ as_transparent.join() +")" : as_transparent, "important" );
                  else if( a[0] === "rgb" )
                  {   a.shift();
                      if( !H_ocq_Q_object_T_eq( a, inherited )
                      && Q_color_T_almost_equal_gray(a)
                      )
                          style_out.setProperty( name, typeof as_transparent === "object" ? "rgb("+ as_transparent.join() +")" : as_transparent, "important" );
                  }else if( a[0] === "rgba" )
                  {   a.shift();
                      const aa = a.pop();
                      if( aa === 1 )
                      {   if( !H_ocq_Q_object_T_eq( a, inherited )
                          && Q_color_T_almost_equal_gray(a)
                          )
                              style_out.setProperty( name, typeof as_transparent === "object" ? "rgb("+ as_transparent.join() +")" : as_transparent, "important" );
                      }else if(( stage === 0
                        || aa !== 0
                        )
                      && Q_color_T_almost_equal_gray(a)
                      )
                          style_out.setProperty( name, "rgba("+ inherited.join() +","+ aa +")", "important" );
                  }else if( a[0] === "hsl"
                  || a[0] === "hsla"
                  )
                  {   a.shift();
                      if( parseInt( a[1] ) <= Q_color_C_max_gray_diff * 100 )
                          if( a.length === 3 )
                              style_out.setProperty( name, typeof as_transparent === "object" ? "rgb("+ as_transparent.join() +")" : as_transparent, "important" );
                          else
                          {   const aa = a.pop();
                              if( parseFloat(aa) === 1.0 )
                                  style_out.setProperty( name, typeof as_transparent === "object" ? "rgb("+ as_transparent.join() +")" : as_transparent, "important" );
                              else if( stage === 0
                              || parseFloat(aa) !== 0.0
                              )
                                  style_out.setProperty( name, "rgba("+ inherited.join() +","+ aa +")", "important" );
                          }
                  }
              };
              const Q_color_P_correct_color = ( style_in
              , style_out
              ) =>
              {   let a = Q_css_style_N_color( style_in, "color", 1 );
                  if( typeof a !== "object" )
                      return;
                  const b = Q_css_style_N_color( style_in, "backgroundColor", 1 );
                  if( typeof b !== "object" )
                      return;
                  const b_luminance = Q_color_R_luminance(b);
                  if( Q_number_I_abs( Q_color_R_luminance(a) - b_luminance ) < Q_color_C_min_contrast * 3 * 255 )
                  {   a = Q_color_N_ext_contrast( a, b_luminance );
                      style_out.setProperty( "color", a[0] +"("+ a.join() +")", "important" );
                  }
              };
              const T_element_ignored = e =>
              {   return e.tagName === "CANVAS"
                  || e.tagName === "HEAD"
                  || e.tagName === "LINK"
                  || e.tagName === "META"
                  || e.tagName === "SCRIPT"
                  || e.tagName === "STYLE"
                  || e.tagName === "svg"
                  || e.tagName === "VIDEO"
                  || e.id.match( /highlight|player|progress|video/i ) !== null
                  || e.className.match( /highlight|player|progress|video/i ) !== null;
              };
              // Pasywne czyszczenie w zdefiniowanych stylach ‘css’ przeszkód dziedziczenia od właściwości ustawionych dla ‘root’.
              for( let css_i = 0; css_i !== document.styleSheets.length; css_i++ )
              {   try{
                      if( document.styleSheets[ css_i ].cssRules === null )
                          continue;
                  }catch(e)
                  {   continue;
                  }
                  for( let rule_i = 0; rule_i !== document.styleSheets[ css_i ].cssRules.length; rule_i++ )
                  {   const style = document.styleSheets[ css_i ].cssRules[ rule_i ].style;
                      if( !style )
                          continue;
                      if( style.backgroundImage !== ""
                      && style.getPropertyPriority( "background-image" ) !== "important"
                      )
                          style.setProperty( "background-image", style.backgroundImage, "important" );
                      Q_color_P_change( null
                      , style
                      , "backgroundColor"
                      , Q_color_C_default_background, style.position === "absolute" || style.position === "fixed" || ( style.zIndex !== "" && style.zIndex !== "auto" ) ? Q_color_C_default_background : ""
                      , 0
                      );
                      const a = [ "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ];
                      for( let i = 0; i !== a.length; i++ )
                          Q_color_P_change( null
                          , document.styleSheets[ css_i ].cssRules[ rule_i ].style
                          , a[i]
                          , Q_color_C_default_border, Q_color_C_default_border
                          , 0
                          );
                      Q_color_P_change( null
                      , document.styleSheets[ css_i ].cssRules[ rule_i ].style
                      , "color"
                      , Q_color_C_default_text, ""
                      , 0
                      );
                  }
              }
              // Aktywne ustawianie kolorów, które nie zostały pasywnie odziedziczone w kolejnych elementach ‘html’— zmieniając od elementów od góry hierarchii, tak by zmiany były źródłem oczekiwanego dziedziczenia w pozostałych, niższych fragmentach hierarchii.
              let e = document.documentElement;
              const style = document.defaultView.getComputedStyle( e, "" );
              if( style.backgroundImage !== "none"
              && style.getPropertyPriority( "background-image" ) !== "important"
              )
                  e.style.setProperty( "background-image", style.backgroundImage, "important" );
              e.style.setProperty( "background-color", "rgb("+ Q_color_C_default_background.join() +")", "important" );
              const mutations = window[ "H_ocq_E_restyle_S_mutations" ].splice( 0, window[ "H_ocq_E_restyle_S_mutations" ].length );
              const es_ = [];
              for( const mutation of mutations )
              {   if( mutation.type === 'attributes' )
                  {   if( mutation.attributeName !== "style" )
                          continue;
                      es_.push(mutation.target);
                  }else
                      for( e of mutation.addedNodes )
                          es_.push(e);
              }
              const es = [];
              for( let i = 0; i !== es_.length; i++ )
              {   const e = es_[i];
                  if( e === null
                  || e.nodeType !== 1
                  || T_element_ignored(e)
                  )
                      continue;
                  let parent = e;
                  do
                  {   parent = parent.parentNode;
                  }while( parent !== null
                  && parent.tagName !== "HEAD"
                  );
                  if( parent !== null )
                      continue;
                  let b = false;
                  for( let j = 0; j !== es_.length; j++ )
                  {   if( i === j )
                          continue;
                      const e_ = es_[j];
                      let parent = e;
                      do
                      {   if( parent === e_ )
                          {   b = true;
                              break;
                          }
                          parent = parent.parentNode;
                      }while( parent !== null );
                      if(b)
                          break;
                  }
                  if(b)
                      continue;
                  es.push(e);
              }
              for( const e_0 of es )
              {   e = e_0;
                  do
                  {   const style = document.defaultView.getComputedStyle( e, "" );
                      if( e.clientWidth > 0
                      && ( style.width === "auto"
                        || parseInt( style.width, 10 ) > 0 // Czy element jest rysowany na stronie ‘www’.
                      ))
                      {   let b = false;
                          if( style.position === "absolute"
                          || style.position === "fixed"
                          || style.zIndex !== "auto"
                          )
                          {   b = true;
                              if( e !== document.documentElement
                              && e !== document.body
                              )
                              {   if( e.previousElementSibling !== null )
                                  {   const style_ = document.defaultView.getComputedStyle( e.previousElementSibling, "" );
                                      if( e.previousElementSibling.clientWidth > 0
                                      && ( style_.width === "auto"
                                        || parseInt( style_.width, 10 ) > 0
                                      )
                                      && ( style_.position === "absolute"
                                        || style_.position === "fixed"
                                        || style_.zIndex !== "auto"
                                      ))
                                          b = false;
                                  }
                                  if(b)
                                  {   let e_ = e;
                                      while(( e_ = e_.parentNode ) !== document.body ) // Uproszczone sprawdzanie, czy element jest inicjujący jakąkolwiek hierarchię chaotycznego drzewa położeń (“left” itd. oraz “width”, “height”) elementów z wymuszanym “stacking context”.
                                      {   const style_ = document.defaultView.getComputedStyle( e_, "" );
                                          if( e_.clientWidth > 0
                                          && ( style_.width === "auto"
                                            || parseInt( style_.width, 10 ) > 0
                                          )
                                          && ( style_.position === "absolute"
                                            || style_.position === "fixed"
                                            || style_.zIndex !== "auto"
                                          ))
                                          {   b = false;
                                              break;
                                          }
                                          if( e_.previousElementSibling !== null )
                                          {   const style_ = document.defaultView.getComputedStyle( e_.previousElementSibling, "" );
                                              if( e_.previousElementSibling.clientWidth > 0
                                              && ( style_.width === "auto"
                                                || parseInt( style_.width, 10 ) > 0
                                              )
                                              && ( style_.position === "absolute"
                                                || style_.position === "fixed"
                                                || style_.zIndex !== "auto"
                                              ))
                                              {   b = false;
                                                  break;
                                              }
                                          }
                                      }
                                  }
                              }
                              if(b)
                                  e.style.setProperty( "background-color", "rgb("+ Q_color_C_default_background.join() +")", "important" );
                          }
                          if( !b )
                              Q_color_P_change( style
                              , e.style
                              , "backgroundColor"
                              , Q_color_C_default_background, Q_color_C_default_background
                              , 1
                              );
                          if( style.backgroundImage !== "none"
                          && style.getPropertyPriority( "background-image" ) !== "important"
                          )
                              e.style.setProperty( "background-image", style.backgroundImage, "important" );
                          const a = [ "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ];
                          for( let i = 0; i !== a.length; i++ )
                              Q_color_P_change( style
                              , e.style
                              , a[i]
                              , Q_color_C_default_border, Q_color_C_default_border
                              , 1
                              );
                          Q_color_P_change( style
                          , e.style
                          , "color"
                          , Q_color_C_default_text, Q_color_C_default_text
                          , 1
                          );
                          Q_color_P_correct_color( style
                          , e.style
                          );
                      }
                      let e_;
                      if(( e_ = e.firstElementChild ) === null
                      || ( T_element_ignored( e_ ) && ( e = e_, true ))
                      )
                          while( e !== e_0 )
                          {   do
                                  e_ = e.nextElementSibling;
                              while( e_ !== null && e_ !== undefined
                              && ( T_element_ignored( e_ ) && ( e = e_, true ))
                              );
                              if( e_ !== null
                              && e_ !== undefined
                              )
                                  break;
                              e = e.parentNode;
                          }
                      e = e_;
                  }while( e !== null );
              }
              if( window[ "H_ocq_E_restyle_S_mutations" ].length )
                  window[ "H_ocq_E_restyle_S_timeout" ] = window.setTimeout( I_restyle, 360 );
              else
                  delete window[ "H_ocq_E_restyle_S_timeout" ];
          };
          if( window[ "H_ocq_E_restyle_S_observer" ] === undefined )
          {   window[ "H_ocq_E_restyle_S_mutations" ] =
              [ { 'type': 'childList'
                , 'addedNodes': [ document.body ]
                }
              ];
              window[ "H_ocq_E_restyle_S_observer" ] = new MutationObserver( I_restyle_I_add_mutations );
              window[ "H_ocq_E_restyle_S_timeout" ] = window.setTimeout( I_restyle, 360 );
              window[ "H_ocq_E_restyle_S_observer" ].observe( document.documentElement
              , { "subtree": true
                , "childList": true
                , "attributes": true
                , "attributeFilter": [ "style" ]
                }
              );
              document.addEventListener( "beforeunload"
              , () =>
                {  window[ "H_ocq_E_restyle_S_observer" ].disconnect();
                    if( window[ "H_ocq_E_restyle_S_timeout" ] !== undefined
                    && window[ "H_ocq_E_restyle_S_timeout" ] !== null
                    )
                        window.clearTimeout( window[ "H_ocq_E_restyle_S_timeout" ] );
                }
              );
          }
      }
    );
})();
/******************************************************************************/
