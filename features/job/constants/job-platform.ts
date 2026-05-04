import AdeccoSvg from '@/public/job-platform/adecco.svg';
import LinkedInSvg from '@/public/job-platform/linkedin.svg';
import IndeedSvg from '@/public/job-platform/indeed.svg';
import GlassdoorSvg from '@/public/job-platform/glassdoor.svg';
import ZipRecruiterSvg from '@/public/job-platform/ziprecruiter.svg';
import MonsterSvg from '@/public/job-platform/monster.svg';
import CareerBuilderSvg from '@/public/job-platform/careerbuilder.svg';
import SimplyHiredSvg from '@/public/job-platform/simplyhired.svg';
import FlexJobsSvg from '@/public/job-platform/flexjobs.svg';
import RemoteOKSvg from '@/public/job-platform/remoteok.svg';
import WeWorkRemotelySvg from '@/public/job-platform/weworkremotely.svg';
import AngelListSvg from '@/public/job-platform/angellist.svg';
import GithubSvg from '@/public/job-platform/github.svg';
import StackOverflowSvg from '@/public/job-platform/stackoverflow.svg';
import DiceSvg from '@/public/job-platform/dice.svg';
import GoogleSvg from '@/public/job-platform/google.svg';
import CraigslistSvg from '@/public/job-platform/craigslist.svg';
import UpworkSvg from '@/public/job-platform/upwork.svg';
import FiverrSvg from '@/public/job-platform/fiverr.svg';
import ToptalSvg from '@/public/job-platform/toptal.svg';
import HiredSvg from '@/public/job-platform/hired.svg';
import VetterySvg from '@/public/job-platform/vettery.svg';
import LaddersSvg from '@/public/job-platform/ladders.svg';
import RobertHalfSvg from '@/public/job-platform/roberthalf.svg';
import RandstadSvg from '@/public/job-platform/randstad.svg';
import KellySvg from '@/public/job-platform/kelly.svg';
import ManpowerSvg from '@/public/job-platform/manpower.svg';
import IdealistSvg from '@/public/job-platform/idealist.svg';
import { createListCollection } from '@chakra-ui/react';

export const PLATFORMS = [
  { label: 'LinkedIn', value: 'linkedin', img: LinkedInSvg },
  { label: 'Indeed', value: 'indeed', img: IndeedSvg },
  { label: 'Glassdoor', value: 'glassdoor', img: GlassdoorSvg },
  { label: 'ZipRecruiter', value: 'ziprecruiter', img: ZipRecruiterSvg },
  { label: 'Monster', value: 'monster', img: MonsterSvg },
  { label: 'CareerBuilder', value: 'careerbuilder', img: CareerBuilderSvg },
  { label: 'SimplyHired', value: 'simplyhired', img: SimplyHiredSvg },
  { label: 'FlexJobs', value: 'flexjobs', img: FlexJobsSvg },
  { label: 'RemoteOK', value: 'remoteok', img: RemoteOKSvg },
  {
    label: 'We Work Remotely',
    value: 'weworkremotely',
    img: WeWorkRemotelySvg,
  },
  { label: 'AngelList (Wellfound)', value: 'angellist', img: AngelListSvg },
  { label: 'GitHub Jobs', value: 'github', img: GithubSvg },
  { label: 'Stack Overflow', value: 'stackoverflow', img: StackOverflowSvg },
  { label: 'Dice', value: 'dice', img: DiceSvg },
  { label: 'Google Jobs', value: 'google', img: GoogleSvg },
  { label: 'Craigslist', value: 'craigslist', img: CraigslistSvg },
  { label: 'Upwork', value: 'upwork', img: UpworkSvg },
  { label: 'Fiverr', value: 'fiverr', img: FiverrSvg },
  { label: 'Toptal', value: 'toptal', img: ToptalSvg },
  { label: 'Hired', value: 'hired', img: HiredSvg },
  { label: 'Vettery', value: 'vettery', img: VetterySvg },
  { label: 'Ladders', value: 'ladders', img: LaddersSvg },
  { label: 'Robert Half', value: 'roberthalf', img: RobertHalfSvg },
  { label: 'Randstad', value: 'randstad', img: RandstadSvg },
  { label: 'Adecco', value: 'adecco', img: AdeccoSvg },
  { label: 'Kelly Services', value: 'kelly', img: KellySvg },
  { label: 'Manpower', value: 'manpower', img: ManpowerSvg },
  { label: 'Idealist', value: 'idealist', img: IdealistSvg },
];

export const JOB_PLATFORM = createListCollection({
  items: PLATFORMS,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});
