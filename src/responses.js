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
    message: 'This is a successful response.',
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
    message: 'This request has the required parameters.',
  };

  // If the valid parameter is not present or not equal to true
  if (!params.valid || params.valid !== 'true') {
    responseData.message = 'Missing valid query parameter set to true.';
    responseData.id = 'badRequest';

    // If an xml request, return xml response
    if (acceptedTypes[0] === 'text/xml') {
      let xmlString = '<response>';
      xmlString += `<message>${responseData.message}</message>`;
      xmlString += `<id>${responseData.id}</id>`;
      xmlString += '</response>';
      return respond(request, response, xmlString, acceptedTypes[0], 400);
    }

    // Return JSON response
    return respond(request, response, JSON.stringify(responseData), 'application/json', 400);
  }

  // If xml request, return xml response
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 200);
  }

  // Return JSON response
  return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

// Get Unauthorized
const getUnauthorized = (request, response, acceptedTypes, params) => {
  // Initial Data Object
  const responseData = {
    message: 'You have successfully viewed the content.',
  };

  // If the loggedIn parameter is not present or not set to yes
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // Updates responseData
    responseData.message = 'Missing loggedIn query parameter set to yes.';
    responseData.id = 'unauthorized';

    // If an xml request, return an XML response
    if (acceptedTypes[0] === 'text/xml') {
      let xmlString = '<response>';
      xmlString += `<message>${responseData.message}</message>`;
      xmlString += `<id>${responseData.id}</id>`;
      xmlString += '</response>';
      return respond(request, response, xmlString, acceptedTypes[0], 401);
    }

    // Return a JSON response
    return respond(request, response, JSON.stringify(responseData), acceptedTypes[0], 401);
  }

  // If an xml request, return an xml response
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 200);
  }

  // Return JSON response
  return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

// Get Forbidden
const getForbidden = (request, response, acceptedTypes) => {
  // Initial Data Object
  const responseData = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // If an xml request, return an xml response
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += `<id>${responseData.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 403);
  }

  // Return JSON response
  return respond(request, response, JSON.stringify(responseData), 'application/json', 403);
};

// Get Internal
const getInternal = (request, response, acceptedTypes) => {
  // Initial Data Object
  const responseData = {
    message: 'Internal server error. Something went wrong.',
    id: 'internalError',
  };

  // If an xml request, return an xml response
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += `<id>${responseData.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 500);
  }

  // Return JSON response
  return respond(request, response, JSON.stringify(responseData), 'application/json', 500);
};

// Get Not Implemented
const getNotImplemented = (request, response, acceptedTypes) => {
  // Initial Data Object
  const responseData = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // If an xml request, return an xml response
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += `<id>${responseData.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 501);
  }

  // Return JSON response
  return respond(request, response, JSON.stringify(responseData), 'application/json', 501);
};

// Get Not Found
const getNotFound = (request, response, acceptedTypes) => {
  // Initial Data Object
  const responseData = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  // If an xml request, return an xml response
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${responseData.message}</message>`;
    xmlString += `<id>${responseData.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, xmlString, acceptedTypes[0], 404);
  }

  // Return JSON response
  return respond(request, response, JSON.stringify(responseData), 'application/json', 404);
};

// Exports
module.exports = {
  getIndex,
  getStyle,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};
