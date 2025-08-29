import { Table } from "@tanstack/react-table";

import { Button, Input } from "@/components/ui";

export function UtilBar({ table }: { table: Table<Job> }) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter jobs..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <Button variant="reverse" className="ml-auto">
        Delete All
      </Button>
    </div>
  );
}
