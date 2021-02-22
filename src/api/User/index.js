// 获取axios
import request from '../../utils/request'


// 用户登录接口
export function login(data) {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}
/**
 * 获取用户的信息资料
 * 
 */
export function getUserInfo() {
  return request({
    method: 'get',
    url: '/user',
  })
}
/**
 * 登出
 * 
 */
export function logout() {
  return request({
    method: 'post',
    url: '/user/logout'
  })
}
/**
 * 房屋是否收藏
 */
export function getFavorites(id) {
  return request({
    mothod: 'get',
    url: `/user/favorites/${id}`
  })
}
/**
 * 添加收藏
 */
export function addFavorites(id) {
  return request({
    method: 'post',
    url: `/user/favorites/${id}`
  })
}
/**
 * 取消收藏
 */
export function delFavorites(id) {
  return request({
    method: 'delete',
    url: `/user/favorites/${id}`
  })
}