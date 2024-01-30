PATH := $(shell go env GOPATH)/bin:$(PATH)

COLOR := "\e[1;36m%s\e[0m\n"

ROOT_DIR = $(shell pwd)

PROTO_ROOT := ${ROOT_DIR}/proto
PROTO_OUT := $(ROOT_DIR)/pb

COVERAGE_ROOT := ${ROOT_DIR}/.coverage
COVERAGE_OUT := $(COVERAGE_ROOT)/out
COVERAGE_OUT_DETAIL := $(COVERAGE_OUT).detail
COVERAGE_OUT_HTML := $(COVERAGE_OUT).html

##### Build tools #####

.PHONY: install-build-tools
install-build-tools:
	@printf $(COLOR) "Install build tools..."
	@go install github.com/bufbuild/buf/cmd/buf@latest
	@go install github.com/golang/mock/mockgen@latest
	@go install github.com/pressly/goose/v3/cmd/goose@latest
	@go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	@go install golang.org/x/vuln/cmd/govulncheck@latest

##### Codegen #####

.PHONY: codegen
codegen: codegen-proto codegen-go

.PHONY: codegen-go
codegen-go:
	@printf $(COLOR) "Generate go..."
	@go generate ./...

.PHONY: codegen-proto
codegen-proto:
	@printf $(COLOR) "Generate proto..."
	@rm -rf $(PROTO_OUT)
	@(cd $(PROTO_ROOT) && buf generate --template $(ROOT_DIR)/buf.gen.yaml --output ../)

##### Format #####

.PHONY: format
format: format-proto format-go

.PHONY: format-go
format-go:
	@printf $(COLOR) "Format go..."
	@go fmt ./...

.PHONY: format-proto
format-proto:
	@printf $(COLOR) "Format proto..."
	@(cd $(PROTO_ROOT) && buf format -w)

##### Lint #####

.PHONY: lint
lint: lint-proto lint-go

.PHONY: lint-go
lint-go:
	@printf $(COLOR) "Lint go..."
	@golangci-lint run ./...

.PHONY: lint-proto
lint-proto:
	@printf $(COLOR) "Lint proto..."
	@(cd $(PROTO_ROOT) && buf lint)

##### Test #####

.PHONY: test
test:
	@printf $(COLOR) "Test..."
	@go test -race ./...

.PHONY: integration-test
integration-test:
	@printf $(COLOR) "Integration test..."
	@INTEGRATION=1 go test -v ./integration-tests/...

##### Coverage #####

.PHONY: coverprofile
coverprofile:
	@printf $(COLOR) "Generate coverage profile..."
	@mkdir -p $(COVERAGE_ROOT)
	@go test -coverprofile=$(COVERAGE_OUT) -covermode=atomic ./...

.PHONY: coverage-report-ci
coverage-ci: coverprofile
	@printf $(COLOR) "Generate CI coverage report..."
	@go tool cover -func=$(COVERAGE_OUT) -o=$(COVERAGE_OUT_DETAIL)

.PHONY: coverage-report-html
coverage-html: coverprofile
	@printf $(COLOR) "Generate HTML coverage report..."
	@go tool cover -html=$(COVERAGE_OUT) -o=$(COVERAGE_OUT_HTML)
	@open $(COVERAGE_OUT_HTML)
