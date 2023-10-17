import { OAuthSignIn } from "@/components/auth/OAuthSignin";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function SignInPage() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <div className=" p-5">
      <OAuthSignIn />
    </div>
  );
}
