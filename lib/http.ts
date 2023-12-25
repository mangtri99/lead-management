export default async function http(url: string, option?: RequestInit){
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  // use fetch with base url
  const res = await fetch(`${BASE_URL}${url}`, {
    ...option,
    headers: {
      ...option?.headers,
      // set content type to json
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  let isError = false

  if(!res.ok){
    isError = true
  }

  // get data
  const data = await res.json()
  // return data
  return {
    data,
    isError
  }
}