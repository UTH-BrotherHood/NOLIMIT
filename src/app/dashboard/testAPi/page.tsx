'use client'

import { useSearchUserByEmailMutation } from '@/queries/useSearch'
import React, { useState } from 'react'

export default function TestPage() {
  const [email, setEmail] = useState('')
  const userMutation = useSearchUserByEmailMutation()

  const handleSearch = async () => {
    if (!email) {
      alert('Vui lòng nhập email!')
      return
    }

    try {
      const data = await userMutation.mutateAsync(email)
      console.log('Kết quả tìm kiếm:', data)
      alert('Tìm kiếm thành công! Kiểm tra console.')
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error)
      alert('Có lỗi xảy ra khi tìm kiếm.')
    }
  }

  return (
    <div>
      <h1>Test Search API</h1>
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Nhập email cần tìm'
        style={{
          padding: '8px',
          marginBottom: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Tìm kiếm
      </button>
    </div>
  )
}
