import { Link, Outlet } from "react-router";
import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {}

export default function DefaultLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-blue-200">
            <div>The shop</div>
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-200 transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-200 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
