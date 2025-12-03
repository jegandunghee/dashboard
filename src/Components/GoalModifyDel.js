

const GoalModifyDel = ({onEdit, onDelete}) => {
  return (
    <div className="goal_modify_del">
      <p onClick={onEdit}>수정</p>
      <p onClick={onDelete}>삭제</p>
    </div>
  )
}

export default GoalModifyDel