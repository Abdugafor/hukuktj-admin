import type { OutputData } from "@editorjs/editorjs";

export interface Law {
  id?: number;
  title: string;
  content: string;
  chapter?: string;
}

export interface LawNode {
    id: string;
    title: string;
    content: OutputData;
    parentId?: string | null;
    children?: LawNode[];
}