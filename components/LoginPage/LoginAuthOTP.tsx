import React, { useState, useRef, useEffect } from "react";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  step: "email" | "otp";
  setStep: (step: "email" | "otp") => void;
  code: string;
  setCode: (code: string) => void;
  error: string;
  setError: (error: string) => void;
  timer: number;
  setTimer: (timer: number) => void;
  startTimer: () => void;
  router: any;
}

export default function LoginAuthOTP({
  email,
  setEmail,
  step,
  setStep,
  code,
  setCode,
  error,
  setError,
  timer,
  setTimer,
  startTimer,
  router,
}: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [sending, setSending] = useState(false);
  const [resending, setResending] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  // Handle Send code
  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("otp");
        setCode("");
        startTimer();
      } else {
        setError(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Failed to send OTP.");
    } finally {
      setSending(false);
    }
  }

  // Handle Resend code
  async function handleResendCode() {
    setResending(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        startTimer();
        setError("");
      } else {
        setError(data.error || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  }

  // Handle OTP login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (data.success) {
        setError("");
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid code. Please try again.");
      }
    } catch (err) {
      setError("Invalid code. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <>
      {step === "email" ? (
        <form className="flex flex-col gap-4 w-full max-w-md mt-6 items-center" onSubmit={handleSendCode}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-[#E0E0E0] rounded-lg px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#8ffaff]"
            required
          />
          <button
            type="submit"
            className={`bg-[#8ffaff] text-black font-bold rounded-lg py-3 text-base w-full mt-2 hover:bg-[#6ee7f7] transition-colors ${sending ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={timer > 0 || sending}
          >
            {sending
              ? "Sending code..."
              : timer > 0
                ? `Send code (${timer}s)`
                : "Send code"}
          </button>
        </form>
      ) : (
        <form className="flex flex-col gap-4 w-full max-w-md mt-6 items-center" onSubmit={handleLogin}>
          <div className="w-full mb-2 text-sm text-gray-500 text-center">
            Enter the OTP code, sent to <span className="font-semibold">{email}</span>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="One time code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="text-sm sm:text-md border border-[#E0E0E0] rounded-lg pl-2 sm:pl-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#8ffaff] pr-32"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4">
              {timer > 0 ? (
                <span className="text-sm sm:text-md text-gray-500 whitespace-nowrap">Resend in <span className="text-sm sm:text-md text-red-500 font-semibold">{timer}s</span></span>
              ) : (
                <button
                  type="button"
                  className={`text-[#01DAE3] text-sm sm:text-md font-medium sm:font-semibold hover:underline bg-[#01DAE3]/10 px-2 py-1 rounded ${resending ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={resending ? undefined : handleResendCode}
                  disabled={resending}
                >
                  {resending ? 'Resending code...' : 'Resend code'}
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`bg-[#8ffaff] text-black font-bold rounded-lg py-3 text-base w-full mt-2 hover:bg-[#6ee7f7] transition-colors ${loggingIn ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loggingIn}
          >
            {loggingIn ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      )}
    </>
  );
}
