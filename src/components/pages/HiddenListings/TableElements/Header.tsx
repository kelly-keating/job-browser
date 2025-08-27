import { flexRender, Table } from "@tanstack/react-table";

import { TableHead, TableHeader, TableRow } from "@/components/ui";

export function Header({ table }: { table: Table<Job> }) {
  return (
    <TableHeader className="font-heading">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          className="bg-secondary-background text-foreground"
          key={headerGroup.id}
        >
          {headerGroup.headers.map((header) => {
            return (
              <TableHead className="text-foreground" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
