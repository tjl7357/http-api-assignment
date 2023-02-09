// Requires
const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');

// Establish Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL Struct
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getStyle,
  '/success': responseHandler.getSuccess,
  '/badRequest': responseHandler.getBadRequest,
  '/unauthorized': responseHandler.getUnauthorized,
  '/forbidden': responseHandler.getForbidden,
  '/internal': responseHandler.getInternal,
  '/notImplemented': responseHandler.getNotImplemented,
  notFound: responseHandler.getNotFound,
};

// Response Function
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  const func = urlStruct[parsedUrl.pathname];
  if (func) {
    func(request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

// Create the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
