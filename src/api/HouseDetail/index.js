// 引入封装的axios
import request from '../../utils/request'

// 获取房屋数据
export function getHouseDetail(id) {
  return request({
    url: `/houses/${id}`
  })
}