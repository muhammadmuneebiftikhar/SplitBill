"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ExpenseRow {
  id: string;
  date: string;
  paidBy: string;
  description: string;
  group: string;
  amountPaid: number;
  receivable: number;
}

interface TableProps {
  data?: ExpenseRow[];
  onAction?: (row: ExpenseRow) => void;
  className?: string;
}

export default function Table({ data, onAction, className }: TableProps) {
  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AED",
    }).format(amount);
  }

  return (
    <div className={cn("w-full overflow-x-auto overflow-y-hidden rounded-lg border border-border -mx-4 sm:mx-0", className)}>
      <table className="w-full min-w-[640px] caption-bottom text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 transition-colors hover:bg-muted/50">
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Date
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Paid by
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm min-w-[100px]">
              Description
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm min-w-[80px]">
              Group
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-right align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Amount paid
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-right align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Receivable
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-right align-middle font-medium text-muted-foreground text-xs sm:text-sm w-[80px] sm:w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border transition-colors hover:bg-muted/30"
            >
              <td className="p-2 sm:p-4 align-middle text-xs sm:text-sm whitespace-nowrap">{formatDate(row.date)}</td>
              <td className="p-2 sm:p-4 align-middle font-medium text-xs sm:text-sm">{row.paidBy}</td>
              <td className="p-2 sm:p-4 align-middle text-muted-foreground text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal" title={row.description}>{row.description}</td>
              <td className="p-2 sm:p-4 align-middle font-medium text-xs sm:text-sm max-w-[80px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal" title={row.group}>{row.group}</td>
              <td className="p-2 sm:p-4 text-right align-middle font-medium text-xs sm:text-sm whitespace-nowrap">
                {formatCurrency(row.amountPaid)}
              </td>
              <td
                className={cn(
                  "p-2 sm:p-4 text-right align-middle font-medium text-xs sm:text-sm whitespace-nowrap",
                  row.receivable >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {row.receivable >= 0 ? "+" : ""}
                {formatCurrency(row.receivable)}
              </td>
              <td className="p-2 sm:p-4 text-right align-middle">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => onAction?.(row)}
                >
                  Actions
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
