function MoveCountLabel({ count }) {
  const label = (count === 1) ? "move" : "moves"
  return (
    <div className="move-label">
      {count} {label}
    </div>
  )
}

export default MoveCountLabel
