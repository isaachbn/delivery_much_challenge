# Delivery Much Challenge

This application follows this documentation [delivery-much-challenge](https://github.com/delivery-much/challenge)

## Run application

### Build application

```cmd
docker build -t delivery_much_challenge .
```

### Running application

```cmd
docker run -p "3000:3000" -d delivery_much_challenge:latest
```

### Test application
```cmd
curl --request GET --url 'http://localhost:3000/recipes/?i=onions%2Capple'
```

## For developers

### Run as development mode
```cmd
yarn development
```

### Run the acceptance tests
```cmd
yarn test
```
