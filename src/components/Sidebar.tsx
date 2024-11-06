"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
//   Home,
  Search,
//   Library,
//   MessagesSquare,
  Settings,
//   HelpCircle,
  Menu,
} from "lucide-react";

const sidebarItems = [
  //   { name: 'Home', href: '/', icon: Home },
  { name: "Search", href: "/", icon: Search },
  //   { name: 'Documentation', href: '/docs', icon: Library },
  //   { name: 'Chat', href: '/chat', icon: MessagesSquare },
  { name: "Settings", href: "/settings", icon: Settings },
  //   { name: 'Help', href: '/help', icon: HelpCircle },
];

interface SidebarContentProps {
  className?: string;
  onItemClick?: () => void;
}

const SidebarContent = ({ className, onItemClick }: SidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn("flex flex-col h-full bg-gray-900 text-white", className)}
    >
      {/* Logo Section */}
      <div className="p-6">
        <h1 className="text-xl font-bold">InsightDocs</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700" />
          <div className="ml-3">
            <p className="text-sm font-medium">InsightDocs</p>
            <p className="text-xs text-gray-400">by Pilot Tech</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Trigger and Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent onItemClick={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
