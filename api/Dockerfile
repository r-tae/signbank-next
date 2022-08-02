FROM golang:1.18.4-alpine as builder

WORKDIR /app

COPY . .

RUN go build -o signbank-api main.go

FROM golang:1.18.4-alpine

WORKDIR /app

COPY --from=builder /app/signbank-api .

EXPOSE 3000

CMD ["./signbank-api"]
