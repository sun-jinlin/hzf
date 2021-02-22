import request from '../../utils/request'

export function getSelected(id) {
  return request({
    method: 'get',
    url: '/houses/condition',
    params: { id }
  })
}

// 根据条件查询房屋
export function getFilterData(cityId, filter, start = 1, end = 20) {
  return request({
    method: 'get',
    url: '/houses',
    params: {
      cityId,
      ...filter,
      start,
      end
    }
  })
}