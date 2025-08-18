"use strict";

// check for valid authorization token
const checkAuthBearer = async auth => {
  if (auth) {
    const tokenParts = auth.split(" ");
    const tokenValue = tokenParts && tokenParts.length ? tokenParts[1] : null;
    if (tokenValue && tokenValue === process.env.AUTHORIZATION_TOKEN) {
      return true;
    }
  }
  throw {
    statusCode: 401,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
    },
    body: "Unauthorized"
  };
};

module.exports = {
  checkAuthBearer
};
