export type FileFromAPI = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export type FileNode = {
  folderId: string,
  folderName: string,
  notes: FileFromAPI[],
}