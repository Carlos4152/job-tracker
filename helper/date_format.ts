
import { format, formatDistance, isToday, isYesterday } from 'date-fns';

export const date_format = {
  // For timeline display
  timeline: (date: Date | string | number) => {
    const dateObj = new Date(date);
    const now = new Date();
    
    if (isToday(dateObj)) {
      return `Today at ${format(dateObj, 'h:mm a')}`;
    }
    
    if (isYesterday(dateObj)) {
      return `Yesterday at ${format(dateObj, 'h:mm a')}`;
    }
    
    // Within last 7 days
    const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 7) {
      return formatDistance(dateObj, now, { addSuffix: true });
    }
    
    // Older dates
    return format(dateObj, 'MMM d, yyyy');
  },
  
  // Just date without time
  dateOnly: (date: Date | string | number) => {
    return format(new Date(date), 'MMM d, yyyy');
  }
};