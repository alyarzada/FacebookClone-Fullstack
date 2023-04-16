import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
