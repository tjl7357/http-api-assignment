// Requires
const fs = require('fs');

// Get necessary files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// Responses Function
const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// Get Index
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

// Get Success
const getSuccess = (request, response, acceptedTypes) => {
  const responseData = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 200);
  }

  return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

// Get Bad Request
const getBadRequest = (request, response, acceptedTypes, params) => {
  const responseData = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseData.message = 'Missing valid query parameter set to true';
    responseData.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let xmlString = '<response>';
      xmlString += `<message>${responseData.message}</message>`;
      xmlString += `<id>${responseData.id}</id>`;
      xmlString += '</response>';
      return respond(request, response, xmlString, acceptedTypes[0], 400);
    }

    return respond(request, response, JSON.stringify(responseData), 'application/json', 400);
  } else {
    if (acceptedTypes[0] === 'text/xml'){
      let xmlString = '<response>';
      xmlString += `<message>${responseData.message}</message>`;
      xmlString += '</response>';
      return respond(request, response, xmlString, acceptedTypes[0], 200);
    }
    
    return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
  }

  
};

// Exports
module.exports = {
  getIndex,
  getSuccess,
  getBadRequest,
};
