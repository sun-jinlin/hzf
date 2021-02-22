// 引入request
import request from '../../utils/request'

// 获取轮播图
export function getSwiper() {
  return request({
    url: '/home/swiper'
  })
}
// 获取九宫格数据
export function getGrid(area = 'AREA|88cff55c-aaa4-e2e0') {
  return request({
    url: '/home/groups',
    params: area
  })
}
// 获取最新资讯
export function getNews(area = 'AREA|88cff55c-aaa4-e2e0') {
  return request({
    url: '/home/news',
    params: area
  })
}