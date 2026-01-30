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

export default function AddExpense() {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    paidBy: "",
    description: "",
    group: "",
    amountPaid: 0,
  });

  return (
    <>
      <Button size="sm" onClick={() => setAddExpenseOpen(true)}>
        Add Expense
      </Button>

      <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add expense</DialogTitle>
            <DialogDescription>
              Add a new expense. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted");
              console.log("Date:", formData.date);
              console.log("Paid by:", formData.paidBy);
              console.log("Description:", formData.description);
              console.log("Group:", formData.group);
              console.log("Amount:", formData.amountPaid);
              setAddExpenseOpen(false);
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
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Dinner at restaurant"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="group" className="text-sm font-medium">
                Group
              </label>
              <input
                id="group"
                type="text"
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                placeholder="e.g. Naveed, Alamgeer, Rohaan"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount paid
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amountPaid}
                onChange={(e) => setFormData({ ...formData, amountPaid: parseFloat(e.target.value) })}
                placeholder="0.00"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddExpenseOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add expense</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
