export type PaginatedResult<T> = {
  data: T[]
  meta: MetaType
}

export type MetaType = {
  total: number
  page: number
  last_page: number
}
