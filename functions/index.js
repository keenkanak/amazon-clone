const functions = require("firebase-functions");
const stripe = require("stripe")(
  "sk_test_51J8W3RSDsXsHZowCKVlbJNgm0TNdBD6zxrwnYQ9RuGoyHmCIMnP6H9UTtHXZ7ZbWXHb91lFbHsSp7d7a4XUIFVQv001Csk3UPi"
);
const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hey");
  console.log("hey");
});

app.post("/payments/create", async (req, res) => {
  var customer = await stripe.customers.create({
    name: "Jenny Rosen",
    address: {
      line1: "510 Townsend St",
      postal_code: "98140",
      city: "San Francisco",
      state: "CA",
      country: "US",
    },
  });

  const total = parseInt(req.query.total);
  console.log(req.query);
  console.log(req.query.total);
  console.log("[index.js] Payment request received for amount", total);
  const paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    amount: total,
    currency: "usd",
    payment_method_types: ["card"],
  });
  // console.log(paymentIntent);
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
