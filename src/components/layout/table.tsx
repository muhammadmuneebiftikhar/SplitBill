"use client";

import { useState } from "react";
import AddExpense, {
  type NewExpenseData,
  type EditExpenseData,
} from "@/components/layout/AddExpense";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ExpenseRow {
  id: string;
  date: string;
  paidBy: string;
  description: string;
  group: string;
  amountPaid: number;
  receivable: number;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface TableProps {
  data?: ExpenseRow[];
  onDataChange?: (data: ExpenseRow[]) => void;
  title?: string;
  className?: string;
}

export default function Table({ data = [], onDataChange, title, className }: TableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<EditExpenseData | null>(null);

  function openAdd() {
    setAction("add");
    setEditingRow(null);
    setDialogOpen(true);
  }

  function openEdit(row: ExpenseRow) {
    setAction("edit");
    setEditingRow({
      id: row.id,
      date: row.date,
      paidBy: row.paidBy,
      description: row.description,
      group: row.group,
      amountPaid: row.amountPaid,
    });
    setDialogOpen(true);
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open);
    if (!open) {
      setEditingRow(null);
      setAction("add");
    }
  }

  function handleAddExpense(payload: NewExpenseData) {
    const newRow: ExpenseRow = {
      id: generateId(),
      date: payload.date,
      paidBy: payload.paidBy,
      description: payload.description,
      group: Array.isArray(payload.group) ? payload.group.join(", ") : payload.group,
      amountPaid: payload.amountPaid,
      receivable: 0,
    };
    onDataChange?.([newRow, ...data]);
  }

  function handleEditExpense(id: string, payload: NewExpenseData) {
    const updated = data.map((row) =>
      row.id === id
        ? {
            ...row,
            date: payload.date,
            paidBy: payload.paidBy,
            description: payload.description,
            group: Array.isArray(payload.group) ? payload.group.join(", ") : payload.group,
            amountPaid: payload.amountPaid,
          }
        : row
    );
    onDataChange?.(updated);
  }

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
    <div className={cn("w-full space-y-4", className)}>
      {(title || onDataChange) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {title && <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>}
          {onDataChange && (
            <div className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto" onClick={openAdd}>
                Add Expense
              </Button>
              <AddExpense
                key={dialogOpen ? (editingRow?.id ?? "add") : "add"}
                onAddExpense={handleAddExpense}
                onEditExpense={handleEditExpense}
                action={action}
                editData={editingRow}
                open={dialogOpen}
                onOpenChange={handleDialogOpenChange}
              />
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-x-auto overflow-y-hidden rounded-lg border border-border sm:mx-0"
        )}
      >
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
            {onDataChange && (
              <th className="h-10 sm:h-11 px-2 sm:px-4 text-right align-middle font-medium text-muted-foreground text-xs sm:text-sm w-[80px] sm:w-[100px]">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border transition-colors hover:bg-muted/30"
            >
              <td className="p-2 sm:p-4 align-middle text-xs sm:text-sm whitespace-nowrap">
                {formatDate(row.date)}
              </td>
              <td className="p-2 sm:p-4 align-middle font-medium text-xs sm:text-sm">
                {row.paidBy}
              </td>
              <td
                className="p-2 sm:p-4 align-middle text-muted-foreground text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal"
                title={row.description}
              >
                {row.description}
              </td>
              <td
                className="p-2 sm:p-4 align-middle font-medium text-xs sm:text-sm max-w-[80px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal"
                title={row.group}
              >
                {row.group}
              </td>
              <td className="p-2 sm:p-4 text-right align-middle font-medium text-xs sm:text-sm whitespace-nowrap">
                {formatCurrency(row.amountPaid)}
              </td>
              <td
                className={cn(
                  "p-2 sm:p-4 text-right align-middle font-medium text-xs sm:text-sm whitespace-nowrap",
                  row.receivable >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {row.receivable >= 0 ? "+" : ""}
                {formatCurrency(row.receivable)}
              </td>
              <td className="p-2 sm:p-4 text-right align-middle">
                {onDataChange && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs sm:text-sm"
                    onClick={() => openEdit(row)}
                  >
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
