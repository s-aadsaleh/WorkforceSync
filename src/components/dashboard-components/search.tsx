import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}