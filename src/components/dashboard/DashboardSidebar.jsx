"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaChartBar,
  FaUser,
  FaBookOpen,
  FaShoppingCart,
  FaUserCog,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role || "reader";

  const menuItems = {
    writer: [
      { name: "Dashboard", path: "/dashboard/writer", icon: FaHome },
      { name: "Add Book", path: "/dashboard/writer/add-book", icon: FaBook },
      {
        name: "Analytics",
        path: "/dashboard/writer/statistics",
        icon: FaChartBar,
      },
      { name: "Profile", path: "/dashboard/writer/profile", icon: FaUser },
    ],
    reader: [
      { name: "Dashboard", path: "/dashboard", icon: FaHome },
      {
        name: "Book Details",
        path: "/dashboard/reader/book-details",
        icon: FaBookOpen,
      },
      {
        name: "Order Book",
        path: "/dashboard/reader/order-book",
        icon: FaShoppingCart,
      },
      { name: "Profile", path: "/dashboard/reader/profile", icon: FaUser },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard", icon: FaHome },
      { name: "Manage Users", path: "/dashboard/admin/users", icon: FaUsers },
      { name: "Manage Books", path: "/dashboard/admin/books", icon: FaBook },
      {
        name: "Analytics",
        path: "/dashboard/admin/analytics",
        icon: FaChartBar,
      },
      { name: "Profile", path: "/dashboard/admin/profile", icon: FaUserCog },
    ],
  };

  const currentMenu = menuItems[userRole] || menuItems.reader;

  const getRoleIcon = () => {
    switch (userRole) {
      case "writer":
        return <FaBook className="text-yellow-400" />;
      case "admin":
        return <FaUserCog className="text-yellow-400" />;
      default:
        return <FaBookOpen className="text-yellow-400" />;
    }
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full w-64 bg-[#14141a] border-r border-white/10 overflow-y-auto z-50"
    >

      {/* User Role Badge */}
      <div className="mx-4 mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-400/10">{getRoleIcon()}</div>
          <div>
            <p className="text-white text-sm font-medium capitalize">{userRole}</p>
            <p className="text-white/30 text-xs">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <p className="text-white/30 text-xs uppercase tracking-wider mb-4 px-3">
          Main Menu
        </p>
        <ul className="space-y-1">
          {currentMenu.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-400/20 to-red-600/20 text-yellow-400 border border-yellow-400/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`text-sm transition-all ${
                      isActive ? "text-yellow-400" : "text-white/40 group-hover:text-white"
                    }`}
                    size={18}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-red-600" />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#14141a]">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <FaSignOutAlt size={16} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>
    </motion.aside>
  );
}