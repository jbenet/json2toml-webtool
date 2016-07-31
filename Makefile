
build: deps
	mkdir -p build
	cp index.html build/index.html
	node_modules/.bin/browserify main.js -o build/main.js

deps: node_modules
	@ipfs version >/dev/null

node_modules:
	npm version
	npm install

show: build
	python -m SimpleHTTPServer 9000 build

clean:
	rm -rf build

versions = .versions
local = "http://localhost:8080"
gway = "https://ipfs.io/ipfs/"

publish: deps
	@ipfs swarm peers >/dev/null || (echo "ipfs daemon must be online to publish" && exit 1)
	ipfs add -r -q build | tail -n1 >$(versions)

	@# keep versions unique
	@cat $(versions) | uniq >$(versions)2
	@mv $(versions)2 $(versions)

	@export hash=`tail -n1 $(versions)`; \
		echo ""; \
		echo "published website:"; \
		echo "- $(local)$$hash"; \
		echo "- $(gway)$$hash"; \
		echo ""; \
		echo "next steps:"; \
		echo "- ipfs pin add -r /ipfs/$$hash"; \
