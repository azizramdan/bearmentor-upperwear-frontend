import { getSessionToken } from "@/utils/sessionToken";
import { Link, Outlet } from "react-router-dom";

export function RootRoute() {
  getSessionToken();

  return (
    <>
      <header className="text-center py-4">
        <Link to="/">
          <h1 className="text-2xl">UpperWear</h1>
        </Link>
        <nav className="mt-3">
          <ul className="flex gap-8 justify-center">
            <li>
              <Link to="/collections/t-shirt">T-Shirt</Link>
            </li>
            <li>
              <Link to="/collections/kemeja">Kemeja</Link>
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