import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      allowed_payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
      ui_mode: "elements",
      return_url:
        "http://localhost:3002/checkout/return?session_id={CHECKOUT_SESSION_ID}",
    });

    if (!session.client_secret) {
      console.error("Stripe checkout session has no client secret", {
        sessionId: session.id,
      });
      return c.json({ message: "Unable to initialize payment." }, 502);
    }

    return c.json({ clientSecret: session.client_secret });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe checkout session creation failed", {
        type: error.type,
        code: error.code,
        statusCode: error.statusCode,
        requestId: error.requestId,
        message: error.message,
      });
      return c.json(
        {
          message: "The payment provider could not initialize checkout.",
          requestId: error.requestId,
        },
        502,
      );
    }

    console.error(
      "Unexpected checkout session creation error",
      error instanceof Error ? error.message : String(error),
    );
    return c.json({ message: "Unable to initialize payment." }, 500);
  }
});

export default sessionRoute;
