import Link from "next/link";

const AuthFooter = () => {
  return (
    <p className="mt-8 text-xs text-slate-400 text-center max-w-md">
      By clicking continue, you agree to our{" "}
      <Link href="/terms-condition" className="underline hover:text-slate-600">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy-policy" className="underline hover:text-slate-600">
        Privacy Policy
      </Link>
      .
    </p>
  );
};

export default AuthFooter;
