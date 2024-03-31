(() =>
{   let e = document.body;
    do
    {   if( e.nodeName !== "A"
        && e.nodeName !== "BUTTON"
        )
            for( const e_ of e.childNodes )
                if( e_.nodeType === 3 )
                {   let s = e_.nodeValue;
                    const re = /\bhttps?:\/\/[0-9A-Za-z.­-]+\/[0-9A-Za-z._%\/?&=-]+/;
                    let m = s.match(re);
                    if( m !== null )
                    {   const f = document.createDocumentFragment();
                        do
                        {   f.append( s.substring( 0, m.index ));
                            const a = document.createElement( "A" );
                            a.href = m[0];
                            a.setAttribute( "target", "_blank" );
                            a.append( m[0] );
                            f.append(a);
                            s = s.substring( m.index + m[0].length );
                            m = s.match(re);
                        }while( m !== null );
                        f.append(s);
                        e_.replaceWith(f);
                    }
                }
        if( e.nodeType === 1 )
            if( e.firstElementChild !== null )
                e = e.firstElementChild;
            else if( e.nextElementSibling !== null )
                e = e.nextElementSibling;
            else
            {   do
                {   e = e.parentNode;
                }while( e !== document.body
                && e.nextElementSibling === null
                );
                if( e !== document.body )
                    e = e.nextElementSibling;
            }
    }while( e !== document.body );
})();
