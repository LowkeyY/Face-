import { request, config } from 'utils'

const { api: { MatchPhoto } } = config

export async function matchPhoto (payload) {
  return request({
    url: MatchPhoto,
    method: 'post',
    data: payload,
  })
}

