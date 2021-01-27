import React, { useEffect } from 'react';
import { All, Listing } from './component';
import { LeftNav } from './utils'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { getData } from './Redux/dataAction'
import styles from './styles/index.scss'
import { useDispatch } from 'react-redux'

// This js is used for routing purpose
export function RoutePath(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <div className={styles.mainWrapper}>
      <HashRouter>
        <LeftNav {...props} />
        <div className={styles.contentWrapper}>
          <Switch>
            <Route path={`/All`} exact component={All} />
            <Route path={`/Listing`} component={Listing} />
            <Redirect exact from={`/`} to={`/All`} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  )
}