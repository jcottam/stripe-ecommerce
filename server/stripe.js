"use strict";

const auth = require("./auth");

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const postPayment = async (event, context) => {
  try {
    await auth.checkAuthBearer(event.headers.Authorization);
    const body = JSON.parse(event.body);
    console.log("\npostPayment", body);
    // token (source) is created using Checkout or Elements (client)
    const { amount, currency, description, metadata, source } = body;
    // https://stripe.com/docs/api/charges/create
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      statement_descriptor: "Adventures w Beanie",
      source,
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
  postPayment
};
