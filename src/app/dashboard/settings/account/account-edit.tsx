'use client'
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateProfileBody, UpdateProfileBodyType } from '@/schemaValidations/auth.schema'
import { FormField, FormItem, FormMessage, FormLabel, FormControl, FormDescription } from '@/components/ui/form'

export default function AccountForm() {
  const defaultAvatar = 'https://citibella.vn/wp-content/uploads/2024/09/anh-avatar-trang-09pycvl.jpg'

  const [isEditMode, setIsEditMode] = useState(false)
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [isSaved, setIsSaved] = useState(false)

  const defaultValues = {
    name: 'User name',
    email: 'username@example.com',
    password: '123456',
  }

  const form = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(UpdateProfileBody),
    defaultValues
  })

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = form

  const onSubmit = async (data: UpdateProfileBodyType) => {
    try {
      console.log('Updating Profile:', data)
      reset(data)
      setIsEditMode(false)
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 2000)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleEditClick = () => {
    setIsEditMode(true)
    setIsSaved(false)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    reset(defaultValues)
    setAvatar(defaultAvatar)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const newAvatarUrl = URL.createObjectURL(file)
      setAvatar(newAvatarUrl)

      // Cleanup the URL object to avoid memory leaks
      return () => URL.revokeObjectURL(newAvatarUrl)
    }
  }

  return (
    <FormProvider {...form}>
      <div className='max-w-full mx-auto p-6 bg-white shadow-md rounded-md space-y-6'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300'>
            <img src={avatar} alt='Avatar' />
          </div>
          <h2 className='text-3xl font-semibold text-slate-950'>{defaultValues.name}</h2>
          {isEditMode && (
            <input
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              className='mt-2 border border-gray-300 rounded-md'
            />
          )}
        </div>

        {isSaved && (
          <div className='p-4 bg-green-50 text-green-700 rounded-md'>Your profile has been updated successfully!</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name Field */}
          <FormField
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <input
                    type='text'
                    disabled={!isEditMode}
                    {...field}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </FormControl>
                <FormDescription>Your full name.</FormDescription>
                <FormMessage>
                  {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Email Field (Read-Only) */}
          <FormField
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    type='email'
                    disabled
                    {...field}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </FormControl>
                <FormDescription>Email cannot be changed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <input
                    type='password'
                    disabled={!isEditMode}
                    {...field}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </FormControl>
                <FormDescription>Enter a new password.</FormDescription>
                <FormMessage>
                  {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          {isEditMode && (
            <FormField
              name='confirm_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <input
                      type='password'
                      disabled={!isEditMode}
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </FormControl>
                  <FormDescription>Re-enter your new password.</FormDescription>
                  <FormMessage>
                    {errors.confirm_password && (
                      <p className='text-red-500 text-sm mt-1'>{errors.confirm_password.message}</p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
          )}

          {/* Save/Cancel/Edit Buttons */}
          <div className='flex justify-end space-x-2'>
            {isEditMode ? (
              <>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={handleEditClick}
                className='px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700'
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
