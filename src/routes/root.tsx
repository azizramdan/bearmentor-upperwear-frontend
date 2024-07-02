import { Link, Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <>
      <header>
        <h1>UpperWear</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/me">Me</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}