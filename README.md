# Stripe E-Commerce Application

https://stripe.johnryancottam.com/

## Application Overview

_Adventure with Beanie_ is a responsive e-commerce application that allows users to purchase adventures led by Beanie the Poodle. Beanie loves exploring the outdoors, is an experienced traveler, and enjoys guiding others on memorable adventures ranging from rock climbing to bird watching.

_Adventure with Beanie_ is a single page application (SPA) built atop [Vue.js](https://vuejs.org/), a progressive JavaScript framework. The e-commerce is powered by [Stripe](https://stripe.com/), and payments are securely processed over HTTPS protocol with the help of a serverless function hosted on [Amazon Web Services](https://aws.amazon.com/).

**The application utilizes 2 Stripe APIs and a UI component library:**

- **Client-side APIs:** Stripe web client , [Stripe.js](https://stripe.com/docs/web/setup), in combination with UI library, [Stripe Elements](https://stripe.com/payments/elements).
- **Server-side APIs:** Stripe [Node.js library](https://stripe.com/docs/libraries#node)

## How did I approach the problem?

I first reviewed the [Quickstart docs](https://stripe.com/docs/development) and familiarized myself with the requirements to get up and running with Stripe. I then registered for a Stripe account to obtain API keys for testing. Once registered, I created a new repository on GitHub with a _client_ and a _server_ directory. I focused on the client (front-end) first. I developed the front-end using [Vue](https://vuejs.org/) with the help of [Vue CLI tooling](https://cli.vuejs.org/). Once I had a “hello world” front-end application running locally, I switched over to the back-end to do the same. I developed the back-end as an [AWS Lambda](https://aws.amazon.com/lambda/) with the help of the [Serverless framework](https://serverless.com/). Once I was successful running the Lambda locally, testing with a GET request, I switched to design.

I designed the content, layout, and user flow of the application on pen and paper. I browsed a few e-commerce experiences for design ideas, both mobile and desktop. I decided on a responsive layout that would function across mobile and desktop devices. Once design and flow were defined on paper, I went back into the front-end code and developed the views and components to support my wireframes.

Once the UI was in a comfortable state, I integrated [Stripe.js](https://stripe.com/docs/web/setup) and [Elements UI Library](https://stripe.com/payments/elements) within the checkout view. Stripe.js is primarily responsible for securely transmitting a customer’s payment information to Stripe in exchange for a _token_.

Once I was successful in obtaining a _token_ on the front-end, I moved to the back-end to develop a POST handler to accept the _token_ and process the payment transaction. I oscillated between the front-end and back-end as I tested and tweaked the _body_ of the POST and the manner in which its response was handled on the front-end.

After some UI refinement and further testing, I deployed the client to [Netlify](https://www.netlify.com/) and the server to [AWS](https://aws.amazon.com/). Once deployed, I setup a custom domain to point to my Netlify instance, https://stripe.johnryancottam.com/

## Language & Framework

I appreciate the usability and performance benefits of well constructed Single Page Applications (SPAs), so I considered [React](https://reactjs.org/) or [Vue](https://vuejs.org/) for my front-end framework. Ultimately I decided on Vue because that’s what I’m most comfortable with and I like the simplicity of its centralized store, [Vuex](https://vuex.vuejs.org/).

I decided to host my front-end on [Netlify](https://www.netlify.com/) because the compiled front-end is static and could therefore be distributed on a Content Delivery Network (CDN) for optimal page-load speed.

I went the serverless approach with the back-end because it’s lightweight, flexible, and quick to deploy. I configured my serverless Lambda with [Node](https://nodejs.org/en/) as the runtime language because that’s what I’m most comfortable with and its capabilities are sufficient for the objective.

## How might I extend the application?

I enjoyed building this application and would like to extend it by adding the following functionality:

- a view to capture customer billing address and email
- an ability to send an email confirmation to customer
- the ability to persist shopping cart to _localStorage_ to protect cart in low-bandwidth and accidental browser-refresh scenarios
- the ability to save customer card information for expedited future checkouts via the [Stripe Customer API](https://stripe.com/docs/saving-cards)
- the ability to pass along internal order number, via _metadata_, to Stripe for easy reconciliation
- integrate the ability to pay with Apple Pay, [Payment Request Button](https://stripe.com/docs/stripe-js/elements/payment-request-button#payment-request-button-element)
