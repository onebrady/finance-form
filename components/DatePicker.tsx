import { DateInput3 } from "@blueprintjs/datetime2";
import { useCallback, useState } from "react";

function DatePicker(): JSX.Element {
  const [dateValue, setDateValue] = useState<Date | null>(null);

  const handleChange = useCallback(
    (newDate: string | null, isUserChange: boolean) => {
      if (isUserChange) {
        const parsedDate = newDate ? parseDate(newDate) : null; // Use parseDate to convert string to Date
        setDateValue(parsedDate);
      }
    },
    []
  );

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString();
  }, []);

  const parseDate = useCallback((str: string): Date | null => {
    const parts = str.match(/(\d+)/g); // Matches and groups digits in the date string
    if (parts) {
      const date = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10)
      );
      return !isNaN(date.getTime()) ? date : null;
    }
    return null;
  }, []);

  const formattedValue = dateValue ? formatDate(dateValue) : null;

  return (
    <DateInput3
      formatDate={formatDate}
      onChange={handleChange}
      parseDate={parseDate}
      placeholder="M/D/YYYY"
      value={formattedValue}
    />
  );
}

export default DatePicker;
