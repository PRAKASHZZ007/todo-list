import "./TodoItem.css";

function TodoItem({
  todo,
  onCheck,
  onDelete,
  onEdit,
  isEditing,
  editText,
  onEditChange,
  onUpdate,
  onCancel,
}) {
  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.isChecked} onChange={onCheck} />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={onEditChange}
            className="edit-input"
          />
          <button onClick={onUpdate} className="update-button">✔</button>
          <button onClick={onCancel} className="cancel-button">✖</button>
        </>
      ) : (
        <>
          <div className="text-group">
            <span className={todo.isChecked ? "checked" : ""}>{todo.text}</span>
            <small className="timestamp">{todo.dateTime}</small>
          </div>
          <button onClick={onEdit} className="edit-button">
            <i className="fa fa-pencil"></i>
          </button>
          <button onClick={onDelete} className="delete-button">
            <i className="fa fa-trash"></i>
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
