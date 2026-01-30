"use client"

import AddExpense, { type NewExpenseData } from "@/components/layout/AddExpense";
import Table from "@/components/layout/table";
import { useState } from "react";

export interface ExpenseRow {
  id: string;
  date: string;
  paidBy: string;
  description: string;
  group: string;
  amountPaid: number;
  receivable: number;
}

const defaultData: ExpenseRow[] = [
  {
    id: "1",
    date: "2025-01-28",
    paidBy: "Muneeb",
    description: "Dinner at restaurant",
    group: "Naveed, Alamgeer, Rohaan",
    amountPaid: 120,
    receivable: 80,
  },
  {
    id: "2",
    date: "2025-01-27",
    paidBy: "Alamgeer",
    description: "Groceries",
    group: "Naveed, Muneeb, Rohaan",
    amountPaid: 85.5,
    receivable: -28.5,
  },
  {
    id: "3",
    date: "2025-01-26",
    paidBy: "Rohaan",
    description: "Movie tickets",
    group: "Alamgeer, Muneeb",
    amountPaid: 45,
    receivable: 15,
  },
  {
    id: "4",
    date: "2025-01-26",
    paidBy: "Naveed",
    description: "Nashta",
    group: "Muneeb, Alamgeer, Rohaan",
    amountPaid: 45,
    receivable: 15,
  },
  {
    id: "5",
    date: "2025-01-26",
    paidBy: "Naveed",
    description: "Nashta",
    group: "Muneeb, Alamgeer, Rohaan",
    amountPaid: 45,
    receivable: 15,
  },
  {
    id: "6",
    date: "2025-01-26",
    paidBy: "Naveed",
    description: "Nashta",
    group: "Muneeb, Alamgeer, Rohaan",
    amountPaid: 45,
    receivable: 15,
  },
  {
    id: "7",
    date: "2025-01-26",
    paidBy: "Rohaan",
    description: "Movie tickets",
    group: "Alamgeer, Muneeb",
    amountPaid: 45,
    receivable: 15,
  },
];

const onAction = (row: ExpenseRow) => {
  console.log("Action for", row);
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseRow[]>(defaultData);

  function handleAddExpense(data: NewExpenseData) {
    const newRow: ExpenseRow = {
      id: generateId(),
      date: data.date,
      paidBy: data.paidBy,
      description: data.description,
      group: Array.isArray(data.group) ? data.group.join(", ") : data.group,
      amountPaid: data.amountPaid,
      receivable: 0,
    };
    setExpenses((prev) => [newRow, ...prev]);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">Expenses</h2>
        <div className="w-full sm:w-auto">
          <AddExpense onAddExpense={handleAddExpense} />
        </div>
      </div>
      <Table data={expenses} onAction={onAction} />
    </>
  )
}
  