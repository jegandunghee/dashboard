import '../Styles/Todolist.css';

const TodoList = ({save, onDel, onToggle}) => {




  return (
    <ul id="todo-list">
      {
        save.map((list, idx) => {
          return (
          <li key={idx}>
            <input type="checkbox" onChange={() => {onToggle(list.id)}} checked = {list.done}/>
            
            {/* <span className={list.done ? "done" : "" }>{list.todo}</span> */}
            <span style={{
              textDecoration : list.done ? "line-through" : "none", 
              textDecorationColor : list.done ? "rgba(255, 115, 34, 0.31)" : "none",
              textDecorationThickness : list.done ? "13px" : "none" 
              }}>
                {list.todo}
            </span>
            <button onClick={() => {onDel(list.id)}}>×</button>
          </li>
        )

        })

      }
    </ul>
  )
}

export default TodoList