/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import styled from "styled-components";
import ENV from '../../env';
import Card from '../../components/card/Card'
import PageButton from '../../components/page-button/PageButton'
import SearchInput from '../../components/search-input/SearchInput'
import PaginationInfo from '../../components/pagination-info/PaginationInfo';

const LIMIT = 20;
let timer;

const SearchForm = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 auto 30px;
`

const Pagination = styled.nav`
  display: flex;
  gap: 6px;
`

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`


export default function Home() {
  const [episodes, setEpisodes ] =  useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage ] =  useState(1)
  const [total, setTotal] = useState(9999)
  const [numberOfPages, setNumberOfPages] = useState(9999)
  const [search, setSearch] = useState(null)
  const [nextEnable, setNextEnable] = useState(true)
  const [prevEnable, setPrevEnable] = useState(true)
  const [ searchParams ] = useSearchParams()

  function setPageQueryParam(page) {
    const url = new URL(window.location.href)
    url.searchParams.set('page', page)
    window.history.pushState({ path: url.href }, '', url.href);
  }

  function setSearchQueryParam(query) {
    const url = new URL(window.location.href)
    url.searchParams.set('q', query)
    window.history.pushState({ path: url.href }, '', url.href);
  }

  async function nextPage() {
    const newPage = page + 1
    setPage(newPage)
    setPageQueryParam(newPage)
    await getEpisodes(newPage, search);
  }

  async function prevPage() {
    const newPage = page - 1
    setPage(newPage)
    setPageQueryParam(newPage)
    await getEpisodes(newPage, search);
  }

  async function getEpisodes(page, search) {
    const config = { params: { page: page - 1, q: search }}
    const { data } = await axios.get(`${ENV.api}/episodes`, config);
    const inNumberOfPages = Math.ceil(data.total / LIMIT)

    setTotal(data.total);
    setEpisodes([...data.data]);
    setNumberOfPages(inNumberOfPages)
    setNextEnable(page < inNumberOfPages)
    setPrevEnable(page > 1)
  }

  function searchEpisodes(searchParam) {
    setLoading(true);
    if (timer) { clearTimeout(timer) }

    timer = setTimeout(async () => {
      setPage(1)
      setPageQueryParam(1)
      setSearchQueryParam(searchParam)
      setSearch(searchParam)
      await getEpisodes(page, searchParam)
      setLoading(false);
    }, 600);
  }

  useEffect(async () => {
    setLoading(true);
    const inPage = searchParams.get('page')
    const inSearch = searchParams.get('q')

    if (inPage) {
      setPage(Number(inPage))
    }

    if (inSearch) {
      setSearch(inSearch)
    }

    await getEpisodes(inPage || page, inSearch);
    setLoading(false);
  }, [])

  const handleChange = (event) => {
    searchEpisodes(event.target.value)
  }

  const referrer = window.location.pathname + window.location.search

  return (
    <>
      <SearchForm className='search-form'>
        <SearchInput onChange={handleChange} />
        <Pagination className='pagination'>
          <PageButton onClick={() => prevPage()} disabled={!prevEnable}>&#60;</PageButton>
          <PageButton onClick={() => nextPage()} disabled={!nextEnable}>&#62;</PageButton>
        </Pagination>
      </SearchForm>
      <PaginationInfo page={page} numberOfPages={numberOfPages} total={total}></PaginationInfo>
      {
        loading && <div>Carregando mais episódios...</div>
      }
      <CardGrid className="card-grid">
        {!loading &&
          episodes.map((item, index) => {
            return (
              <Card
                id={item.id}
                title={item.name}
                description={item.preview || item.htmlDescription}
                link={`/episodes/${item.id}?ref=${referrer}`}
                key={index}
              />
            )
          })
        }
      </CardGrid>
    </>
  )
}
