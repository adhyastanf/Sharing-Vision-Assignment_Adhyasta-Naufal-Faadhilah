import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table"
  
  interface DataTableErrorProps {
    columns: number
    message?: string
  }
  
  export function DataTableError({ columns, message = "Something went wrong." }: DataTableErrorProps) {
    return (
      <div className="overflow-hidden rounded-md border border-red-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={columns} className="text-red-600 font-semibold">
                Error
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns} className="h-24 text-center text-red-500">
                {message}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
  