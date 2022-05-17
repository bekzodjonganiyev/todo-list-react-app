import "./alert.css"

const Alert = ({hidden}) => {



  return (
      <div className={`modal ${hidden}`}>
        <h2 className="modal-title">Item created!</h2>
      </div>
  )
}

export default Alert