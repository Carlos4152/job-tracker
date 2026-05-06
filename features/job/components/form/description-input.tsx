'use client';

import { Control, RichTextEditor } from '@/components/ui/rich-text-editor';
import { Editor } from '@tiptap/react';

interface DescriptionInputProps {
  editor: Editor | null;
}

const DescriptionInput = ({ editor }: DescriptionInputProps) => {
  if (!editor) return null;

  return (
    <RichTextEditor.Root editor={editor} width="100%" minHeight="250px">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>
        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
          <Control.H4 />
        </RichTextEditor.ControlGroup>
        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>
        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  );
};

export default DescriptionInput;
