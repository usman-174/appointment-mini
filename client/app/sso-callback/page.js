import SSOCallback from "@/components/auth/SSOCallback";

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default function SSOCallbackPage({ searchParams }) {
  return <SSOCallback searchParams={searchParams} />;
}
