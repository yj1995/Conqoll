import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import styles from '../styles/all.scss'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import InfiniteScroll from "react-infinite-scroll-component"
import { StateDropdown, RegionDropdown } from 'react-india-state-region-selector';
import { overallDataPageNo, updateListingData } from '../Redux/dataAction'

export function All() {
  const dispatch = useDispatch()
  const [renderBodyData, setRenderBodyData] = useState([])
  let { overallData: { loading, allData, overallPageNos, listingData } } = useSelector((state) => state)
  let pageNo = overallPageNos
  const [openDialog, setOpenDialog] = useState(false)
  const [State, setState] = useState('')
  const [region, setRegion] = useState('')
  const [cityValue, setCityValues] = useState('')
  const [search, setSearchValue] = useState('')
  let searchData = []

  useEffect(() => {
    if (allData.length) {
      _.forEach(allData, (val, key) => {
        allData[key].key = key
      })
      renderBody(_.take(allData, pageNo * 20))
    }
  }, [allData])

  const renderBody = (data) => {
    const finalData = []
    finalData.push(data.map((val, i) => (renderRow(val, i))))
    setRenderBodyData(finalData[0])
  }

  const shortlised = (e, i) => {
    allData[i].shortlisted = true
    renderBody(_.take(searchData.length ? searchData : allData, pageNo * 20))
    listingData[i] = allData[i]
    dispatch(updateListingData(listingData))
  }

  const deleteData = (e, i) => {
    allData.splice(i, 1)
    if (listingData.length && listingData[i]) {
      listingData.splice(i, 1)
      dispatch(updateListingData(listingData))
    }
    if (searchData.length) {
      const index = _.findIndex(searchData, (val, key) => (val.key === i))
      searchData.splice(index, 1)
    }
    renderBody(_.take(searchData.length ? searchData : allData, pageNo * 20))
  }

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    ++pageNo
    dispatch(overallDataPageNo(pageNo))
    setTimeout(() => {
      renderBody(_.take(searchData.length ? searchData : allData, pageNo * 20))
    }, 1500);
  };

  const selectState = (val) => {
    setState(val)
  }

  const selectRegion = (val) => {
    setRegion(val)
  }

  const setCityValue = (val) => {
    setCityValues(val)
  }

  const addNewCity = () => {
    if (cityValue) {
      if (State) {
        if (region) {
          allData.splice(0, 0, { City: cityValue, District: region, State, shortlised: false })
          _.forEach(allData, (val, key) => {
            allData[key].key = key
          })
          renderBody(_.take(allData, pageNo * 20))
          addCity()
        } else {
          alert('required district value')
        }
      } else {
        alert('required state value')
      }
    } else {
      alert('reqired city value')
    }
  }

  const createDialog = () => {
    return (
      <Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{ paper: styles.DialogHolder }}>
        <DialogTitle>Add City</DialogTitle>
        <TextField
          className={styles.DialogtextArea}
          autoFocus
          id="name"
          label="City"
          type="text"
          fullWidth
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
        />
        <StateDropdown
          value={State}
          classes={`${styles.DialogtextArea} ${styles.dropdown}`}
          onChange={(val) => selectState(val)} />
        <RegionDropdown
          State={State}
          value={region}
          classes={`${styles.DialogtextArea} ${styles.dropdown}`}
          onChange={(val) => selectRegion(val)} />
        <DialogActions>
          <Button onClick={addNewCity} variant='contained' color='primary'>
            Add
          </Button>
          <Button onClick={addCity} variant='contained' color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const addCity = () => {
    setOpenDialog(!openDialog)
  }

  const onSearch = (val) => {
    setSearchValue(val)
    searchData = allData.filter((data) => (data.State.toLowerCase().match(val.toLowerCase()) || data.City.toLowerCase().match(val.toLowerCase()) || data.District.toLowerCase().match(val.toLowerCase())))
    pageNo = 1
    renderBody(_.take(searchData, pageNo * 20))
  }

  const renderRow = (val, i) => {
    const { City, District, State, shortlisted, key } = val
    return (
      <Grid className={styles.listItems} container key={i + City + District}>
        <Grid item className={styles.listHeaderTitle} xs={2} sm={2} md={2} lg={2}>{State}</Grid>
        <Grid item className={styles.listHeaderTitle} xs={3} sm={3} md={3} lg={3}>{District}</Grid>
        <Grid item className={styles.listHeaderTitle} xs={3} sm={3} md={3} lg={3}>{City}</Grid>
        <Grid item className={styles.listHeaderTitle} xs={4} sm={4} md={4} lg={4}>
          <Button className={styles.actionButton} disabled={shortlisted} variant='contained' color='primary' onClick={(e) => shortlised(e, key)}>Shortlisted</Button>
          <Button className={styles.actionButton} variant='contained' color='primary' onClick={(e) => deleteData(e, key)} >Delete</Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <div className={styles.allParent}>
      <Grid container className={styles.searchFields}>
        <Grid item xs={9} sm={9} md={9} lg={9}>
          <TextField
            id='search'
            className={styles.textField}
            onChange={e => onSearch(e.target.value)}
            value={search}
            name='search'
            fullWidth
            placeholder='Search by State, City or District'
            variant='outlined'
            autoFocus
          />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Button className={`${styles.actionButton} ${styles.addButton}`} variant='contained' color='primary' onClick={() => addCity()} >Add City</Button>
        </Grid>
      </Grid>
      <h3>Complete Data</h3>
      {!loading ? renderBodyData.length ? (
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
      ) : 'No Data Avaliable' : 'Loading'}
      {openDialog ? createDialog() : null}
    </div>
  )
}
