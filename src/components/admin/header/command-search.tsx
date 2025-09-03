"use client"

import { useState } from "react"
import { Command, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandSearch() {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput placeholder="Search orders, products, customers..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem>
              <span>Add new product</span>
            </CommandItem>
            <CommandItem>
              <span>Create new order</span>
            </CommandItem>
            <CommandItem>
              <span>Add customer</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Orders">
            <CommandItem>
              <span>Order #1234 - John Doe</span>
            </CommandItem>
            <CommandItem>
              <span>Order #1233 - Jane Smith</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Products">
            <CommandItem>
              <span>Premium Cotton T-Shirt</span>
            </CommandItem>
            <CommandItem>
              <span>Wireless Bluetooth Headphones</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Customers">
            <CommandItem>
              <span>John Doe</span>
            </CommandItem>
            <CommandItem>
              <span>Jane Smith</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}