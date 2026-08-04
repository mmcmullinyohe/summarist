import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  monthly: "price_1U0nbX5xzzzOXWEd0DFs0WCh",
  yearly: "price_1U0nbw5xzzzOXWEddZIfhNK5",
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const { plan } = request.body ?? {};
    const priceId = PRICE_IDS[plan];

    if (!priceId) {
      return response.status(400).json({
        error: "Invalid subscription plan.",
      });
    }

    const origin =
      request.headers.origin || "https://summarist-pi.vercel.app";

    const sessionOptions = {
      mode: "subscription",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url:
        `${origin}/payment-success` +
        `?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,

      cancel_url: `${origin}/choose-plan`,
    };

    if (plan === "yearly") {
      sessionOptions.subscription_data = {
        trial_period_days: 7,
      };
    }

    const session =
      await stripe.checkout.sessions.create(sessionOptions);

    return response.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout error:", error);

    return response.status(500).json({
      error: "Unable to start Stripe Checkout.",
    });
  }
}