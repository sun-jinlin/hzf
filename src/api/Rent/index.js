// 引入request
import request from '../../utils/request'

// 小区关键词查询
export function getCommunity(id, name) {
  return request({
    method: 'get',
    url: '/area/community',
    params: {
      id, name
    }
  })
}