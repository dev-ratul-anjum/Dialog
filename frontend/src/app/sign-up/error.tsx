"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div>
      <p>File too large. Please upload a smaller file.</p>
      <button onClick={() => router.push("/sign-up")}>Go back</button>
    </div>
  );
}
