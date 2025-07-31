# Stripe E-Commerce Application

https://stripe.johnryancottam.com/

## Application Overview

_Adventure with Beanie_ is a responsive e-commerce SPA where users can book outdoor adventures led by Beanie the Poodle—an experienced, enthusiastic guide for activities like rock climbing and bird watching.

Built with [Vue.js](https://vuejs.org/), the app is powered by [Stripe](https://stripe.com/) for secure payments, using HTTPS and a serverless function on [AWS](https://aws.amazon.com/).

**Key technologies:**

- **Client-side:** [Stripe.js](https://stripe.com/docs/web/setup) and [Stripe Elements](https://stripe.com/payments/elements) for the checkout UI.
- **Server-side:** Stripe’s [Node.js library](https://stripe.com/docs/libraries#node) for handling payments.

## Development Approach

I started by reviewing the [Stripe Quickstart docs](https://stripe.com/docs/development) and setting up a Stripe account for API keys. I created a new GitHub repo with separate client and server directories, focusing first on the Vue.js front-end using [Vue CLI](https://cli.vuejs.org/). Once the initial SPA was running locally, I implemented the backend as an [AWS Lambda](https://aws.amazon.com/lambda/) function using the [Serverless framework](https://serverless.com/).

With both ends running, I designed the content, layout, and user flow on paper, drawing inspiration from other e-commerce sites to ensure responsive design on both mobile and desktop. After coding out the front-end components based on these wireframes, I integrated [Stripe.js](https://stripe.com/docs/web/setup) and [Elements](https://stripe.com/payments/elements) for checkout, enabling secure payment tokenization.

Once payment tokens could be generated on the front-end, I developed a backend POST handler to process transactions. I iteratively refined both ends, testing and adjusting request/response handling.

After final UI tweaks and thorough testing, I deployed the front-end to [Netlify](https://www.netlify.com/) and the backend to [AWS](https://aws.amazon.com/), setting up a custom domain at https://stripe.johnryancottam.com/.

## Language & Framework

I chose [Vue](https://vuejs.org/) for the front-end due to its simplicity and my familiarity with it, especially its centralized store [Vuex](https://vuex.vuejs.org/). The static front-end is hosted on [Netlify](https://www.netlify.com/) for CDN-backed performance.

For the backend, I used a serverless [Node.js](https://nodejs.org/en/) Lambda for its lightweight, flexible, and fast deployment.

## Potential Improvements

Future enhancements could include:

- Capturing customer billing address and email
- Sending email confirmations
- Persisting the shopping cart with _localStorage_ to handle low-bandwidth or accidental refreshes
- Saving customer cards for faster future checkouts via [Stripe Customer API](https://stripe.com/docs/saving-cards)
- Using _metadata_ to attach internal order numbers to Stripe payments for reconciliation
- Adding Apple Pay via the [Payment Request Button](https://stripe.com/docs/stripe-js/elements/payment-request-button#payment-request-button-element)
