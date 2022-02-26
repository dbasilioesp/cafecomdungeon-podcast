import styled from 'styled-components'

const DescriptionContainer = styled.div`
  font-size: 16px;
  line-height: 1.5;
`

export default function Description({content}) {

  let inContent = content.replace(/<p>\s+<\/p>/gi, '')
  inContent = inContent.replaceAll('<br>', '')
  inContent = inContent.replaceAll('<br/>', '')

  return (
    <DescriptionContainer
      className="description"
      dangerouslySetInnerHTML={{__html: inContent}}
    ></DescriptionContainer>
  )
}
