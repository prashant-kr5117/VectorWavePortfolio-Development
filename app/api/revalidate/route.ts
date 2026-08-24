import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 });
    }

    // Webhooks need the content to be live on the very next request, so
    // expire immediately rather than using stale-while-revalidate semantics.
    revalidateTag("post", { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      slug: body.slug?.current,
    });
  } catch (err) {
    console.error("Sanity revalidate webhook error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
