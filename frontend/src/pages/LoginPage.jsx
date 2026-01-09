import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-[var(--cream-50)] px-4">
      <div className="max-w-md w-full">
        <motion.h2
          className="text-center text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sign in to your account
        </motion.h2>

        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80"
              >
                Email address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-[var(--navy-900)] border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80"
              >
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-[var(--navy-900)] border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2 px-4 pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-semibold rounded-full transition duration-150 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#A1A6B1]">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[var(--accent-gold)] hover:underline inline-flex items-center"
            >
              Sign up now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
