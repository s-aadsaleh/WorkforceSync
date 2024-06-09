import { Button } from "@/components/ui/button"
import {
  CircleUser,
  Clipboard,
  Home,
  Menu,
  SunMoon,
  Users,
  Waypoints,
  HandCoins,
  ListCollapse,
  UserPlus,
  BookUser,
  MonitorSmartphone,
  // MonitorCheck,
  FileStack,
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

import { Link, useLocation } from "react-router-dom"
import { ReactNode } from "react"
import React from 'react';

import DarkModeToggle from "@/components/misc-components/theme-toggle"
import { signOutAccount } from "@/lib/appwrite/api"
// import { CardDescription } from "./ui/card"

interface MainHeaderFrameProps {
  children: ReactNode;
}

const MainHeaderFrame = ({ children }: MainHeaderFrameProps) => {
  
  //Dynamic Breadcrumb navigation
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const location = useLocation();
  const pathname = location.pathname;
  const pathSegments = pathname.split('/').filter(segment => segment !== ''); // Split pathname into segments

  //Dropdown menu functionality
  const handleDropMenuItemClick = (itemName: string) => {
    console.log(`Clicked on: ${itemName}`);
  
    if (itemName === 'Profile') {
      // Handle Profile click
    } else if (itemName === 'Billing') {
      // Handle Billing click
    } else if (itemName === 'Settings') {
      // Handle Settings click
    } else if (itemName === 'New Team') {
      // Handle New Team click
    } else if (itemName === 'Log out') {
      // Call the signOutAccount function when Log out is clicked
      signOutAccount();
      console.log('Logging out');
    }

  };
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <div className="hidden border-r bg-muted/50 md:block">
        <div className="flex h-full max-h-screen flex-col ">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Waypoints className="h-6 w-6" />
              <span style={{ fontSize: "large" }}>WorkforceSync</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 py-3 text-sm font-medium lg:px-4">
              <div className="py-2"/>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Home className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Dashboard</span>
              </Link>
              <Link
                to="/tasks"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname === "/tasks" ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Clipboard className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Tasks</span>
              </Link>
              <div>
                <Link
                  to="/employees/directory"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname.startsWith("/employees") ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Users className="h-5 w-5" />
                  <span style={{ fontSize: "medium" }}>Employees</span>
                </Link>
                {pathname.startsWith("/employees") && (
                  <div className="ml-6 py-1">
                    <Link
                      to="/employees/directory"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/employees/directory" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <BookUser className="h-5 w-5" />
                      Employee Directory
                    </Link>
                    <Link
                      to="/employees/directory/details"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/employees/directory/details" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <ListCollapse className="h-5 w-5" />
                      Employee Details
                    </Link>
                    <Link
                      to="/employees/directory/add"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/employees/directory/add" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <UserPlus className="h-5 w-5" />
                      Add Employees
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/payroll"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname.startsWith("/payroll") ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <HandCoins className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Payroll</span>
              </Link>
              <Link
                to="/assets"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname.startsWith("/assets") ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <MonitorSmartphone className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>Asset Management</span>
              </Link>
              {/* {pathname.startsWith("/assets") && (
                  <div className="ml-6 py-1">
                    <Link
                      to="/assets/register"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/assets/register" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <MonitorCheck className="h-5 w-5" />
                      Register Assets
                    </Link>
                  </div>
                )} */}
              <Link
                to="/files"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname === "/files" ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <FileStack className="h-5 w-5" />
                <span style={{ fontSize: "medium" }}>File Storage</span>
              </Link>
            </nav>
          </div>
          {/* <CardDescription className="flex px-3 py-0">
              built by saad.
          </CardDescription>
          <CardDescription className="flex px-3 py-2">
            <a href="https://github.com/s-aadsaleh/WorkforceSync" target="_blank" rel="noopener noreferrer">
              the source is available on <span className="underline">github</span>.
            </a>
          </CardDescription> */}
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
                  to="/"
                  className="flex items-center gap-2 py-3 text-lg font-semibold"
                >
                  <Waypoints className="h-6 w-6" />
                  <span>WorkforceSync</span>
                </Link>
                {/* <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/tasks"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname === "/tasks" ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Clipboard className="h-5 w-5" />
                  Tasks
                </Link>
                <Link
                  to="/employees"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname.startsWith("/employees") ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Users className="h-5 w-5" />
                  Employees
                </Link>
                <Link
                  to="/payroll"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname.startsWith("/payroll") ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <HandCoins className="h-5 w-5" />
                  Payroll
                </Link>
                <Link
                  to="/settings"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname === "/settings" ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Settings2 className="h-5 w-5" />
                  Settings
                </Link> */}
                <Link
                to="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/tasks"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname === "/tasks" ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <Clipboard className="h-5 w-5" />
                Tasks
              </Link>
              <div>
                <Link
                  to="/employees/directory"
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                    pathname.startsWith("/employees") ? "bg-muted text-primary" : "text-muted-foreground"
                  } transition-all hover:text-primary`}
                >
                  <Users className="h-5 w-5" />
                  Employees
                </Link>
                {pathname.startsWith("/employees") && (
                  <div className="ml-6 py-1">
                    <Link
                      to="/employees/directory"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/employees/directory" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <BookUser className="h-5 w-5" />
                      Employee Directory
                    </Link>
                    <Link
                      to="/employees/directory/details"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/employees/directory/details" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <ListCollapse className="h-5 w-5" />
                      Employee Details
                    </Link>
                    <Link
                      to="/employees/directory/add"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/employees/directory/add" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <UserPlus className="h-5 w-5" />
                      Add Employees
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/payroll"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname.startsWith("/payroll") ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <HandCoins className="h-5 w-5" />
                Payroll
              </Link>
              <Link
                to="/assets"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname.startsWith("/assets") ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <MonitorSmartphone className="h-5 w-5" />
                Asset Management
              </Link>
              {/* {pathname.startsWith("/assets") && (
                  <div className="ml-6 py-1">
                    <Link
                      to="/assets/register"
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                        pathname === "/assets/register" ? "bg-muted text-primary" : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <MonitorCheck className="h-5 w-5" />
                      Register Assets
                    </Link>
                  </div>
                )} */}
              <Link
                to="/files"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 ${
                  pathname === "/files" ? "bg-muted text-primary" : "text-muted-foreground"
                } transition-all hover:text-primary`}
              >
                <FileStack className="h-5 w-5" />
                File Storage
              </Link>
              </nav>

            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {pathSegments.length >= 0 && pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`}>{capitalizeFirstLetter(segment)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="w-full flex-1">
          </div>
          <div >
            <Button variant="ghost" size="icon" onClick={DarkModeToggle()}>
              <SunMoon className="h-5 w-5" />
            </Button>
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
              <DropdownMenuItem onClick={() => handleDropMenuItemClick('Log out')}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainHeaderFrame;