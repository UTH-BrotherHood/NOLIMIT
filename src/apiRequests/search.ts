import http from '@/lib/http'
import { SearchUserResponseType } from '@/schemaValidations/search.scheme'

const searchApiRequest = {
  // Fetch users by email
  searchUserByEmail: (email: string) =>
    http.get<SearchUserResponseType>(`/api/search/user/?email=${encodeURIComponent(email)}`, {
      baseUrl: ''
    }),
  sSearchUserByEmail: ({ email, access_token }: { email: string; access_token: string }) =>
    http.get<SearchUserResponseType>(`/api/v1/user/search?email=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
}

export default searchApiRequest
