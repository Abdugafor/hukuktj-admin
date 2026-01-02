import { useState } from "react";
import type { LawNode } from "./types";

type Props = {
  node: LawNode;
  onSelect: (node: LawNode) => void;
  onAdd: (node: LawNode) => void;
};

export default function LawNodeComponent({ node, onSelect, onAdd }: Props) {
  const [expanded, setExpanded] = useState(true);

  const toggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpanded(!expanded);
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(node);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-1 px-2 rounded-md hover:bg-blue-50 transition-colors group">
        <div className="flex items-center gap-2 w-full">
          {node.children?.length ? (
            <button
              onClick={toggle}
              className="w-6 h-6 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-200"
            >
              {expanded ? "−" : "+"}
            </button>
          ) : (
            <div className="w-6 h-6" />
          )}

          <button
            onClick={() => onSelect(node)}
            className="flex-1 text-left text-gray-800 hover:text-blue-700 font-medium"
          >
            {node.title}
          </button>
        </div>

        <button
          onClick={handleAddChild}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-800"
          title="Add child"
        >
          +
        </button>
      </div>

      {node.children?.length && expanded && (
        <ul className="ml-6 border-l border-gray-200 pl-3 space-y-1">
          {node.children.map((c) => (
            <li key={c.id}>
              <LawNodeComponent node={c} onSelect={onSelect} onAdd={onAdd} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
