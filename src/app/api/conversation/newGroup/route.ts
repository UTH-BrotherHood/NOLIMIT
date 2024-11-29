import { RegisterBodyType } from '@/schemaValidations/auth.schema'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { HttpError } from '@/lib/http'
import conversationApiRequest from '@/apiRequests/conversation'
import { createConversationBodyType } from '@/schemaValidations/conversation.schema'
export async function POST(request: Request) {
  const body = (await request.json()) as createConversationBodyType
  const cookieStore = cookies()
  const access_token = cookieStore.get('access_token')?.value
  if (!access_token) {
    return Response.json(
      {
        message: 'Không tìm thấy access_token'
      },
      {
        status: 400
      }
    )
  }
  try {
    const { payload } = await conversationApiRequest.sCreatNewGroup({ body, access_token })
    access_token
    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra'
        },
        {
          status: 500
        }
      )
    }
  }
}
