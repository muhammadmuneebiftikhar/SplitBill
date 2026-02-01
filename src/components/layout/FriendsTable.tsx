"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FriendRow {
  id: string;
  name: string;
  username: string;
  status: "Active" | "Pending" | "Inactive";
}

interface FriendsTableProps {
  data?: FriendRow[];
  onDataChange?: (data: FriendRow[]) => void;
  className?: string;
}

export default function FriendsTable({
  data = [],
  onDataChange,
  className,
}: FriendsTableProps) {
  function handleRemove(id: string) {
    onDataChange?.(data.filter((row) => row.id !== id));
  }

  function getStatusClass(status: FriendRow["status"]) {
    switch (status) {
      case "Active":
        return "text-green-600 dark:text-green-400";
      case "Pending":
        return "text-amber-600 dark:text-amber-400";
      case "Inactive":
        return "text-muted-foreground";
      default:
        return "";
    }
  }

  return (
    <div
      className={cn(
        "w-full overflow-x-auto overflow-y-hidden rounded-lg border border-border sm:mx-0",
        className
      )}
    >
      <table className="w-full min-w-[480px] caption-bottom text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 transition-colors hover:bg-muted/50">
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Name
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Username
            </th>
            <th className="h-10 sm:h-11 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm">
              Status
            </th>
            {onDataChange && (
              <th className="h-10 sm:h-11 px-2 sm:px-4 text-right align-middle font-medium text-muted-foreground text-xs sm:text-sm w-[100px]">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border transition-colors hover:bg-muted/30"
            >
              <td className="p-2 sm:p-4 align-middle font-medium text-xs sm:text-sm">
                {row.name}
              </td>
              <td className="p-2 sm:p-4 align-middle text-muted-foreground text-xs sm:text-sm">
                {row.username}
              </td>
              <td
                className={cn(
                  "p-2 sm:p-4 align-middle font-medium text-xs sm:text-sm",
                  getStatusClass(row.status)
                )}
              >
                {row.status}
              </td>
              {onDataChange && (
                <td className="p-2 sm:p-4 text-right align-middle">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs sm:text-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleRemove(row.id)}
                  >
                    Remove friend
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
