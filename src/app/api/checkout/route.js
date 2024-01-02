import getCorsHeaders from "@/lib/apiCors";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      line_items: body,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "http://Localhost:3000/success",
      cancel_url: "http://Localhost:3000",
    });

    console.log(session);

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (error) {
    console.log(error);
  }
}
