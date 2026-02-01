"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddFriend, { type Friend } from "@/components/layout/AddFriend";
import FriendsTable, { type FriendRow } from "@/components/layout/FriendsTable";

const defaultFriends: FriendRow[] = [
  { id: "1", name: "Muneeb", username: "muneeb", status: "Active" },
  { id: "2", name: "Naveed", username: "naveed", status: "Active" },
  { id: "3", name: "Alamgeer", username: "alamgeer", status: "Pending" },
  { id: "4", name: "Rohaan", username: "rohaan", status: "Inactive" },
];

export default function FriendsPage() {
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [friends, setFriends] = useState<FriendRow[]>(defaultFriends);

  function handleAddFriend(friend: Friend) {
    const username = friend.email.split("@")[0];
    if (friends.some((f) => f.id === friend.id)) return;
    setFriends((prev) => [
      ...prev,
      { id: friend.id, name: friend.name, username, status: "Pending" as const },
    ]);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Friends</h2>
        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => setAddFriendOpen(true)}
          >
            Add Friend
          </Button>
          <AddFriend
            open={addFriendOpen}
            onOpenChange={setAddFriendOpen}
            onAddFriend={handleAddFriend}
          />
        </div>
      </div>
      <FriendsTable data={friends} onDataChange={setFriends} />
    </>
  );
}