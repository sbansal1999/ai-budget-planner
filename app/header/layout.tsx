"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle, BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const links = [
    { href: "/add-expense", label: "Add Expense", icon: PlusCircle },
    { href: "/budget-analysis", label: "Get Budget Analysis", icon: BarChart3 },
  ];
  return (
    <>
      <div>
        <header className="bg-background border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">AI Budget Planner</span>
                </Link>
              </div>
              <nav className="hidden md:flex items-center space-x-4">
                {links.map((link) => (
                  <Button
                    key={link.href}
                    variant={currentPath === link.href ? "secondary" : "ghost"}
                    asChild
                  >
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2"
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </Button>
                ))}
              </nav>
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <nav className="flex flex-col space-y-4 mt-4">
                      {links.map((link) => (
                        <Button
                          key={link.href}
                          variant={
                            currentPath === link.href ? "secondary" : "ghost"
                          }
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center space-x-2"
                          >
                            <link.icon className="h-4 w-4" />
                            <span>{link.label}</span>
                          </Link>
                        </Button>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>
      </div>
      {children}
    </>
  );
}
