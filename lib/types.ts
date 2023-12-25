export interface APIResponsePagination<T> {
  data: T
  links: Links
  meta: Meta
}
export interface Links {
  first: string
  last: string
  prev: null
  next: null
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: MetaLink[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface MetaLink {
  url: null | string
  label: string
  active: boolean
}
export interface APIResponseData<T> {
  data: T
}

export interface Lead {
  id:             number;
  branch_id:      number;
  status_id:      number;
  probability_id: number;
  type_id:        number;
  channel_id:     number;
  media_id:       number | null;
  source_id:      number | null;
  lead_number:    string;
  fullname:       string;
  email:          string;
  phone_number:   string;
  address:        string;
  latitude:       string;
  longitude:      string;
  company_name:   string;
  notes:          string | null;
  created_at:     Date;
  updated_at:     Date;
  branch:         Option;
  status:         Option;
  probability:    Option;
  type:           Option;
  channel:        Option;
  media:          OptionMedia | null;
  source:         OptionSource | null;
}

export interface Option {
  id:          number;
  name:        string;
  created_at:  Date;
  updated_at:  Date;
}

export interface OptionMedia extends Option {
  channel_id: number;
}

export interface OptionSource extends Option {
  media_id: number;
}