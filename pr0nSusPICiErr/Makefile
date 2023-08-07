#*******************************************************************************
#   ___   workplace
#  ¦OUX¦  ‟GNU” “make”
#  ¦/C+¦  compile
#   ---   ‟chromium” extension
#         makefile
# ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒1‒8 #
#*******************************************************************************
.PHONY: all build clean rebuild dist distclean FORCE
all: build
rebuild: clean build
dist: 1.zip
#===============================================================================
override update_url := $(strip $(update_url))
override homepage_url := $(strip $(homepage_url))
#===============================================================================
1:
	mkdir 1
1/manifest.json: 0/manifest.json FORCE
	chromium-ex-ver-inc.sh $<
	json-minify $< >$@
1/%.css: 0/%.css
	ln -fT -- $< $@
1/%.html: 0/%.html
	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true -o $@ $<
1/%.js: 0/%.js
	touch $@
1/%.gif: 0/%.gif
	ln -fT -- $< $@
1/%.png: 0/%.png
	ln -fT -- $< $@
build: 1 1/manifest.json $(patsubst 0/%,1/%,$(wildcard 0/*))
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
	fi \
	&& chmod -R g=rX 1
1.zip: build
	rm -f 1/manifest.json ;\
	head_line=$$( grep -ne '^, *"key"' 0/manifest.json | cut -d : -f 1 ) ;\
	head -n $$( expr $$head_line - 1 ) 0/manifest.json >1/manifest.json \
	&& if [ -n "$(update_url)" ]; then \
		echo ', "update_url": "$(update_url)"' >>1/manifest.json ;\
	fi \
	&& if [ -n "$(homepage_url)" ]; then \
		echo ', "homepage_url": "$(homepage_url)"' >>1/manifest.json ;\
	fi \
	&& tail -n +$$( expr $$head_line + 1 ) 0/manifest.json >>1/manifest.json \
	&& cd 1 \
    && zip -9r ../1.zip * \
	&& chmod g+r ../1.zip
#------------------------------------------------------------------------------
clean: distclean
	rm -f $(patsubst 0/%,1/%,$(wildcard 0/*)) 1/_locales/en/messages.json
distclean:
	rm -f 1.zip
#*******************************************************************************
