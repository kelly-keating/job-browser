import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

function NavTabList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "left-0 top-0 z-20 mx-auto flex h-12 w-full items-center border-b-4 border-border bg-secondary-background px-5",
        className,
      )}
      {...props}
    />
  );
}

interface NavTabProps extends React.ComponentProps<"a"> {
  to: string;
  active: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}
function NavTabLink({
  className,
  to,
  active,
  children,
  ...props
}: NavTabProps) {
  return (
    <Link
      to={to}
      className={cn(
        active
          ? "bg-main text-main-foreground border-border box-shadow"
          : "bg-secondary-background text-secondary-foreground border-transparent",
        "inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 px-2 py-1 mx-1 gap-1.5 text-sm font-heading ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export { NavTabLink, NavTabList };
