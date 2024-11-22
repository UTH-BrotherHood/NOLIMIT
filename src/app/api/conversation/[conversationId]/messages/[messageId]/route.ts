// import { NextRequest } from 'next/server'
// import messageApiRequest from '@/apiRequests/message'
// import { HttpError } from '@/lib/http'

// // PATCH /api/conversation/[conversationId]/messages/[messageId]/read
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { conversationId: string; messageId: string } }
// ) {
//   try {
//     const { conversationId, messageId } = params
//     const { payload } = await messageApiRequest.markAsRead(conversationId, messageId)
//     return Response.json(payload)
//   } catch (error) {
//     if (error instanceof HttpError) {
//       return Response.json(error.payload, {
//         status: error.status
//       })
//     }
//     return Response.json(
//       {
//         message: 'Có lỗi xảy ra'
//       },
//       {
//         status: 500
//       }
//     )
//   }
// }

// // DELETE /api/conversation/[conversationId]/messages/[messageId]
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { conversationId: string; messageId: string } }
// ) {
//   try {
//     const { conversationId, messageId } = params
//     const { payload } = await messageApiRequest.deleteMessage(conversationId, messageId)
//     return Response.json(payload)
//   } catch (error) {
//     if (error instanceof HttpError) {
//       return Response.json(error.payload, {
//         status: error.status
//       })
//     }
//     return Response.json(
//       {
//         message: 'Có lỗi xảy ra'
//       },
//       {
//         status: 500
//       }
//     )
//   }
// }
