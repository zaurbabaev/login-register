import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import Toast from "../components/Toast";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    // Frontend validasiyası
    if (!form.email || !form.password) {
      setToast({ message: "Bütün sahələri doldurun", type: "error" });
      return;
    }

    if (!form.email.includes("@")) {
      setToast({ message: "Düzgün email daxil edin", type: "error" });
      return;
    }

    if (form.password.length < 6) {
      setToast({
        message: "Şifrə ən azı 6 simvol olmalıdır",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await register(form);
      setToast({ message: "Qeydiyyat uğurla tamamlandı!", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setToast({
        message: err.message || "Qeydiyyat zamanı xəta baş verdi",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Qeydiyyat</h2>
          <p className="text-gray-600">Yeni hesab yaradın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="ornek@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 simvol olmalıdır
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:transform-none">
            {loading ? "Qeydiyyat edilir..." : "Qeydiyyatdan keç"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Artıq hesabınız var?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
              Daxil ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
