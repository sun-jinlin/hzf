// 引入request
import request from '../../utils/request'

// 获取轮播图
export function getSwiper() {
  return request({
    url: '/home/swiper'
  })
}
export function getGrid(area = '北京') {
  return request({
    url: '/home/groups',
    params: area
  })
}