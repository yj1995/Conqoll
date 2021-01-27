import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from '../styles/index.scss'

export const LeftNav = props => {
  
  return (
    <div className={styles.leftNav}>
      <ExpansionPanel expanded className={styles.leftNavList}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={styles.leftNavTitle}
        >
          Menu
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ul className={styles.leftNavInnerList}>
            <li><Link to={`/All`}>All</Link></li>
            <li><Link to={`/Listing`}>Shortlisted</Link></li>
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
