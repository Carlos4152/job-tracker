import { Prose } from '@/components/ui/prose';

export default function JobDescription({ content }: { content: string }) {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />;
}
