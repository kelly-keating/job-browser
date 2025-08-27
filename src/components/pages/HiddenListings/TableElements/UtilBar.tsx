import { Table } from "@tanstack/react-table";

import { Button, Input } from "@/components/ui";

export function UtilBar({ table }: { table: Table<Job> }) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter jobs..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <Button variant="reverse" className="ml-auto">
        Delete All
      </Button>
    </div>
  );
}
