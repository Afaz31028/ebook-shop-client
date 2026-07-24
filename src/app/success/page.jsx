import { payment } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Mail,
  BookOpen,
  ArrowRight,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }

  const checkoutSession =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const {
    status,
    metadata,
    customer_details,
  } = checkoutSession;

  const customerEmail =
    customer_details?.email || "your email address";

  if (status === "open") {
    redirect("/");
  }

  if (status === "complete") {
    await payment({
      ...metadata,
      session_id,
    });

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d12] px-4 py-10">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-orange-500/15 blur-[100px]" />

          <div className="absolute bottom-0 left-0 h-[220px] w-[220px] rounded-full bg-yellow-500/10 blur-[90px]" />

          <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-red-500/10 blur-[90px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <section className="relative z-10 w-full max-w-lg">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181820]/90 shadow-2xl backdrop-blur-xl">
            {/* Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />

            <div className="px-5 py-8 text-center sm:px-8 sm:py-9">
              {/* Success Icon */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-500/10" />

                <div className="absolute inset-2 rounded-full bg-green-500/15 blur-xl" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-green-400/40 bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/20">
                  <Check
                    size={32}
                    strokeWidth={3}
                    className="text-white"
                  />
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
                <ShieldCheck size={15} />
                Payment verified securely
              </div>

              {/* Heading */}
              <h1 className="mt-5 bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Payment Successful!
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
                Thank you for your purchase. Your book is now
                available in your account.
              </p>

              {/* Transaction Details */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111117] text-left">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <ReceiptText size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Transaction details
                    </p>

                    <p className="text-xs text-gray-500">
                      Your payment has been recorded
                    </p>
                  </div>

                  <CheckCircle2
                    size={19}
                    className="ml-auto shrink-0 text-green-400"
                  />
                </div>

                <div className="space-y-3 px-4 py-4">
                  {metadata?.title && (
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-gray-500">
                        Book
                      </span>

                      <span className="max-w-[70%] text-right text-sm font-medium text-white">
                        {metadata.title}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-500">
                      Status
                    </span>

                    <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                      Completed
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0 text-xs text-gray-500">
                      Session ID
                    </span>

                    <span
                      title={session_id}
                      className="max-w-[70%] truncate rounded-lg bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-gray-300"
                    >
                      {session_id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">
                    Confirmation email
                  </p>

                  <p className="mt-1 break-all text-xs leading-5 text-gray-400">
                    A confirmation will be sent to{" "}
                    <span className="font-medium text-orange-400">
                      {customerEmail}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/dashboard/reader/order-book"
                  className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-4 text-sm font-bold text-black shadow-lg shadow-orange-500/20 transition duration-300 hover:scale-[1.02]"
                >
                  <BookOpen size={18} />
                  View My Books

                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/"
                  className="flex h-12 items-center justify-center rounded-xl border border-gray-700 bg-[#22222b] px-4 text-sm font-semibold text-white transition hover:border-orange-500/50 hover:bg-[#292932]"
                >
                  Continue Browsing
                </Link>
              </div>

              {/* Support */}
              <p className="mt-5 text-xs text-gray-600">
                Need help? Email{" "}
                <a
                  href="mailto:orders@example.com"
                  className="font-medium text-orange-400 transition hover:text-orange-300"
                >
                  ebook@shop.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return null;
}