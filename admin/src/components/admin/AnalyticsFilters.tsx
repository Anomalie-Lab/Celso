import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AnalyticsFiltersProps {
  filters: {
    days: number;
    startDate?: string;
    endDate?: string;
  };
  onFiltersChange: (filters: AnalyticsFiltersProps['filters']) => void;
}

export function AnalyticsFilters({ filters, onFiltersChange }: AnalyticsFiltersProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.startDate ? new Date(filters.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    filters.endDate ? new Date(filters.endDate) : undefined
  );

  const handleDaysChange = (days: string) => {
    const daysNumber = parseInt(days);
    onFiltersChange({
      days: daysNumber,
      startDate: undefined,
      endDate: undefined,
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    onFiltersChange({
      ...filters,
      startDate: date ? date.toISOString().split('T')[0] : undefined,
    });
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    onFiltersChange({
      ...filters,
      endDate: date ? date.toISOString().split('T')[0] : undefined,
    });
  };

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onFiltersChange({
      days: 30,
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="space-y-2">
        <Label htmlFor="days">Período</Label>
        <Select value={filters.days.toString()} onValueChange={handleDaysChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
            <SelectItem value="365">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Data de início</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateChange}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Data de fim</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={handleEndDateChange}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button variant="outline" onClick={clearFilters}>
        <Filter className="h-4 w-4 mr-2" />
        Limpar
      </Button>
    </div>
  );
}
