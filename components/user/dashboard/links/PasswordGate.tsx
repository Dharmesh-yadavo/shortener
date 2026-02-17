"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { verifyLinkPasswordAction } from "@/server/users/users.action";
import { redirect } from "next/navigation";

export default function PasswordGate({
  shortCode,
  originalUrl,
}: {
  shortCode: string;
  originalUrl: string;
}) {
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    console.log(password);

    // Call a Server Action to verify the password
    const result = await verifyLinkPasswordAction(shortCode, password);

    if (result.success) {
      toast.success("Access granted!");
      redirect(originalUrl);
    } else {
      toast.error(result.error || "Incorrect password");
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-200 text-center">
      <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <Lock size={24} />
      </div>
      <h1 className="text-2xl font-bold mb-2">Password Protected</h1>
      <p className="text-slate-500 mb-6 text-sm">
        This link is private. Please enter the password to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-start"
          required
        />
        <Button className="w-full py-6" disabled={isVerifying}>
          {isVerifying ? "Verifying..." : "Unlock Link"}
        </Button>
      </form>
    </div>
  );
}
