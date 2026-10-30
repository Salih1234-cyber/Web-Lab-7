import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Layout() {
  const { user, dispatch } = useAuth();

  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (count, item) => count + item.quantity,
      0
    )
  );

  const [theme, setTheme] = useLocalStorage(
    "theme",
    "light"
  );

  function handleLogout() {
    dispatch({ type: "LOGGED_OUT" });
  }

  return (
    <div className={`app theme-${theme}`}>
      <header className="site-header">
        <Link className="brand" to="/">
          My Shop
        </Link>

        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Products
          </NavLink>

          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Cart ({itemCount})
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Login
            </NavLink>
          ) : (
            <>
              <span>{user.username}</span>
              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          <button
            onClick={() =>
              setTheme((current) =>
                current === "light" ? "dark" : "light"
              )
            }
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Web Programming Assignment 7</p>
      </footer>
    </div>
  );
}