import React from 'react'

import PropTypes from 'prop-types'

import styles from './index.module.css'
// 引入基地址
import { BASE_URL } from '../../utils/request'


const NoHouse = ({ children }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={BASE_URL + '/img/not-found.png'}
      alt="暂无数据"
    />
    <p className={styles.msg}>{children}</p>
  </div>
)

NoHouse.propTypes = {
  children: PropTypes.node.isRequired
}

export default NoHouse
