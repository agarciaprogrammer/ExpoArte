import type { PreSale } from "../types";
interface CheckInBarData {
  hour: string;
  people: number;
}

  // Puedes cambiar esto fácilmente cuando quieras
  const START_HOUR = 20; // 20:00 (8 PM)
  const END_HOUR = 3;    // 03:00 (3 AM)

function generateHourLabels(startHour: number, endHour: number): string[] {
    const hours: string[] = [];
    let hour = startHour;
    do {
      hours.push(hour.toString().padStart(2, '0') + ':00');
      hour = (hour + 1) % 24;
    } while (hour !== (endHour + 1) % 24);
    return hours;
  }

export function processCheckInsByHour(preSales: PreSale[]): CheckInBarData[] {
  const hourLabels = generateHourLabels(START_HOUR, END_HOUR);

  const checkInCountByHour: Record<string, number> = {};

  for (const hour of hourLabels) {
    checkInCountByHour[hour] = 0;
  }

  preSales.forEach((entry) => {
    if (!entry.checkedInCount || entry.checkedInCount === 0) return;

    const updatedDate = new Date(entry.updatedAt!);
    const hourLabel = updatedDate.getHours().toString().padStart(2, '0') + ':00';

    if (checkInCountByHour.hasOwnProperty(hourLabel)) {
      checkInCountByHour[hourLabel] += entry.checkedInCount;
    }
  });

  return hourLabels.map(hour => ({
    hour,
    people: checkInCountByHour[hour],
  }));
}

