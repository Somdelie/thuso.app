const stripe = require("stripe")(
  "sk_test_51IkeFOCXOHdk1RF1IfVyRpqBdFnYoPQHU7hWDc3Q3NRJuhjidv3uxcK5emQU011QPnBjV15aVzKbcmsJiVgD1jQr001WbAxl14"
);

export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "usd",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "month",
    },
    product_data: {
      name: "Premium Plan",
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}

export async function createStripePaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: "http://localhost:3000/membership" + "/?status=success",
    cancel_url: "https://thuso-app.vercel.app/membership" + "/?status=cancel",
  });

  return {
    success: true,
    id: session?.id,
  };
}
