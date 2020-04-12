# Delivery Much Challenge

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
