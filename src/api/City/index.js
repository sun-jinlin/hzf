// 引入request
import request from '../../utils/request'

// 根据城市名获取城市id
export function getCityInfo(name) {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}

// 获取城市列表 1 表示获取所有城市数据 2 表示城市下区的数据
export function getCityList(level = 1) {
  return request({
    url: '/area/city',
    params: {
      level
    }
  })
}
// 获取热门城市
export function getCityHot() {
  return request({
    url: '/area/hot',
  })
}
