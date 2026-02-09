import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    // Frontend validasiyası
    if (!email || !password) {
      setToast({ message: "Bütün sahələri doldurun", type: "error" });
      return;
    }

    if (!email.includes("@")) {
      setToast({ message: "Düzgün email daxil edin", type: "error" });
      return;
    }

    if (password.length < 6) {
      setToast({ message: "Şifrə ən azı 6 simvol olmalıdır", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const user = await login({ email, password });
      auth.login(user);
      setToast({ message: "Uğurla daxil oldunuz!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setToast({
        message: error.message || "Email və ya şifrə yanlışdır",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Daxil ol</h2>
          <p className="text-gray-600">Hesabınıza giriş edin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Şifrə
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:transform-none">
            {loading ? "Yüklənir..." : "Daxil ol"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hesabınız yoxdur?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
              Qeydiyyatdan keç
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
