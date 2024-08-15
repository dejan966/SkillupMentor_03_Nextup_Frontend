import Axios, {
  AxiosHeaderValue,
  AxiosRequestConfig,
} from 'axios'

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: {
      Accept?: AxiosHeaderValue
      'Content-Length'?: AxiosHeaderValue
      'User-Agent'?: AxiosHeaderValue
      'Content-Encoding'?: AxiosHeaderValue
      Authorization?: AxiosHeaderValue
    }
  } & AxiosRequestConfig,
) {
  try {
    const response = await Axios.request<R>({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: path,
      method: method,
      data: input,
      headers: options?.headers,
      withCredentials: true,
    })
    return response
  } catch (error: any) {
    return error.response
  }
}
