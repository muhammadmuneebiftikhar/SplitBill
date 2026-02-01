"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Friend {
  id: string;
  name: string;
  email: string;
}

interface AddFriendProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friends?: Friend[];
  onAddFriend?: (friend: Friend) => void;
}

const defaultFriends: Friend[] = [
  { id: "1", name: "Muneeb", email: "muneeb@gmail.com" },
  { id: "2", name: "Naveed", email: "naveed@gmail.com" },
  { id: "3", name: "Alamgeer", email: "alamgeer@gmail.com" },
  { id: "4", name: "Rohaan", email: "rohaan@gmail.com" },
  { id: "5", name: "Aziz", email: "aziz@gmail.com" },
  { id: "6", name: "Shujja", email: "shujja@gmail.com" },
];

export default function AddFriend({
  open,
  onOpenChange,
  friends = defaultFriends,
  onAddFriend,
}: AddFriendProps) {
  const [search, setSearch] = useState("");

  const filteredFriends = useMemo(() => {
    if (!search.trim()) return friends;
    const q = search.trim().toLowerCase();
    return friends.filter(
      (f) =>
        f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q)
    );
  }, [friends, search]);

  function handleSelect(friend: Friend) {
    onAddFriend?.(friend);
    setSearch("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Friends</DialogTitle>
          <DialogDescription>
            Search by name or email to find and add a friend.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <input
            type="text"
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            autoFocus
          />
          <div className="max-h-[280px] overflow-y-auto rounded-md border border-border">
            {filteredFriends.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No friends found.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {filteredFriends.map((friend) => (
                  <li key={friend.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(friend)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                    >
                      <span className="font-medium">{friend.name}</span>
                      <span className="text-muted-foreground">{friend.email}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
