1. The core features of Node.js and Express and why they are useful.

   > Node allows us to use Javascript for the client and the server and gives access to the npm registry. With npm we can install express, a JS framework that sits on top of a Node server and acts similar to a react application - serving middleware functions that get data from a server based on a route "/api/oranges/banana"

2. Understand and explain the use of Middleware.

   > Middleware are functions written to perform specific tasks in order. We can implement middleware in a node app with express by invoking server.use(middleware here(helmet, cors, express.json(), or custom middleware)). This will run our middleware before every route(which is also middleware?).

3. The basic principles of the REST architectural style.

   > Everything in the file is a resource, accessible thru a single unique URL ('/api/auth/banana-scandal')
   > Communication is done over stateless protocol (HTTP)
   > Resource management done with HTTP methods
   > Client-server based - same server for multiple clients(ios, android, browser)
   > Items are cache-able (stored on client and used when needed)

4. Understand and explain the use of Express Routers.

   > Express routers are a way to direct incoming requests from the client to the appropriate request handler functions - These are the endpoints the client will hit when requesting data from a server.

5. Describe tooling used to manually test the correctness of an API.

   > We can manually test the correctness of an API using the tools other awesome developers made for us. HTTPie is my favorite method, passing in the raw body data as query strings, but I also find using Postman very helpful because it allows you to save endpoints and save data as raw JSON. I'm sure tools like postman and Insomnia are much more practical for large scale data testing.
