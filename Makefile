#
# obsidian-plugin-e2e-test | Makefile
#

mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

e2e:
	docker build -t obsidian .
	docker run --rm --security-opt seccomp="$(current_dir)/chrome.json" obsidian
