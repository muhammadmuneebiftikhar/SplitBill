"use client"

import AddExpense from "@/components/layout/AddExpense";
import Table from "@/components/layout/table"

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

export default function ExpensesPage() {
  
  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Expenses</h2>
      <div className="flex justify-end mb-5">
        <AddExpense />
      </div>
      <Table data={defaultData} onAction={onAction} />

    </>
  )
}
  