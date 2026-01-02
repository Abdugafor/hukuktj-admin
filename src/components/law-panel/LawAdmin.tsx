/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useEffect, useState } from "react";
import type { LawNode } from "./types";
import LawSidebar from "./LawSidebar";
import LawEditor from "./LawEditor";
import { createLaw, listLaws } from "../../services/lawService";

export default function LawAdmin() {
  const [tree, setTree] = useState<LawNode[]>([]);
  const [selected, setSelected] = useState<LawNode | null>(null);
  const [loading, setLoading] = useState(false);


  const reload = () => {
    // setLoading(true);
    listLaws()
      .then((t) => setTree(t))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const onAddRoot = () => {
    const payload: Partial<LawNode> = {
      title: "Парвандаи нав",
      parentId: null,
    };
    createLaw(payload).then(reload);
  };

  const onSaved = () => {
    setSelected(null);
    reload();
  };

  const onDeleted = () => {
    setSelected(null);
    reload();
  };

  const onSelect = (node: LawNode) => {
    setSelected({ ...node });
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold text-lg text-gray-700">Парвандахо</h2>
          <button
            onClick={onAddRoot}
            className="w-10 h-10 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 text-sm"
          >
            + 
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {loading ? (
            <div className="text-sm text-gray-500">Загрузка...</div>
          ) : (
            <LawSidebar
              nodes={tree}
              onSelect={onSelect}
              onAdded={reload}
            />
          )}
        </div>
      </aside>

      {/* Main editor */}
      <main className="flex-1 p-6 overflow-y-auto">
        {selected ? (
          <LawEditor
            node={selected}
            onSaved={onSaved}
            onDeleted={onDeleted}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-lg italic">
            Парвандаро интихоб кунед барои тахрир кардан
          </div>
        )}
      </main>
    </div>
  );
}
