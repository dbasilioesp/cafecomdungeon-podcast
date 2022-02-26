import styled from 'styled-components'

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: pink;
  height: 40px;
  border: 0;
  border-radius: 6px;
  font-size: 1.4rem;

  &[disabled] {
    filter: opacity(0.6)
  }

  &:hover {
    background-color: palevioletred;
  }
`

export default function PageButton({children, disabled, onClick}) {
  return (
    <Button className="page-button" type="button" disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  )
}
