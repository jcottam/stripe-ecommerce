"use strict";

const auth = require("./auth");

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getCharges = async (event, context) => {
  try {
    const result = await stripe.charges.list({ limit: 100 });
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createCharge = async (event, context) => {
  try {
    await auth.checkAuthBearer(event.headers.Authorization);
    const body = JSON.parse(event.body);
    const { amount, currency, description, metadata, source } = body;
    // https://stripe.com/docs/api/charges/create
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      statement_descriptor: "Adventure with Beanie",
      source, //Token originating from client via Stripe.js & Stripe Elements
      metadata
    });
    console.log({ id: charge.id, amount: charge.amount });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(charge)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode,
      headers: {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(err.raw)
    };
  }
};

module.exports = {
  createCharge,
  getCharges
};
