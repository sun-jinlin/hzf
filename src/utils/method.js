// 全部公共方法

// 引入api
import { getCityInfo } from '../api/City';

// 封装获取sessionStorage
export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
// 封装设置sessionStorage
export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
// 封装删除sessionStorage
export function removeStorage(key) {
  localStorage.removeItem(key)
}

// 获取当前位置
export function getLocalCity() {
  const sessionCityList = getStorage('CURR_CityList')
  if (!sessionCityList) {
    return new Promise((resolve, reject) => {
      const { BMap } = window
      var myCity = new BMap.LocalCity();
      myCity.get(async (res) => {
        const { status, data, description } = await getCityInfo(res.name)
        if (status === 200) {
          setStorage('CURR_CityList', data)
          resolve(data)
        } else {
          reject(description)
        }
      });
    })

  } else {
    return Promise.resolve(sessionCityList)
  }

}

// token key
export const HZF_TOKEN = 'HZF_TOKEN'

// 获取token
export function getToken() {
  return getStorage(HZF_TOKEN)
}
// 设置token
export function setToken(data) {
  setStorage(HZF_TOKEN, data)
}
// 删除token
export function removeToken() {
  removeStorage(HZF_TOKEN)
}
// 当前是否有token
export function isToken() {
  return !!getToken()
}
