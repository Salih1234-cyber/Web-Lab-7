import { useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState(
    "YOUR_STUDENT_EMAIL"
  );
  const [password, setPassword] = useState("demo123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await login(username, password);

      dispatch({
        type: "LOGGED_IN",
        payload: user
      });

      const destination =
        location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Student email
          <input
            type="email"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        {error && <p role="alert">{error}</p>}
      </form>
    </section>
  );
}