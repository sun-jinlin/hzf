import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'

// 引入withFormik高阶组件
import { withFormik } from 'formik';
// 引入yup
import * as yup from 'yup';
// 引入api
import { login } from '../../api/User';
// 设置token
import { setToken } from '../../utils/method';

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {errors.username && <div className={styles.error}>{errors.username}</div>}

            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {errors.password && <div className={styles.error}>{errors.password}</div>}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}
const NewLogin = withFormik({
  mapPropsToValues: () => ({
    username: 'test2',
    password: 'test2'
  }),

  // Custom sync validation
  // validate: values => {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = 'Required';
  //   }

  //   return errors;
  // },
  // 表单验证
  validationSchema: yup.object().shape({
    username: yup.string().required('用户名称不能为空！').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: yup.string().required('密码不能为空！').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线'),
  }),
  // 登录按钮
  handleSubmit: async (values, { props }) => {
    const { username, password } = values;
    const { status, data, description } = await login({ username, password })
    if (status === 200) {
      Toast.success(description, 1, () => {
        setToken(data.token)
        const backUrl = props.location.backUrl
        if (backUrl) {
          props.history.replace(backUrl)
        } else {
          props.history.replace('/home/profile')
        }

      })
    } else {
      Toast.fail(description)
    }
  },

})(Login);

export default NewLogin
