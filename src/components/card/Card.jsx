import { useCallback, useEffect, useRef } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'
import mixpanel from '../../plugins/mixpanel';
import Description from '../description/Description';

const CardContainer = styled.div`
  border-radius: 5px;
  padding: 25px 25px 15px;
  min-width: 200px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-align: left;
  font-size: 16px;

  @media (max-width: 800px) {
    padding: 25px 0 15px;
    box-shadow: none;
  }
`

const CardTitle = styled.h3`
  font-size: 20px;
  line-height: 1;
  margin: 0;
`

const CardLink = styled(Link)`
  color: var(--color-bg-primary);
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`

export default function Card (props){
  const { title, description, link } = props;
  const cardRef = useRef()

  const trackLinks = useCallback(() => {
      const links = cardRef.current.querySelectorAll('a')
      for (const link of links) {
        link.addEventListener('click', (event) => {
          const props = {
            link: event.target.href,
            title: title,
          }
          if (link.getAttributeNames().includes('data-spotify')) {
            mixpanel.track('Spotify Link', props)
          } else {
            mixpanel.track('Card Link', props)
          }
        })
      }
  }, [title, cardRef])

  useEffect(() => {
    trackLinks();
    const links = cardRef.current.querySelectorAll('a');
    for (const link of links) {
      link.setAttribute('target', '_blank');
    }
  }, [trackLinks, cardRef])

  let copy = description.split('<p>#APRESENTA</p>')[0];
  copy = copy.split('<p>##</p>')[0]
  copy = copy.split('***')[0]

  return (
      <CardContainer className="card" ref={cardRef}>
        <CardHeader className="card__header">
          <CardLink to={link}>
            <CardTitle className="card__title">{title}</CardTitle>
          </CardLink>
        </CardHeader>
        <Description content={copy} />
      </CardContainer>
  )
}
