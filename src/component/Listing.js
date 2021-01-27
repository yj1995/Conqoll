import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import styles from '../styles/all.scss'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import InfiniteScroll from "react-infinite-scroll-component"
import { listingDataPageNo, updateListingData } from '../Redux/dataAction'

export function Listing() {
  const dispatch = useDispatch()
  const [renderBodyData, setRenderBodyData] = useState([])
  let { overallData: { loading, listingPageNos, listingData, allData } } = useSelector((state) => state)
  let pageNo = listingPageNos

  useEffect(() => {
    if (listingData.length) {
      renderBody(_.take(listingData, listingData.length))
    }
  }, [listingData])

  const renderBody = (data) => {
    const finalData = []
    finalData.push(data.map((val, i) => (val && renderRow(val, i))))
    setRenderBodyData(finalData[0])
  }

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    ++pageNo
    dispatch(listingDataPageNo(pageNo))
    setTimeout(() => {
      renderBody(_.take(listingData, pageNo * 20))
    }, 1500);
  };

  const remove = (e, i) => {
    listingData.splice(i, 1)
    allData[i].shortlisted = false
    dispatch(updateListingData(listingData))
    renderBody(_.take(listingData, listingData.length))
  }
  const renderRow = (val, i) => {
    const { City, District, State } = val
    return (
      <Grid className={styles.listItems} container key={i + City + District}>
        <Grid item className={styles.listHeaderTitle} xs={2} sm={2} md={2} lg={2}>{State}</Grid>
        <Grid item className={styles.listHeaderTitle} xs={3} sm={3} md={3} lg={3}>{District}</Grid>
        <Grid item className={styles.listHeaderTitle} xs={3} sm={3} md={3} lg={3}>{City}</Grid>
        <Grid item className={styles.listHeaderTitle} xs={4} sm={4} md={4} lg={4}>
          <Button className={styles.actionButton} variant='contained' color='primary' onClick={(e) => remove(e, i)}>Remove</Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <div className={styles.allParent}>
      <h3>Shortlisted Data</h3>
      {!loading ? listingData.length ? (
        <>
          <Grid className={styles.listHeader} container>
            <Grid item className={styles.listHeaderTitle} xs={2} sm={2} md={2} lg={2}>State</Grid>
            <Grid item className={styles.listHeaderTitle} xs={3} sm={3} md={3} lg={3}>District</Grid>
            <Grid item className={styles.listHeaderTitle} xs={3} sm={3} md={3} lg={3}>City</Grid>
            <Grid item className={styles.listHeaderTitle} xs={4} sm={4} md={4} lg={4}>Action</Grid>
          </Grid>
          <InfiniteScroll
            dataLength={renderBodyData.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {renderBodyData.map((i, index) => (
              i
            ))}
          </InfiniteScroll>
        </>
      ) : 'No Data Available' : 'Loading'}
    </div>
  )
}
