import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

type Credentials = {
    email: string;
    password: string;
    remember: boolean;
};

type LoginProps = {
    // optional handler that performs actual login; can return a Promise
    onLogin?: (creds: Credentials) => Promise<void> | void;
    initialEmail?: string;
    className?: string;
};

export default function Login({ onLogin, initialEmail = "", className = "" }: LoginProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>(initialEmail);
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (e: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
    const validatePassword = (p: string) => p.length >= 6;

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            if (onLogin) {
                await onLogin({ email: email.trim(), password, remember });
            } else {
                // Check user credentials against localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find((u: { email: string; password: string }) => 
                    u.email === email.trim() && u.password === password
                );

                if (!user) {
                    throw new Error("Invalid email or password. Please try again.");
                }

                // Simulate loading
                await new Promise((res) => setTimeout(res, 800));

                // Store current user
                localStorage.setItem('currentUser', JSON.stringify({
                    name: user.name,
                    email: user.email,
                    isLoggedIn: true
                }));

                setLoading(false);
                // Redirect to LuckySevenGame
                navigate('/game', { replace: true });
                return;
            }
        } catch (err: Error | unknown) {
            const errorMessage = err instanceof Error ? err.message : "Login failed";
            setError(errorMessage);
            
            if (errorMessage.includes("No account found")) {
                // Redirect to signup after a short delay
                setTimeout(() => {
                    navigate('/signup');
                }, 2000);
            }
            
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    return (
        <div
            className={className}
            style={{
                maxWidth: 420,
                margin: "40px auto",
                padding: 24,
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                background: "#fff",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            }}
        >
            <h2 style={{ margin: "0 0 12px", fontSize: 20 }}>Sign in</h2>
            <p style={{ margin: "0 0 18px", color: "#555", fontSize: 13 }}>
                Sign in to your account. (Demo: demo@example.com / password)
            </p>

            <form onSubmit={handleSubmit} noValidate>
                <label style={{ display: "block", marginBottom: 8 }}>
                    <span style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        aria-label="Email"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 6,
                            border: "1px solid #d0d7de",
                            fontSize: 14,
                        }}
                    />
                </label>

                <label style={{ display: "block", margin: "10px 0 12px" }}>
                    <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 13 }}>Password</span>
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            style={{
                                fontSize: 12,
                                color: "#0366d6",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        aria-label="Password"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 6,
                            border: "1px solid #d0d7de",
                            fontSize: 14,
                        }}
                    />
                </label>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            style={{ width: 16, height: 16 }}
                        />
                        Remember me
                    </label>

                    <a href="#forgot" style={{ fontSize: 13, color: "#0366d6", textDecoration: "none" }}>
                        Forgot?
                    </a>
                </div>

                {error && (
                    <div role="alert" style={{ color: "crimson", marginBottom: 12, fontSize: 13 }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 8,
                        background: "#0366d6",
                        color: "#fff",
                        border: "none",
                        cursor: loading ? "default" : "pointer",
                        fontSize: 15,
                        fontWeight: 600,
                    }}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>

            <div style={{ marginTop: 14, fontSize: 13, color: "#555" }}>
                New here?{" "}
                <Link 
                    to="/signup" 
                    style={{ 
                        color: "#0366d6", 
                        textDecoration: "none",
                        fontWeight: "500"
                    }}
                >
                    Create an account
                </Link>
            </div>
        </div>
    );
}