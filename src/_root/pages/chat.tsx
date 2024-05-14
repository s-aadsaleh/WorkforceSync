import { Button } from "@/components/ui/button"
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  ShoppingCart,
  SunMoon,
  Users,
  Waypoints,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import React from 'react';

import DarkModeToggle from "@/components/theme-toggle"

export default function chat() {
  
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      navigate('/login');
    } else {
      navigate(window.location.pathname);
    }
  }, []);

  //Dynamic Breadcrumb navigation
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const location = useLocation();
  const pathname = location.pathname;
  const pathSegments = pathname.split('/').filter(segment => segment !== ''); // Split pathname into segments

  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <div className="hidden border-r bg-muted/50 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Waypoints className="h-6 w-6" />
              <span style={{ fontSize: "large" }}>WorkforceSync</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Dashboard</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Orders</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-3 text-primary transition-all hover:text-primary"
              >
                <Package className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Products</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Customers</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Analytics</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button variant="ghost" size="icon" onClick={DarkModeToggle()}>
              <SunMoon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 py-3 text-lg font-semibold"
                >
                  <Waypoints className="h-6 w-6" />
                  <span>WorkforceSync</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-3 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  to="/test"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-3 text-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  to="/test2"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  to="/test3"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-3 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto p-4">
                <Button variant="ghost" size="icon" onClick={DarkModeToggle()}>
                  <SunMoon className="h-5 w-5" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {pathSegments.length >= 2 && pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`}>{capitalizeFirstLetter(segment)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < pathSegments.length - 1 && <BreadcrumbSeparator />} {/* Add separator for all segments except the last one */}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          hello
        </main>
      </div>
    </div>
  )
}

