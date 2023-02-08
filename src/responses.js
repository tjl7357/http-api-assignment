// Requires
const fs = require('fs');

// Get necessary files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

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

// Get CSS Stylesheet
const getStyle = (request, response) => {
  respond(request, response, style, 'text/css', 200);
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
  // Initial Data Object
  const responseData = {
    message: 'This request has the required parameters',
  };

  // If the valid parameter is not present or not equal to true
  if (!params.valid || params.valid !== 'true') {
    responseData.message = 'Missing valid query parameter set to true';
    responseData.id = 'badRequest';

    // If xml request, return xml response
    if (acceptedTypes[0] === 'text/xml') {
      let xmlString = '<response>';
      xmlString += `<message>${responseData.message}</message>`;
      xmlString += `<id>${responseData.id}</id>`;
      xmlString += '</response>';
      return respond(request, response, xmlString, acceptedTypes[0], 400);
    }

    // Return JSON response
    return respond(request, response, JSON.stringify(responseData), 'application/json', 400);
  } else {
    // If xml request, return xml response
    if (acceptedTypes[0] === 'text/xml'){
      let xmlString = '<response>';
      xmlString += `<message>${responseData.message}</message>`;
      xmlString += '</response>';
      return respond(request, response, xmlString, acceptedTypes[0], 200);
    }
    
    // Return JSON response
    return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
  }

  
};

// Exports
module.exports = {
  getIndex,
  getStyle,
  getSuccess,
  getBadRequest,
};
