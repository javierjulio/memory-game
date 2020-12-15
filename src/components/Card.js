function Card({ item, disableAction, onOpen }) {
  let classNames = ["cell", "card"]
  if (item.backfaceIsUp) {
    classNames.push("toggled")
  }

  const clickHandler = (event) => {
    if (!disableAction && !item.backfaceIsUp)
      onOpen(item)
  }

  return (
    <div className={classNames.join(" ")} onClick={clickHandler}>
      <div className="card-front"></div>
      <div className="card-back">{item.type.toString()}</div>
    </div>
  )
}

export default Card;
