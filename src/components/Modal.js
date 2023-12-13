function Modal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create Folder</h2>
                <input type="text" placeholder="Folder Name" />
                <button onClick={onConfirm}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}