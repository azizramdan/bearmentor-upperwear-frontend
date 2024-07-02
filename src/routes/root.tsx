import { Link, Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <>
      <header className="text-center py-4">
        <h1 className="text-2xl">UpperWear</h1>
        <nav className="mt-3">
          <ul className="flex gap-8 justify-center">
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

      <main className="px-5 mt-5">
        <Outlet />
      </main>
    </>
  );
}