import './page-button.css'

export default function PageButton({children, disabled, onClick}) {
  return (
    <button className="page-button" type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}