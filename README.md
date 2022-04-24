# website

## Getting Started

Install [Go](https://go.dev/doc/install).

Install [gow](https://github.com/mitranim/gow).

Install Go packages:
```bash
go mod download
```

Start server:
```bash
gow -v -c -e go,mod,pug run .
```

## Build

Install [Docker](https://docs.docker.com/get-docker/).

```bash
docker build . -t test
```

```bash
docker run -p 3000:3000 --rm test
```
