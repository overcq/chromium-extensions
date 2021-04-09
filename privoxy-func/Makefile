################################################################################
#   ___   workplace
#  ¦OUX¦  ‟GNU” “make”
#  ¦/C+¦  compile
#   ---   ‟chromium” extension
#         makefile
# ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒1‒8 #
################################################################################
.PHONY: all build clean rebuild dist distclean
all: build
rebuild: clean build
dist: 1.crx
#===============================================================================
override update_url := $(strip $(update_url))
override homepage_url := $(strip $(homepage_url))
#===============================================================================
1:
	mkdir 1
1/%: 0/%
	ln -fT -- $< $@
build: 1 0/manifest.json $(patsubst 0/%,1/%,$(filter-out %.js,$(wildcard 0/*)))
	./0-messages.pl $(wildcard 0/*.js)
	[ -d 1/_locales/en ] || mkdir -p 1/_locales/en
	tmp_file="$$( mktemp )" ;\
    trap 'rm -- "$$tmp_file"' EXIT ;\
    if [ '$(notdir $(realpath $(wildcard .)))' != 'shared-library' ]; then \
        ./1-messages.pl extension_sh_lib_uid='ngodelncdemhlbmkihcndmecpphhlhhk' extensions_url='$(extensions_url)' $(wildcard 0/*.js) >"$$tmp_file" ;\
    else \
        ./1-messages.pl extensions_url='$(extensions_url)' $(wildcard 0/*.js) >"$$tmp_file" ;\
    fi \
    && if ! diff -Nq "$$tmp_file" 1/_locales/en/messages.json >/dev/null; then \
        cp -- "$$tmp_file" 1/_locales/en/messages.json ;\
    fi \
    && if [ -e 1/0.js -a -e 1/options_page.js ]; then \
		perl -e 'local $$/; $$cnt = <>; print $$& if $$cnt =~ s`^var E_conf_S_defaults\s*=.*?^};\n?``ms;' 1/0.js >"$$tmp_file" \
		&& cat 1/options_page.js >>"$$tmp_file" \
		&& cp -- "$$tmp_file" 1/options_page.js ;\
	fi \
    && if [ "$(wildcard 1/*.js)" != "" ]; then \
	    for f in 1/*.js; do \
			js-clc <"$$f" >"$$tmp_file" \
			&& cp "$$tmp_file" "$$f" ;\
		done ;\
	fi
# https://developers.google.com/closure/compiler/docs/gettingstarted_app
1.crx: build
	if [ -n "$(update_url)" -o -n "$(homepage_url)" ]; then \
        rm -f 1/manifest.json ;\
        head_line=$$( grep -ne '^, *"key"' 0/manifest.json | cut -d : -f 1 ) ;\
        head -n $$head_line 0/manifest.json >1/manifest.json \
        && if [ -n "$(update_url)" ]; then \
            echo ', "update_url": "$(update_url)"' >>1/manifest.json ;\
        fi \
        && if [ -n "$(homepage_url)" ]; then \
            echo ', "homepage_url": "$(homepage_url)"' >>1/manifest.json ;\
        fi \
        && tail -n +$$( expr $$head_line + 1 ) 0/manifest.json >>1/manifest.json ;\
    fi \
    && \
    { if [ -e 1.pem ]; then \
          chromium-browser --pack-extension=1 --pack-extension-key=1.pem ;\
      elif [ -e 0.pem ]; then \
          chromium-browser --pack-extension=1 --pack-extension-key=0.pem ;\
      else \
          chromium-browser --pack-extension=1 ;\
      fi ;\
      true ;\
    }
#------------------------------------------------------------------------------
clean: distclean
	rm -f $(patsubst 0/%,1/%,$(wildcard 0/*)) 1/_locales/en/messages.json
distclean:
	rm -f 1.crx ;\
    ln -fT 0/manifest.json 1/manifest.json
################################################################################
