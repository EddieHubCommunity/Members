import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Stripe from "stripe";

import logger from "@config/logger";
import { serverEnv } from "@config/schemas/serverSchema";
import { clientEnv } from "@config/schemas/clientSchema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "GET requests only" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: clientEnv.STRIPE_PREMIUM_PRICING_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    customer: session.stripeCustomerId,
    success_url: `${clientEnv.NEXT_PUBLIC_BASE_URL}/account/statistics?alert=premium`,
    cancel_url: `${clientEnv.NEXT_PUBLIC_BASE_URL}/account/statistics?alert=cancel`,
  });
  logger.info(
    `Created stripe session "${stripeSession.id}" for username: "${session.username}}"`
  );

  if (!stripeSession.url) {
    logger.error(
      `Failed creating stripe session for username: "${session.username}}"`
    );
    return res.status(500).json({
      error: "Could not create Stripe checkout session",
    });
  }

  return res.status(201).redirect(stripeSession.url);
}
