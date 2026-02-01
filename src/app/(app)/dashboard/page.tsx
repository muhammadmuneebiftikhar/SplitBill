"use client";

import Table from "@/components/layout/ExpenseTable";
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
];

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<ExpenseRow[]>(defaultData);

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mb-5">Dashboard</h2>
      {/* Total Expenses and Total Receivables */}
      <div className="mt-5 mb-5 border border-border rounded-lg p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center">
            <div className="sm:ml-2 text-red-500">
              <h3 className="text-base sm:text-lg font-bold">Total Expenses</h3>
              <p className="text-sm">1,000.00 AED</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="sm:ml-2 text-green-500">
              <h3 className="text-base sm:text-lg font-bold">
                Total Receivables
              </h3>
              <p className="text-sm">7,00.00 AED</p>
            </div>
          </div>
        </div>
      </div>
      {/* Friends List with their total expenses and receivables */}
      <div className="flex items-center gap-4 mt-5 mb-5">
        <div className="border border-border rounded-lg p-4 sm:p-5 w-1/4">
          <h3 className="text-base sm:text-lg font-bold mb-2">Rohaan</h3>
          <div className="flex items-center justify-between gap-2">
            <div className="text-red-500">
              <p className="text-sm">Payable</p>
              <p className="text-sm">100.00 AED</p>
            </div>
            <div className="text-green-500">
              <p className="text-sm">Owed to you</p>
              <p className="text-sm">10.00 AED</p>
            </div>
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 sm:p-5 w-1/4">
        <h3 className="text-base sm:text-lg font-bold mb-2">Alamgeer</h3>
          <div className="flex items-center justify-between gap-2">
            <div className="text-red-500">
              <p className="text-sm">Payable</p>
              <p className="text-sm">100.00 AED</p>
            </div>
            <div className="text-green-500">
              <p className="text-sm">Owed to you</p>
              <p className="text-sm">10.00 AED</p>
            </div>
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 sm:p-5 w-1/4">
        <h3 className="text-base sm:text-lg font-bold mb-2">Naveed</h3>
          <div className="flex items-center justify-between gap-2">
            <div className="text-red-500">
              <p className="text-sm">Payable</p>
              <p className="text-sm">100.00 AED</p>
            </div>
            <div className="text-green-500">
              <p className="text-sm">Owed to you</p>
              <p className="text-sm">10.00 AED</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <Table data={expenses} title="Expenses" onDataChange={setExpenses} />
    </>
  );
}
