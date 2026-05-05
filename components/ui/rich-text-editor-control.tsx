'use client';

import { createListCollection, IconButton, Select } from '@chakra-ui/react';
import { useRichTextEditorContext } from './rich-text-editor-context';
import type { Editor } from '@tiptap/react';

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

type ToolbarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  label: string;
};

// Helper component for toolbar buttons
const ToolbarButton = ({
  onClick,
  isActive,
  children,
  label,
}: ToolbarButtonProps) => (
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

type BooleanControlConfig = {
  label: string;
  icon: React.ElementType;
  command: (editor: Editor) => void;
  getVariant?: (editor: Editor) => 'subtle' | 'ghost';
};

// Placeholder factory functions (simplified versions)
export const createBooleanControl = (config: BooleanControlConfig) => {
  const Component = () => {
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

  Component.displayName = `BooleanControl(${config.label})`;

  return Component;
};

type SelectOption = {
  label: string;
  value: string;
};

type SelectControlConfig = {
  label: string;
  placeholder?: string;
  width?: string;
  options: SelectOption[];
  getValue: (editor: Editor) => string;
  command: (editor: Editor, value: string) => void;
};

export const createSelectControl = (config: SelectControlConfig) => {
  const Component = (props: Record<string, unknown>) => {
    const { editor } = useRichTextEditorContext();
    if (!editor) return null;

    const collection = createListCollection({
      items: config.options,
    });

    return (
      <Select.Root
        collection={collection}
        size="sm"
        width={config.width || '100px'}
        value={[config.getValue(editor)]}
        onValueChange={(e) => config.command(editor, e.value[0] as string)}
        {...props}
      >
        <Select.HiddenSelect />

        <Select.Trigger>
          <Select.ValueText placeholder={config.placeholder} />
        </Select.Trigger>

        <Select.Content>
          {collection.items.map((option) => (
            <Select.Item key={option.value} item={option}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    );
  };

  Component.displayName = `SelectControl(${config.label})`;

  return Component;
};

type SwatchControlConfig = {
  label: string;
  icon: React.ElementType;
  getValue: (editor: Editor) => string | null;
  onRemove: (editor: Editor) => void;
  showRemove?: boolean;
};

export const createSwatchControl = (config: SwatchControlConfig) => {
  const Component = (props: Record<string, unknown>) => {
    const { editor } = useRichTextEditorContext();
    if (!editor) return null;

    const currentValue = config.getValue(editor);

    return (
      <IconButton
        size="sm"
        variant={currentValue ? 'subtle' : 'ghost'}
        aria-label={config.label}
        {...props}
        onClick={() => {
          if (currentValue && config.showRemove) {
            config.onRemove(editor);
          }
        }}
      >
        <config.icon />
      </IconButton>
    );
  };

  Component.displayName = `SwatchControl(${config.label})`;

  return Component;
};
