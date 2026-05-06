// features/job/hooks/useJobForm.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { JobFormData, jobFormSchema } from '../schemas/job.schema';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/shared/toast';
import { JobDTO } from '../types/job.type';
import { useEffect } from 'react';
import { UpdateJob } from '../actions/update-job';
import { AddJob } from '../actions/add-job';

export default function useJobForm(initialData?: JobDTO) {
  const router = useRouter();
  const isEdit = !!initialData?._id;

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      company: initialData?.company || '',
      status: initialData?.status || 'applied',
      platform: initialData?.platform || 'linkedin',
      location: initialData?.location || '',
      salary: initialData?.salary || '',
      jobLink: initialData?.jobLink || '',
      companyWebsite: initialData?.companyWebsite || '',
      companyLinkedIn: initialData?.companyLinkedIn || '',
      description: initialData?.description || '',
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      TextStyleKit,
    ],
    content: initialData?.description || '',
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      form.setValue('description', editor.getHTML(), { shouldValidate: true });
    },
  });

  useEffect(() => {
    if (
      editor &&
      initialData?.description &&
      editor.getHTML() !== initialData.description
    ) {
      editor.commands.setContent(initialData.description);
    }
  }, [editor, initialData]);

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
        company: initialData.company || '',
        status: initialData.status || 'applied',
        platform: initialData.platform || 'linkedin',
        location: initialData.location || '',
        salary: initialData.salary || '',
        jobLink: initialData.jobLink || '',
        companyWebsite: initialData.companyWebsite || '',
        companyLinkedIn: initialData.companyLinkedIn || '',
        description: initialData.description || '',
      });

      if (editor && initialData.description) {
        editor.commands.setContent(initialData.description);
      }
    }
  }, [initialData, form, editor]);

  const onSubmit = async (data: JobFormData) => {
    let result;

    if (isEdit && initialData?._id) {
      result = await UpdateJob(initialData._id, data);
    } else {
      result = await AddJob(data);
    }

    if (!result.success) {
      toast.error('Failed to save job', result.message);
      return;
    }

    toast.success('Job saved', result.message);
    router.push('/jobs');
  };

  return {
    form,
    editor,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
