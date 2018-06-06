/**
 * Created by liufulin on 18-6-1.
 */
import axios from 'axios'

export const Request = function (url, params) {
  let instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    withCredentials: true
  })
  return params ? instance.get(url, {params: params}) : instance.get(url)
}