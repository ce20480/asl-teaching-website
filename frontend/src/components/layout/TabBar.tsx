import { Link, useLocation } from "react-router-dom";
import { Home, Camera, Upload, User, BookOpen } from "lucide-react";

const tabs = [
  { name: "Home", path: "/", icon: Home },
  { name: "Translate", path: "/translate", icon: Camera },
  { name: "Learn", path: "/learn", icon: BookOpen },
  { name: "Contribute", path: "/contribute", icon: Upload },
  { name: "Profile", path: "/profile", icon: User },
];

const TabBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t backdrop-blur-lg bg-opacity-80">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabBar;
