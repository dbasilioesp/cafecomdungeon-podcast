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
  margin: 0 auto 10px;
`

const Pagination = styled.div`
  display: flex;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const PaginationRight = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const TotalInfo = styled.span`
  display: block;
  font-size: 12px;
  margin-top: 5px;
`

const CustomSelect = styled.select`
  height: 40px;
  border-radius: 4px;
  padding: 0 5px;
`


export default function Home() {
  const [ searchParams, setSearchParams ] = useSearchParams()

  const params = {
    page: Number(searchParams.get('page')) || 1,
    search: searchParams.get('q'),
    order: searchParams.get('order') || 'desc'
  }

  const [config, setConfig] =  useState(params)

  const [episodes, setEpisodes ] =  useState([])
  const [loading, setLoading] = useState(false)
  const [referrer, setReferrer] = useState(null)

  const [total, setTotal] = useState(9999)
  const [numberOfPages, setNumberOfPages] = useState(9999)
  const [nextEnable, setNextEnable] = useState(true)
  const [prevEnable, setPrevEnable] = useState(true)

  async function nextPage() {
    setConfig({...config, page: config.page + 1})
  }

  async function prevPage() {
    setConfig({...config, page: config.page - 1})
  }

  function factoryQueryParams() {
    const query = {
      page: config.page,
      order: config.order
    }
    if (config.search) {
      query.q = config.search
    }
    return query;
  }

  function startLoading() {
    document.body.style.setProperty('height', document.body.clientHeight + 'px')
    setLoading(true)
  }

  function finishLoading() {
    setLoading(false)
    document.body.style.setProperty('height', 'auto')
  }

  async function getEpisodes() {
    startLoading()

    const params = {
      page: config.page - 1,
      q: config.search,
      order: config.order,
    }

    setSearchParams(factoryQueryParams())

    const { data } = await axios.get(`${ENV.api}/episodes`, { params });
    const inNumberOfPages = Math.ceil(data.total / LIMIT)

    setTotal(data.total);
    setEpisodes([...data.data]);
    setNumberOfPages(inNumberOfPages)
    setNextEnable(config.page < inNumberOfPages)
    setPrevEnable(config.page > 1)

    setReferrer(btoa(window.location.pathname + window.location.search));
    setTimeout(() => finishLoading(), 300);
  }

  useEffect(() => {
    getEpisodes();
  }, [])

  useEffect(() => {
    getEpisodes()
  }, [config])

  const handleSearch = (event) => {
    const search = event.target.value;
    if (timer) { clearTimeout(timer) }

    timer = setTimeout(async () => {
      setConfig({...config, page: 1, search})
    }, 600);
  }

  const handleOrder = async (event) => {
    setConfig({...config, page: 1, order: event.target.value})
  }

  return (
    <>
      <SearchForm className='search-form'>
        <SearchInput onChange={handleSearch} />
        <TotalInfo>{total} episódios encontrados.</TotalInfo>
      </SearchForm>
      <Pagination className='pagination'>
          <PaginationInfo page={config.page} numberOfPages={numberOfPages}></PaginationInfo>
          <PaginationRight>
            <CustomSelect onChange={handleOrder} value={config.order}>
              <option value="asc">Ordem ASC</option>
              <option value="desc">Ordem DESC</option>
            </CustomSelect>
            <PageButton onClick={() => prevPage()} disabled={!prevEnable}>&#60;</PageButton>
            <PageButton onClick={() => nextPage()} disabled={!nextEnable}>&#62;</PageButton>
          </PaginationRight>
      </Pagination>
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
                date={item.releaseDate}
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
