import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComboboxMultiple } from "@/components/ui/multiSelect";

export interface NewExpenseData {
  date: string;
  paidBy: string;
  description: string;
  group: string | string[];
  amountPaid: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface EditExpenseData extends NewExpenseData {
  id: string;
}

interface AddExpenseProps {
  onAddExpense?: (data: NewExpenseData) => void;
  onEditExpense?: (id: string, data: NewExpenseData) => void;
  action: "add" | "edit";
  editData: EditExpenseData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultUsers: User[] = [
  { id: "1", name: "Muneeb", email: "muneeb@gmail.com" },
  { id: "2", name: "Naveed", email: "naveed@gmail.com" },
  { id: "3", name: "Alamgeer", email: "alamgeer@gmail.com" },
  { id: "4", name: "Rohaan", email: "rohaan@gmail.com" },
];

const initialFormData: NewExpenseData = {
  date: "",
  paidBy: "",
  description: "",
  group: [],
  amountPaid: 0,
};

function getFormDataFromEdit(editData: EditExpenseData | null): NewExpenseData {
  if (!editData) return initialFormData;
  const group =
    Array.isArray(editData.group)
      ? editData.group
      : typeof editData.group === "string"
        ? editData.group.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
  return {
    date: editData.date,
    paidBy: editData.paidBy,
    description: editData.description,
    group,
    amountPaid: editData.amountPaid,
  };
}

export default function AddExpense({ onAddExpense, onEditExpense, action, editData, open, onOpenChange }: AddExpenseProps) {
  const [formData, setFormData] = useState<NewExpenseData>(() =>
    action === "edit" && editData ? getFormDataFromEdit(editData) : initialFormData
  );

  const selectedGroup = Array.isArray(formData.group)
    ? formData.group
    : formData.group
    ? [formData.group]
    : [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action === "add" ? "Add expense" : "Edit expense"}</DialogTitle>
            <DialogDescription>
              {action === "add" ? "Add a new expense. Fill in the details below." : "Edit the expense. Fill in the details below."}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedGroup.length === 0) return;
              const payload = { ...formData, group: selectedGroup };
              if (action === "edit" && editData?.id) {
                onEditExpense?.(editData.id, payload);
              } else {
                onAddExpense?.(payload);
              }
              setFormData(initialFormData);
              onOpenChange(false);
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="paidBy" className="text-sm font-medium">
                Paid by
              </label>
              <input
                id="paidBy"
                type="text"
                value={formData.paidBy}
                onChange={(e) =>
                  setFormData({ ...formData, paidBy: e.target.value })
                }
                placeholder="Name"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="e.g. Dinner at restaurant"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="group" className="text-sm font-medium">
                Group (select users to split with)
              </label>
              <ComboboxMultiple
                items={defaultUsers.map((u) => u.name)}
                value={selectedGroup}
                onChange={(selected) =>
                  setFormData({ ...formData, group: selected })
                }
                placeholder="Select users..."
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount paid
              </label>
              <input
                id="amount"
                type="number"
                min="1"
                value={formData.amountPaid}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amountPaid: parseFloat(e.target.value),
                  })
                }
                placeholder="0.00"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={selectedGroup.length === 0}>
                {action === "add" ? "Add expense" : "Edit expense"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
