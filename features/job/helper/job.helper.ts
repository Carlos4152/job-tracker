import {
  LuCheck,
  LuSend,
  LuCalendar,
  LuFileText,
  LuBriefcase,
  LuUserCheck,
  LuPhone,
  LuMail,
  LuAward,
  LuBadgeX,
} from 'react-icons/lu';

export const urlHelper = {
  extractDomain(websiteUrl: string): string | null {
    if (!websiteUrl) return null;
    try {
      const url = websiteUrl.startsWith('http')
        ? websiteUrl
        : 'https://' + websiteUrl;
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return null;
    }
  },
  getCompanyLogoUrl(websiteUrl: string): string | null {
    const domain = this.extractDomain(websiteUrl);
    if (!domain) return null;
    return `https://logos.hunter.io/${domain}`;
  },
  cleanLinkedInUrl(url: string): string {
    if (!url) return '';

    // Fix common typos
    let cleanUrl = url.replace('htttps://', 'https://');
    cleanUrl = cleanUrl.replace('http://', 'https://');

    // Remove protocol for display
    return cleanUrl.replace('https://www.', '').replace('http://', '');
  },
};

export const timelineHelper = {
  getTimelineIcon(event: string) {
    const eventLower = event.toLowerCase();

    if (eventLower.includes('submitted') || eventLower.includes('applied')) {
      return LuSend;
    }
    if (eventLower.includes('interview')) {
      return LuUserCheck;
    }
    if (eventLower.includes('phone')) {
      return LuPhone;
    }
    if (eventLower.includes('email') || eventLower.includes('reach out')) {
      return LuMail;
    }
    if (eventLower.includes('offer')) {
      return LuAward;
    }
    if (eventLower.includes('reject') || eventLower.includes('declined')) {
      return LuBadgeX;
    }
    if (eventLower.includes('assessment') || eventLower.includes('test')) {
      return LuFileText;
    }
    if (eventLower.includes('follow')) {
      return LuCalendar;
    }

    return LuBriefcase; // default icon
  },
  getEventColor(event: string): string {
    const eventLower = event.toLowerCase();

    if (eventLower.includes('submitted') || eventLower.includes('applied'))
      return 'yellow';
    if (eventLower.includes('interview')) return 'blue';
    if (eventLower.includes('offer')) return 'green';
    if (eventLower.includes('reject')) return 'red';

    return 'gray';
  },
};
