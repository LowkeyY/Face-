/* eslint-disable one-var,one-var-declaration-per-line,import/first */
import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, Toast } from 'components'
import Nav from 'components/nav'
import { getImages } from 'utils'
import styles from './index.less'

const Result = ({ location, result, loading, dispatch }) => {
  const { index = 0 } = location.query,
    { name = '-', gender = '-', age = '-', nation = '-', address = '-', idCard = '-', photo = '-', similarity = 0, deeds = [] } = JSON.parse(localStorage.getItem('history'))[index]
  return (
    <div>
      <Nav title="识别信息" dispatch={dispatch}/>
      <div className={styles.container}>
        <div className={styles.infos}>
          <div className={styles.photo}>
            <img src={getImages(photo)} alt=""/>
            <div className={styles.mask}>
              {`${similarity.toFixed(2)}%`}
            </div>
          </div>
          <div className={styles.info}>
            <p>{name}</p>
            <p><i>性别：</i>{gender}</p>
            <p><i>年龄：</i>{age}</p>
            <p><i>民族：</i>{nation}</p>
            <p><i>出生地：</i>{address}</p>
            <p><i>身份证：</i>{idCard}</p>
          </div>
        </div>
        <div className={styles.history}>
          {
            cnIsArray(deeds) && deeds.length > 0 ?
              deeds.map((item, i) => <div key={i}>{item}</div>)
              :
              null
          }
        </div>
      </div>
    </div>
  )
}


export default connect(({ result, loading, dashboard }) => ({ result, loading, dashboard }))(Result)
