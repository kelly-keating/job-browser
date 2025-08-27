import * as React from "react";

import { cn } from "@/lib/utils";

function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("my-5 w-full", className)} {...props} />;
}

export { PageHeader };
