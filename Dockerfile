FROM golang:1.18.1-alpine as build

WORKDIR /build

COPY go.mod ./
COPY go.sum ./
RUN go mod download && go mod verify

COPY *.go ./
COPY public ./
COPY views ./

RUN go build -o /app

FROM alpine

WORKDIR /

RUN apk add dumb-init

COPY --from=build /app /app
COPY public /public
COPY views /views

EXPOSE 3000

# Run dumb-init to take PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ./app
