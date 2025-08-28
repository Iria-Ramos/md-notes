import { useState } from "react";
import FolderTree from "react-folder-tree";
import { apiFetch } from "../../../shared/lib/api";

export const BasicTree = ({ folders }) => {
  const [treeData, setTreeData] = useState(folders);
  let click = 0;

  function findPathById(node, targetId, path = []) {
    if (node.id === targetId) {
      return path; 
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const result = findPathById(child, targetId, [...path, i]);
        if (result) return result;
      }
    }

    return null;
  }

  const updateNodeAtPath = (path, updater) => {
    const newTree = structuredClone(treeData);

    let current = newTree;
    for (const idx of path.slice(0, -1)) {
      current = current.children[idx];
    }
    const lastIdx = path[path.length - 1];
    current.children[lastIdx] = updater(current.children[lastIdx]);

    return newTree;
  };

  const removeNodeAtPath = (path) => {
    const newTree = structuredClone(treeData);
    let current = newTree;
    for (const idx of path.slice(0, -1)) {
      current = current.children[idx];
    }
    const lastIdx = path[path.length - 1];
    current.children.splice(lastIdx, 1);
    return newTree;
  };

  const addNodeAtPath = (path, newNode) => {
    const newTree = structuredClone(treeData);
    let current = newTree;
    for (const i of path) {
      current = current.children[i];
    }
    if (!current.children) current.children = [];
    if (newNode.type === "folder") newNode.children = [];
    current.children.push(newNode);

    window.dispatchEvent(
      new CustomEvent("addSpan", { detail: { node: newNode, tree: newTree } })
    );

    return newTree;
  };

  window.addEventListener("renameNode", async (e) => {
    const newName = e.detail.name;

    let child = treeData;
    const path = findPathById(treeData, e.detail.id)
    for (const p of path) child = child.children[p];
    const id = child.id;

    const res = await apiFetch(`/dirs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      setTreeData((prev) =>
        updateNodeAtPath(path, (node) => ({ ...node, name: newName }))
      );
    } else {
      alert("The name couldn't be changed");
    }
  })

  window.addEventListener("deleteNode", async (e) => {
    const path = findPathById(treeData, e.detail)
    if (path.length === 0) {
        alert("You cannot delete the root folder.");
        return;
      }

      let child = treeData;
      for (const p of path) child = child.children[p];
      const id = child.id;

      const res = await apiFetch(`/dirs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTreeData((prev) => removeNodeAtPath(path));
      } else {
        alert("The file/folder couldn't be deleted");
      }
  })

  window.addEventListener("addNode", async (e) => {
    console.log("Add")
    console.log(e.detail.parentId)
    const parentId = e.detail.parentId;

    const type = e.detail.type ? "folder" : "note";
    const name = type === "folder" ? "new folder" : "new file";

    const res = await apiFetch("/dirs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, name, parentId }),
    });

    if (res.ok) {
      const newNode = await res.json();
      const path = findPathById(treeData, newNode.parent.id)
      setTreeData((prev) => addNodeAtPath(path, newNode));
    } else {
      alert("The file/folder couldn't be created. Please reload the page");
    }
  })
  const onTreeStateChange = async (state, event) => {
    const path = event.path;

    if (event.type === "renameNode") {
      
    } else if (event.type === "deleteNode") {
      
    } else if (event.type === "addNode") {
      
    }
  };

  const onNameClick = ({ nodeData }) => {
    click += 1;
    setTimeout(() => (click = 0), 250);

    if (click === 2) {
      click = 0;
      const { id, type, noteId } = nodeData;

      if (type === "note") {
        window.location.assign(`/file/edit/${noteId}/`);
      } else if (type === "folder") {
        window.dispatchEvent(
          new CustomEvent("folderSelected", { detail: id })
        );
      }
    }
  };

  return (
    <FolderTree
      data={treeData}
      showCheckbox={false}
      indentPixels={15}
      initOpenStatus="open"
      onChange={onTreeStateChange}
      onNameClick={onNameClick}
    />
  );
};
