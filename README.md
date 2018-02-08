# rest_api
_A REST API built with Express and Mongoose that serves a simple Account model._

### Installation
rest_api requires [Node.js](https://nodejs.org/) v8+ to run.<br />
Make sure to have a working Mongo database running.

Install the dependencies and start the server.

```sh
$ cd rest_api
$ npm install -d
$ node server
```

The "Account" model is described as:
```javascript
{
  name: String,
  balance: Number
}
```

## Request examples using curl

### GET requests
```sh
curl -X GET "http://localhost:8080/accounts/" 
curl -X GET "http://localhost:8080/accounts/last" 
```

### POST requests
```sh
curl -X POST -H "Content-Type: application/json"  -d '{"balance": "2000", "name": "savings"}' "http://localhost:8080/accounts"
```

### PUT requests
_Note: Replace __ObjectID__ by the ID of an actual element of the collection._
```sh
curl -X PUT -H "Content-Type: application/json" -d '{"balance": "1500"}' "http://localhost:8080/accounts/ObjectID"
```


### DELETE requests
_Note: Replace __ObjectID__ by the ID of an actual element of the collection._
```sh
curl -X DELETE "http://localhost:8080/accounts/ObjectID"
curl -X DELETE "http://localhost:8080/accounts/delete/last"
```



