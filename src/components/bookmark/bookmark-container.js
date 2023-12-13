
import React, {useEffect, useRef, useState} from 'react';

export default function BookmarkContainer({openSite}) {

    const [bookmark, setBookmark] = useState([]);
    const [folders, setFolders] = useState([]);
    const [folderItems, setFolderItems] = useState([]); // [folder1: [item1, item2], folder2: [item1, item2]
    const [search, setSearch] = useState('Click enter to add!');
    const [add, setAdd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const folderRef = useRef(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    function Modal({ isOpen, onClose, onConfirm }) {
        if (!isOpen) return null;
    
        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Create Folder</h2>
                    <input type="text" placeholder="Folder Name" className='form-control' ref={folderRef} />
                    <div className='d-flex justify-content-end m-2'>
                        <button className='btn btn-primary m-2'  onClick={onConfirm}>Create</button>
                        <button className='btn btn-secondary m-2' onClick={onClose}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        );
    }
    
    const add_website = () => {
        console.log('add website');
        const inputElement = inputRef.current;

        setBookmark(prevBookmark => [...prevBookmark, inputElement.value]);
        setSearch('Search');
    }
    
    useEffect(() => {
        const inputElement = inputRef.current;
        const handleKeyDown = (e) => {
            if(e.key === 'Enter') {
                
                setBookmark(prevBookmark => [...prevBookmark, inputElement.value]);
                setSearch('Search');
            }
        };

        if (inputElement) {
            inputElement.addEventListener('keydown', handleKeyDown);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, []); 

    const handleDragStart = (e, item, origin) => {
        console.log('drag start');
        e.dataTransfer.setData("text/plain", item);
        e.dataTransfer.setData("origin", origin);
    };
    
    const handleDrop = (e, index, folderIndex, destination) => {
        console.log('drop');
        e.preventDefault();
        e.stopPropagation();
        const item = e.dataTransfer.getData("text/plain");
        const origin = e.dataTransfer.getData("origin");
    
        if (origin === "bookmark" && destination === "folder") {
            setFolderItems(prevFolderItems => prevFolderItems.map((folder, idx) => {
                if (idx === index) {
                    // This is the folder we want to update
                    return [...folder, item]; // Add the new item to this folder
                } else {
                    // Other folders remain unchanged
                    return folder;
                }
            }));
            setBookmark(bookmark.filter((_, i) => i !== index));
            // Logic to move item from bookmark to folder
            // Update the folders and bookmark state accordingly
        } else if (origin === "folder" && destination === "bookmark") {
            setBookmark(prevBookmark => [...prevBookmark, item]);
           
            
            console.log('folder to bookmark');
            // Logic to move item from folder to bookmark
            // Update the folders and bookmark state accordingly
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const createFolder = () => {
        console.log('create folder');
        setIsModalOpen(true);

    };
    const handleCreateFolder = () => {
        // Logic to create a folder
        const folderElement = folderRef.current;
        var foldername = folderElement.value;
        console.log(foldername);
        setFolders(prevFolders => [...prevFolders, foldername]);
        setFolderItems(prevFolderItems => [...prevFolderItems, []]);
        setIsModalOpen(false); // Close the modal after creation
    };

    const openFolder = (foldername) => {
        console.log('open folder');
        console.log(foldername);
        // Logic to open a folder
    };
    
  return (
    <div className='bookmark-container'>

        <div className="container p-0 ">
      <div className="row justify-content-end">
        <div className="col-12 mt-2">
            <button className='btn' style={{display: isOpen ? "none" : ""}} onClick={()=> setIsOpen(!isOpen)}>
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="white"  xmlns="http://www.w3.org/2000/svg">
                <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#8c8a8a" stroke-width="1" stroke-linejoin="round"/>
                </svg>
            </button>
          <div className='card bookmark-card' style={{display: isOpen ? "" : "none"}}>
            <div className="card-header d-flex justify-content-between">
                <h2>Bookmark</h2>
                <button className='btn btn-danger' onClick={()=> setIsOpen(!isOpen)}>X</button>
            </div>
            <div className='card-body bookmark-body'>
               
                <br />
                <div className='d-flex justify-content-between m-2 align-items-center'>
                    <strong className='text-center'>Websites</strong>
                    <button className='btn btn-primary d-flex justify-content-between' onClick={createFolder}>

                    <span class="btn-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
								  	<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								  	<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
								</svg>
							</span>Create Folder
                    </button>
                    <Modal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onConfirm={handleCreateFolder}
                    />
                </div>
                <div className='d-flex justify-content-between m-0 position-relative '>
                <input type='text' ref={inputRef} className='form-control pl-4' placeholder={search} />
                <span className='search-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </span>
                </div> 
                <ul className='list-group'>
                        {folders.map((item, index) => (
                            <li
                                className='list-group-item'
                                key={index}
                                onDrop={(e) => handleDrop(e, index, 0, "folder")} onDragOver={handleDragOver}
                            >
                                <div className='d-flex justify-content-between align-items-center folder-item'>
                                    <div className='d-flex justify-content-start align-items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                                        </svg>
                                            <span className='bookmark-item-text mt-2 ' onClick={() => openFolder(item)}>{item}</span>
                                    </div>
                                   
                                    <button className='btn' onClick={() => setAdd(!add)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                            </svg>
                                    </button>
                                    <button className='btn' onClick={() => setFolders(folders.filter((_, i) => i !== index))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </button>
                                </div>
                                <ul className='list-group' >
                                    {folderItems[index].map((item, folderIndex) => (
                                        <li
                                            className='list-group-item'
                                            key={index}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, item, "folder")}
                                            onDrop={(e) => handleDrop(e, index, folderIndex, "folder")} onDragOver={handleDragOver}
                                            

                                        >
                                            <div className='d-flex justify-content-between'>
                                                <p className='bookmark-item-text m-0 text-center ' onClick={() => openSite(item)}>{item}</p>
                                                <button className='btn btn-light' onClick={() => setFolderItems(folderItems.filter((_, i) => i !== index))}>X</button>
                                            </div>
                                        </li>
                                    
                                    ))}
                                </ul>
                            </li>
                        ))}
                        
                </ul>
                <ul className='list-group'>
                        {bookmark.map((item, index) => (
                            <li
                                className='list-group-item'
                                key={index}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, "bookmark")}
                                onDrop={(e) => handleDrop(e, index, 0, "bookmark")} onDragOver={handleDragOver}
                            >
                                <div className='d-flex justify-content-between'>
                                    <p className='bookmark-item-text m-0 text-center ' onClick={() => openSite(item)}>{item}</p>
                                    <button className='btn btn-light' onClick={() => setBookmark(bookmark.filter((_, i) => i !== index))}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}