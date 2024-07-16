import { Button } from "./ui/button.jsx";

export default function Navbar() {
  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex  justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img src="/favicon.png" className="mr-3 h-6 sm:h-9" alt="icon" />
              <span className="self-center">Customer Dashboard</span>
            </a>
            <div className="flex items-center lg:order-2">
              <Button className="space-x-2" variant="outline">
                Log in
              </Button>
              <Button>Get started</Button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </header>
    </div>
  );
}
