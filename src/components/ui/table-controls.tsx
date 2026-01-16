import { useState } from "react";
import {
  Filter,
  SlidersHorizontal,
  Download,
  Printer,
  Columns,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface ColumnDef {
  id: string;
  label: string;
  visible: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

interface TableControlsProps {
  columns: ColumnDef[];
  onColumnsChange: (columns: ColumnDef[]) => void;
  filters?: FilterOption[];
  onExport?: () => void;
  onPrint?: () => void;
  className?: string;
}

export function TableControls({
  columns,
  onColumnsChange,
  filters,
  onExport,
  onPrint,
  className,
}: TableControlsProps) {
  const toggleColumn = (columnId: string) => {
    const updated = columns.map((col) =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(updated);
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export to CSV behavior
      alert("Экспорт данных в Excel (CSV)");
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Filters */}
      {filters && filters.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Фильтрация</h4>
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    {filter.label}
                  </Label>
                  <Select value={filter.value} onValueChange={filter.onChange}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Column Visibility */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Columns className="h-4 w-4" />
            Столбцы
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Видимые столбцы</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.visible}
              onCheckedChange={() => toggleColumn(column.id)}
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        Экспорт
      </Button>

      {/* Print */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" />
        Печать
      </Button>
    </div>
  );
}
