/* eslint-disable react-hooks/set-state-in-effect */
import  { useEffect, useRef, useState } from "react";
import type { LawNode } from "./types";
import { Button } from "@mui/material";
import { deleteLaw, updateLaw } from "../../services/lawService";
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import SimpleImage from "@editorjs/simple-image";

type Props = {
  node: LawNode;
  onSaved: (node: LawNode) => void;
  onDeleted: (id: string) => void;
};

export default function LawEditor({ node,  onSaved, onDeleted }: Props) {
  const [draft, setDraft] = useState({ ...node });
  const [saving, setSaving] = useState(false);
  const ejInstance = useRef(null);
  const editorRef = useRef(null);

  const emptyContent = {
    blocks: [],
  };

  useEffect(() => {
    setDraft({ ...node });

  }, [node.id]);

  useEffect(() => {
    if (!ejInstance.current) {
      ejInstance.current = new EditorJS({
        holder: editorRef.current,

        data: draft.content || emptyContent,

        /** Tools */
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 1,
            },
          },
          List: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              caption: false,
              services: {
                youtube: true,
                imgur: true,
                giphy: true
              }
            }
          },
          image: {
            class: SimpleImage,
            inlineToolbar: true
          }
        },
      });
    }else {
      ejInstance.current.data = draft.content || emptyContent;
    } 

    return () => {
      if (ejInstance.current && ejInstance.current.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, [draft.content]);

  const save = () => {
    setSaving(true);

    ejInstance.current.save()
      .then((outputData) => onUpdateLaw(outputData))
      .catch((error) => {
        setSaving(false);
        console.log('Saving failed: ', error);
      });
  };

  const onUpdateLaw = (data) => {
    const updatedData: LawNode = {
      ...draft,
      content: data
    }

    updateLaw(updatedData)
        .then((updated) => {
          setSaving(false);
          onSaved(updated);
        })
        .catch(() => setSaving(false));
  }

  const remove = () => {
    if (!confirm("Delete this route and all children?")) return;
    deleteLaw(Number(draft.id)).then(() => onDeleted(draft.id));
  };

  return (
      <>
      <div>

        <input 
          type="text" 
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          className="w-full p-5 text-3xl font-bold border-b border-b-gray-200"
        />

         <div className="w-full">
            <div id="editorjs" ref={editorRef} />
         </div>
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <Button variant="contained" color="error" onClick={remove}>
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={save}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
      </>
  )
}