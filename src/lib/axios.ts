import axios from 'axios'

export const api = axios.create({
  baseURL: `http://api.mediastack.com/v1`,
})

api.interceptors.request.use(
  config => {
    const separator = config.url?.includes('?') ? '&' : '?'

    config.url = `${config.url}${separator}access_key=${import.meta.env.VITE_API_ACCESS_KEY}`
    return config
  },
  error => {
    return Promise.reject(error)
  },
)
