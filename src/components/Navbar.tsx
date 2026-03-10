import { Link, NavLink } from "react-router"
import useAuth from "../hooks/useAuth";
import { useState, type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = (): JSX.Element => {

  const { isLoggedIn } = useAuth();
  const products = useSelector((state: RootState) => state.cart.value)

  return (
    <nav className="bg-white top-0 z-10 border-gray-200 dark:bg-gray-300 dark:border-gray-700">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/generate-image" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://www.laptopstoreindia.in/wp-content/themes/laptopstore/assets/images/logo.png"
            className="h-16"
            alt="Flowbite Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `block py-2 px-3 text-xl rounded-sm md:p-0 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Dropdown{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavLink
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li aria-labelledby="dropdownNavbarLink">
                    <button
                      id="doubleDropdownButton"
                      data-dropdown-toggle="doubleDropdown"
                      data-dropdown-placement="right-start"
                      type="button"
                      className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dropdown
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="doubleDropdown"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="doubleDropdownButton"
                      >
                        <li>
                          <NavLink
                            to="/"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Overview
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            My downloads
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Billing
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Rewards
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </NavLink>
                  </li>
                </ul>
                <div className="py-1">
                  <NavLink
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </NavLink>
                </div>
              </div>
            </li>
            <li>
              <NavLink
                to="laptop-services"
                className={({ isActive }) => `block py-2 px-3 text-xl rounded-sm md:p-0 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}
              >
                Laptop Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/laptop-spares"
                className={({ isActive }) => `block py-2 px-3 text-xl rounded-sm md:p-0 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}
              >
                Laptop Spares
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/laptop-sales"
                className={({ isActive }) => `block py-2 px-3 text-xl rounded-sm md:p-0 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}
              >
                LaptopSales
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) => `block py-2 px-3 text-xl rounded-sm md:p-0 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}
              >
                Cart ({products.length})
              </NavLink>
            </li>
          </ul>
        </div>
        {
          isLoggedIn ? <UserMenu /> : <div className="flex">
            <Link to="/login"><button className="btn btn-primary">Login</button></Link>
            <Link to="/register"><button className="btn btn-success ml-2">Register</button></Link>
          </div>
        }

      </div>
    </nav>

  )
}

export default Navbar;

const UserMenu = (): JSX.Element => {
  const { user, logout } = useAuth();

  const [isMenuOpen, toggleMenu] = useState<boolean>(false);

  return <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <button
      type="button"
      className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      id="user-menu-button"
      aria-expanded="false"
      data-dropdown-toggle="user-dropdown"
      data-dropdown-placement="bottom"
      onClick={() => toggleMenu(prev => !prev)}
    >
      <span className="sr-only">Open user menu</span>
      <img
        className="w-8 h-8 rounded-full"
        src={user?.image || "https://v3.flowbite.com/images/people/profile-picture-3.jpg"}
        alt="user photo"
      />
    </button>
    {
      isMenuOpen && <div
        className="z-50 absolute top-5 -left-42 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            {user.name}
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            {user.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </NavLink>
          </li>
          <li>
            <Link
              to="/"
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Log out
            </Link>
          </li>
        </ul>
      </div>
    }
    <button
      data-collapse-toggle="navbar-user"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-user"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  </div>

}