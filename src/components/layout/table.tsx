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
    <div className={cn("w-full overflow-auto rounded-lg border border-border", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 transition-colors hover:bg-muted/50">
            <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground">
              Date
            </th>
            <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground">
              Paid by
            </th>
            <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground">
              Description
            </th>
            <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground">
              Group
            </th>
            <th className="h-11 px-4 text-right align-middle font-medium text-muted-foreground">
              Amount paid
            </th>
            <th className="h-11 px-4 text-right align-middle font-medium text-muted-foreground">
              Receivable
            </th>
            <th className="h-11 px-4 text-right align-middle font-medium text-muted-foreground w-[100px]">
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
              <td className="p-4 align-middle">{formatDate(row.date)}</td>
              <td className="p-4 align-middle font-medium">{row.paidBy}</td>
              <td className="p-4 align-middle text-muted-foreground">{row.description}</td>
              <td className="p-4 align-middle font-medium">{row.group}</td>
              <td className="p-4 text-right align-middle font-medium">
                {formatCurrency(row.amountPaid)}
              </td>
              <td
                className={cn(
                  "p-4 text-right align-middle font-medium",
                  row.receivable >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {row.receivable >= 0 ? "+" : ""}
                {formatCurrency(row.receivable)}
              </td>
              <td className="p-4 text-right align-middle">
                <Button
                  variant="outline"
                  size="sm"
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
