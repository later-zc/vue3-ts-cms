// export const BASE_URL = 'http://codercba.com:8000'
// export const TIMEOUT = 10000
// console.log(import.meta)
// console.log(import.meta.env)
// console.log('VITE_NAME: ', import.meta.env.VITE_NAME)
// console.log('VITE_BASE_URL: ', import.meta.env.VITE_BASE_URL)

let BASE_URL = ''
if (import.meta.env.DEV) {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://152.136.185.210:4000'
}

export const TIMEOUT = 10000
export { BASE_URL }
