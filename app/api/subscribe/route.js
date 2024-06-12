import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const createSubscription = async (req, res) => {
  if (req.method === "POST") {
    const { email, paymentMethodId, planId } = req.body;

    try {
      // Create a new customer
      const customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Create a subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: planId }],
        expand: ["latest_invoice.payment_intent"],
      });

      // Update profile in the database
      const updatedProfile = await prisma.profile.update({
        where: { email },
        data: {
          stripeCustomerId: customer.id,
          stripeSubscriptionId: subscription.id,
          isPremiumUser: true,
          memberShipType: planId,
          memberShipStartDate: new Date(),
        },
      });

      res.status(200).json(subscription);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default createSubscription;
