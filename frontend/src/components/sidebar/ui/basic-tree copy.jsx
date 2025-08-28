import { useEffect } from 'react';
import FolderTree, {testData } from 'react-folder-tree';
import { apiFetch } from '../../../shared/lib/api';

export const BasicTree = ({ folders }) => {
  let click = 0;

  const onTreeStateChange = async (state, event) => {
    console.log(event)
    const path = event.path
    if (event.type == "renameNode") {
      const newName = event.params[0]
      let child = folders
      for (const p in path) {
        child = child.children[path[p]];
      }

      const id = child.id
      const res = await apiFetch(`/dirs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) {
        alert("The name couldn't be changed")
      }
    } else if (event.type == "deleteNode") {
      if (event.path.length === 0) {
        alert("You cannot delete the root folder.");
        return;
      }

      let child = folders
      for (const p in path) {
        child = child.children[path[p]];
      }

      const id = child.id
      const res = await apiFetch(`/dirs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        alert("The file/folder couldn't be deleted")
      }
    } else if (event.type == "addNode") {
      // TODO: If creat fails, avoid creating folder/file in tree
      let child = folders

      for (const p in path) {
        child = child.children[path[p]];
      }

      const id = child.id;
      const type = event.params[0] ? 'folder' : 'note';
      const name = event.params[0] ? 'new folder' : 'new file';
      const res = await apiFetch("/dirs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: type, name: name, parentId: id })
      });

      if (!res.ok) {
        alert("The file/folder couldn't be created. Please reload the page")
      }
    }
  }

  const onNameClick = ({ defaultOnClick, nodeData }) => {
    console.log("click")
    click += 1;
    setTimeout(() => (click = 0), 250);
    if (click == 2) {
      click = 0;
      const {
        id, type, noteId
      } = nodeData;
      if (type == 'note') {
        console.log("Redirect...")
        window.location.assign(`/file/edit/${noteId}/`);
      } else if (type == 'folder') {
        console.log(`Node ${id}`)
        window.dispatchEvent(new CustomEvent("folderSelected", { detail: id }));
      }
      return
    }
  };
  

  return (
    <FolderTree
      data={folders}
      showCheckbox={false}
      indentPixels='15'
      initOpenStatus='open'
      onChange={onTreeStateChange}
      onNameClick={onNameClick}
    />
  );
};