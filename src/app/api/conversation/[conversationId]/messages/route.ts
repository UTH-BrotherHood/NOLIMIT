import { NextRequest } from 'next/server'
import { NewMessageSchema } from '@/schemaValidations/message.schema'
import messageApiRequest from '@/apiRequests/message'
import { HttpError } from '@/lib/http'

// GET /api/conversation/[conversationId]/messages
export async function GET(request: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const { conversationId } = params
    const { payload } = await messageApiRequest.getMessages(conversationId)
    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    }
    return Response.json(
      {
        message: 'Có lỗi xảy ra khi lấy tin nhắn'
      },
      {
        status: 500
      }
    )
  }
}

// POST /api/conversation/[conversationId]/messages
export async function POST(request: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const { conversationId } = params
    const body = await request.json()

    // Validate body với Zod schema
    const validatedBody = NewMessageSchema.parse(body)

    const { payload } = await messageApiRequest.newMessage(conversationId, validatedBody)
    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    }
    if (error instanceof Error && error.name === 'ZodError') {
      return Response.json(
        {
          message: 'Dữ liệu không hợp lệ',
          errors: (error as any).errors
        },
        { status: 400 }
      )
    }
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
