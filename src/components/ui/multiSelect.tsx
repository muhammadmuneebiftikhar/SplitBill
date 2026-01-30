"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface ComboboxMultipleProps {
  items: string[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function ComboboxMultiple({
  items,
  value = [],
  onChange,
  placeholder = "Select...",
  className,
}: ComboboxMultipleProps) {
  const [open, setOpen] = React.useState(false)
  const selected = value ?? []

  function toggle(item: string) {
    const next = selected.includes(item)
      ? selected.filter((v) => v !== item)
      : [...selected, item]
    onChange?.(next)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between font-normal", className)}
        >
          <span className="truncate">
            {selected.length > 0 ? selected.join(", ") : placeholder}
          </span>
          <ChevronDownIcon className="ml-2 size-4 opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width)">
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={selected.includes(item)}
            onCheckedChange={() => toggle(item)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
