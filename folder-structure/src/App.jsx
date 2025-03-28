import { useContext, useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import DirectoryContext from "./main";
import "./App.css";

function NewFolder({ hide, currentPath }) {
  const [addFolder, setAddFolder] = useState(false);
  const { directory, setDirectory } = useContext(DirectoryContext);

  function handleAddNewFolder(e) {
    e.stopPropagation();

    if (e.keyCode === 13) {
      setAddFolder(false);

      const completeDirectory = structuredClone(directory);

      let root = completeDirectory;
      currentPath.forEach((path) => {
        root = root[path];
      });
      root[e.target.value] = {};

      setDirectory(completeDirectory);
    }
  }

  return addFolder ? (
    <input
      placeholder="Add New Folder"
      className={`${hide ? "hidden" : ""}`}
      onKeyDown={(e) => {
        handleAddNewFolder(e);
      }}
    />
  ) : (
    <span
      className={`add-folder-item ${hide ? "hidden" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setAddFolder(true);
      }}
    >
      + Add new folder
    </span>
  );
}

function ResolveDirectory({ obj, hide, currentPath }) {
  const currentDirectory = Object.entries(obj || {});

  if (currentDirectory?.length === 0) {
    return <NewFolder hide={hide} currentPath={currentPath} />;
  }

  return (
    <>
      <ul className={`directory-list ${hide ? "hidden" : ""}`}>
        {currentDirectory.map(([key, value], index) => {
          return (
            <Directory
              key={index}
              property={key}
              value={value}
              currentPath={currentPath}
            />
          );
        })}
      </ul>
      <NewFolder hide={hide} currentPath={currentPath} />
    </>
  );
}

function Directory({ property, value, currentPath }) {
  const hasChildren = Object.keys(value || {}).length > 0;
  const [hide, setHide] = useState(true);

  const newPath = [...currentPath, property];
  return (
    <li
      className="directory-item"
      onClick={(e) => {
        if (e.target.tagName !== "INPUT") {
          e.stopPropagation();
          setHide(!hide);
        }
      }}
    >
      <div className="directory-label">
        {hasChildren ? (
          hide ? (
            <ChevronRight className="directory-icon" />
          ) : (
            <ChevronDown className="directory-icon" />
          )
        ) : (
          <span className="directory-icon-spacer"></span>
        )}
        {hide ? (
          <Folder className="folder-icon" size={18} />
        ) : (
          <FolderOpen className="folder-icon" size={18} />
        )}
        <span className="directory-name">{property}</span>
      </div>
      <ResolveDirectory obj={value} hide={hide} currentPath={newPath} />
    </li>
  );
}

function App() {
  const { directory } = useContext(DirectoryContext);
  return (
    <div className="directory-container">
      <ResolveDirectory obj={directory} hide={false} currentPath={[]} />
    </div>
  );
}

export default App;
