// src/components/ui/rich-text-editor-control.tsx
'use client';

import { IconButton, Select } from '@chakra-ui/react';
import { useRichTextEditorContext } from './rich-text-editor-context';
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuList,
  LuListOrdered,
  LuUndo,
  LuRedo,
  LuQuote,
} from 'react-icons/lu';

// Helper component for toolbar buttons
const ToolbarButton = ({ onClick, isActive, children, label }: any) => (
  <IconButton
    size="sm"
    variant={isActive ? 'subtle' : 'ghost'}
    onClick={onClick}
    aria-label={label}
  >
    {children}
  </IconButton>
);

// Export individual controls
export const Bold = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleBold().run()}
      isActive={editor.isActive('bold')}
      label="Bold"
    >
      <LuBold />
    </ToolbarButton>
  );
};

export const Italic = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleItalic().run()}
      isActive={editor.isActive('italic')}
      label="Italic"
    >
      <LuItalic />
    </ToolbarButton>
  );
};

export const Underline = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleMark('underline').run()}
      isActive={editor.isActive('underline')}
      label="Underline"
    >
      <LuUnderline />
    </ToolbarButton>
  );
};

export const Strikethrough = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleStrike().run()}
      isActive={editor.isActive('strike')}
      label="Strikethrough"
    >
      <LuStrikethrough />
    </ToolbarButton>
  );
};

export const Code = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleCode().run()}
      isActive={editor.isActive('code')}
      label="Code"
    >
      <LuCode />
    </ToolbarButton>
  );
};

export const H1 = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      isActive={editor.isActive('heading', { level: 1 })}
      label="Heading 1"
    >
      <LuHeading1 />
    </ToolbarButton>
  );
};

export const H2 = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      isActive={editor.isActive('heading', { level: 2 })}
      label="Heading 2"
    >
      <LuHeading2 />
    </ToolbarButton>
  );
};

export const H3 = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      isActive={editor.isActive('heading', { level: 3 })}
      label="Heading 3"
    >
      <LuHeading3 />
    </ToolbarButton>
  );
};

export const H4 = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      isActive={editor.isActive('heading', { level: 4 })}
      label="Heading 4"
    >
      <LuHeading4 />
    </ToolbarButton>
  );
};

export const BulletList = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      isActive={editor.isActive('bulletList')}
      label="Bullet List"
    >
      <LuList />
    </ToolbarButton>
  );
};

export const OrderedList = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      isActive={editor.isActive('orderedList')}
      label="Ordered List"
    >
      <LuListOrdered />
    </ToolbarButton>
  );
};

export const Blockquote = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      isActive={editor.isActive('blockquote')}
      label="Blockquote"
    >
      <LuQuote />
    </ToolbarButton>
  );
};

export const Undo = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().undo().run()}
      label="Undo"
    >
      <LuUndo />
    </ToolbarButton>
  );
};

export const Redo = () => {
  const { editor } = useRichTextEditorContext();
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().redo().run()}
      label="Redo"
    >
      <LuRedo />
    </ToolbarButton>
  );
};

// Placeholder factory functions (simplified versions)
export const createBooleanControl = (config: any) => {
  return () => {
    const { editor } = useRichTextEditorContext();
    if (!editor) return null;
    return (
      <ToolbarButton
        onClick={() => config.command(editor)}
        isActive={config.getVariant?.(editor) === 'subtle'}
        label={config.label}
      >
        <config.icon />
      </ToolbarButton>
    );
  };
};

export const createSelectControl = (config: any) => {
  return (props: any) => {
    const { editor } = useRichTextEditorContext();
    if (!editor) return null;
    return (
      <Select.Root
        size="sm"
        width={config.width || '100px'}
        value={[config.getValue(editor)]}
        onValueChange={(e) => config.command(editor, e.value[0])}
        {...props}
      >
        <Select.HiddenSelect />
        <Select.Trigger>
          <Select.ValueText placeholder={config.placeholder} />
        </Select.Trigger>
        <Select.Content>
          {config.options.map((option: any) => (
            <Select.Item key={option.value} item={option}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    );
  };
};

export const createSwatchControl = (config: any) => {
  return (props: any) => {
    const { editor } = useRichTextEditorContext();
    if (!editor) return null;
    const currentValue = config.getValue(editor);
    return (
      <IconButton
        size="sm"
        variant={currentValue ? 'subtle' : 'ghost'}
        aria-label={config.label}
        icon={<config.icon />}
        {...props}
        onClick={() => {
          if (currentValue && config.showRemove) {
            config.onRemove(editor);
          }
        }}
      />
    );
  };
};
