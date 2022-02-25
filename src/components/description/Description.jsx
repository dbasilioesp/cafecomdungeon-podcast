import './description.css'

export default function Description({content}) {

  let inContent = content.replace(/<p>\s+<\/p>/gi, '')
  inContent = inContent.replaceAll('<br>', '')
  inContent = inContent.replaceAll('<br/>', '')
  
  return (
    <div className="description" dangerouslySetInnerHTML={{__html: inContent}}></div>
  )
}