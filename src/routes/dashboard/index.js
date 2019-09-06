/* eslint-disable one-var,one-var-declaration-per-line,import/first */
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Nav from 'components/nav'
import { WhiteSpace, List, ImagePicker, ActivityIndicator, Modal } from 'components'
import Img from '../../themes/images/face.jpg'
import { getImages } from 'utils'
import styles from './index.less'

const alert = Modal.alert
const Item = List.Item
const Brief = Item.Brief

const Dashboard = ({ dashboard, loading, searching, dispatch }) => {
  const faceList = JSON.parse(localStorage.getItem('history')) || [],
    // handlerClick = (files) => {
    //   const reader = new FileReader()
    //   reader.readAsDataURL(files[0].file)
    //   reader.onload = (e) => {
    //     dispatch({
    //       type: 'dashboard/query',
    //       payload: {
    //         image: reader.result.substr(reader.result.indexOf(',') + 1),
    //         liveness_control: 'NORMAL',
    //         group_id_list: 'ceshi0001',
    //         image_type: 'BASE64',
    //         quality_control: 'LOW',
    //       },
    //     })
    //   }
    // },
    handlerPhotoClick = (image) => {
      dispatch({
        type: 'dashboard/query',
        payload: {
          image: image,
          liveness_control: 'NORMAL',
          group_id_list: 'ceshi0001',
          image_type: 'BASE64',
          quality_control: 'LOW',
        },
      })
    },
    handlerListClick = (i) => {
      dispatch(routerRedux.push({
        pathname: '/result',
        query: {
          index: i,
        },
      }))
    },
    hanlerClean = () => {
      alert('清空记录？', '确定要清空所有记录吗???', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '清空', onPress: () => {
            localStorage.removeItem('history')
            dispatch({
              type: 'dashboard/updateState',
              payload: {
                userInfo: {},
              },
            })
          },
        },
      ])
    },
    renderTitle = () => (
      <div className={styles.header}>
        <div>历史记录</div>
        <div className={styles.clearn} onClick={hanlerClean}>清空历史</div>
      </div>
    )

  return (
    <div className={styles.outer}>
      <Nav isGoBack={false} title="重点人员监控"/>
      <div className={styles.container}>
        <img src={Img} alt="" onClick={cnTakePhoto.bind(null, handlerPhotoClick, 1)}/>
        {/*<ImagePicker*/}
          {/*files={[]}*/}
          {/*onChange={handlerClick}*/}
          {/*accept="image/*"*/}
        {/*/>*/}
        {
          faceList.length > 0 ?
            <List renderHeader={() => renderTitle()} className={styles.list}>
              {
                faceList.map((item, i) => {
                  const { age, name, uploadDate, photo } = item
                  return (
                    <Item
                      key={i}
                      thumb={getImages(photo)}
                      onClick={() => handlerListClick(i)}
                      extra={`${age}岁`}
                    >
                      {name}
                      <Brief>{uploadDate}</Brief>
                    </Item>
                  )
                })
              }
            </List>
            :
            null
        }
      </div>
      <ActivityIndicator
        toast
        text="正在匹配..."
        animating={searching}
      />
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({
  dashboard,
  searching: loading.global,
  loading,
}))(Dashboard)
