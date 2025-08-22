import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Checkbox } from "~/components/ui/checkbox"
import { Trash2, Edit } from "lucide-react"

interface BulkActionsProps {
  selectedCount: number
  totalCount: number
  isAllSelected: boolean
  onSelectAll: () => void
  onDelete: () => void
  onEdit?: () => void
  showEdit?: boolean
}

export function BulkActions({
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onDelete,
  onEdit,
  showEdit = false,
}: BulkActionsProps) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-2">
        <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={onSelectAll} />
        <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
          Select All ({totalCount})
        </label>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{selectedCount} selected</Badge>
          <Button variant="destructive" size="sm" onClick={onDelete} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete ({selectedCount})
          </Button>
          {showEdit && onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit} className="flex items-center gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
