import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components'
import ENV from '../../env';
import Description from '../../components/description/Description'

const Title = styled.h2`
  font-size: 2rem;
`

const Breadcrumbs = styled.div`
  font-size: 1.3rem;
`

export default function Episode() {
  const { episodeId } = useParams();
  const [loading, setLoading] = useState(true)
  const [episode, setEpisode] = useState(null)

  useEffect(() => {
    async function getEpisode() {
      const { data } = await axios.get(`${ENV.api}/episodes/${episodeId}`);
      setEpisode(data)
      setLoading(false)
    }

    getEpisode()
  }, [episodeId])

  return (
    <div className="episode">
      {(!loading && episode) && (
        <>
          <Breadcrumbs>
            <Link to="/">Lista de episódios</Link> &gt;&nbsp;
            <Link to={`/episodes/${episodeId}`}>{episode.episodeNumber}</Link>
          </Breadcrumbs>
          <Title className="episode__title">{episode.name}</Title>
          <Description content={episode.htmlDescription}></Description>
        </>
      )}
    </div>
  )
}