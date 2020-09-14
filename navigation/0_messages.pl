#!/usr/bin/perl -w
################################################################################
#   ___   workplace
#  ¦OUX¦  ‘unix’ ‘shell’ environment
#  ¦Inc¦  compile
#   ---   ‟chromium” extension
#         messages preprocessing
# ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒1‒8 #
################################################################################
use warnings;
use strict;
use utf8;
#===============================================================================
my %message = ();
my $message_new_uid = 0;
foreach( @ARGV )
{   my $file;
    open $file, '<', $_ or die $!;
    local $/;
    my $cnt = <$file>;
    close $file;
    $cnt =~ s{([0-9]+)%`([^`]*)`[^`]*`}
    {   $message{ $1 } = $2;
        if( $1 >= $message_new_uid )
        {   $message_new_uid = $1 + 1;
        }
        $&;
    }eg;
}
foreach my $filename ( @ARGV )
{   my $file;
    open $file, '<', $filename or die $!;
    local $/;
    my $cnt = <$file>;
    close $file;
    my $any_new = 0;
    $cnt =~ s{(^|[^0-9])(%`([^`]*)`[^`]*`)}
    {   my $found = 0;
        foreach( keys %message )
        {   if( $message{ $_ } eq $3 )
            {   $found = 1;
                $_ .= $&;
                last;
            }
        }
        if( !$found )
        {   $_ = $1 . $message_new_uid . $2;
            $message{ $message_new_uid } = $3;
            $message_new_uid++;
            $any_new = 1;
        }
        $_;
    }eg;
    if( $any_new )
    {   open $file, '>', $filename or die $!;
        print $file $cnt;
        close $file;
    }
}
################################################################################
