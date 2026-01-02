import type { LawNode } from "./types";
import LawNodeComponent from "./LawNode";
import { createLaw } from "../../services/lawService";

type Props = {
  nodes: LawNode[];
  onSelect: (node: LawNode) => void;
  onAdded: () => void;
};

export default function LawSidebar({ nodes, onSelect, onAdded }: Props) {

  const addChild = (parent: LawNode) => {
    const payload: Partial<LawNode> = {
      title: "Парвандаи нав",
      parentId: parent.id,
    };
    createLaw(payload).then(() => onAdded());
  };

  return (
    <ul className="pl-2 space-y-1">
      {nodes.map((node) => (
        <li key={node.id}>
          <LawNodeComponent node={node} onSelect={onSelect} onAdd={addChild} />
        </li>
      ))}
    </ul>
  );
}
