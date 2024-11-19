'use client'

import React, { useState, useRef } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Plus, Search, MoreHorizontal, Edit, Trash } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock project data
const initialProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Overhaul of company website',
    status: 'In Progress',
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 7, 31),
    teamMembers: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Create a new mobile app for customers',
    status: 'Planning',
    startDate: new Date(2023, 6, 15),
    endDate: new Date(2023, 11, 31),
    teamMembers: ['2', '4', '5']
  },
  {
    id: '3',
    name: 'Data Migration',
    description: 'Migrate data to new cloud platform',
    status: 'Completed',
    startDate: new Date(2023, 3, 1),
    endDate: new Date(2023, 5, 30),
    teamMembers: ['1', '3', '5']
  }
]

// Mock team members data
const teamMembers = [
  { id: '1', name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
  { id: '2', name: 'Bob Smith', avatar: '/avatars/bob.jpg' },
  { id: '3', name: 'Charlie Brown', avatar: '/avatars/charlie.jpg' },
  { id: '4', name: 'Diana Ross', avatar: '/avatars/diana.jpg' },
  { id: '5', name: 'Edward Norton', avatar: '/avatars/edward.jpg' }
]

const statusColumns = ['Planning', 'In Progress', 'Completed']

export default function ProjectManagementKanban() {
  const [projects, setProjects] = useState(initialProjects)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    teamMembers: []
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [memberSearchQuery, setMemberSearchQuery] = useState('')
  const [editingProject, setEditingProject] = useState(null)
  const draggedItem = useRef(null)

  const handleProjectAdd = () => {
    if (newProject.name && newProject.status && newProject.startDate && newProject.endDate) {
      if (editingProject) {
        setProjects(
          projects.map((p) =>
            p.id === (editingProject as any).id
              ? {
                  ...newProject,
                  id: (editingProject as any).id,
                  startDate: new Date(newProject.startDate),
                  endDate: new Date(newProject.endDate)
                }
              : p
          )
        )
        setEditingProject(null)
      } else {
        setProjects([
          ...projects,
          {
            ...newProject,
            id: String(projects.length + 1),
            startDate: new Date(newProject.startDate),
            endDate: new Date(newProject.endDate)
          }
        ])
      }
      setNewProject({
        name: '',
        description: '',
        status: '',
        startDate: '',
        endDate: '',
        teamMembers: []
      })
      setIsDialogOpen(false)
    }
  }

  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setNewProject({
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: format(project.startDate, "yyyy-MM-dd'T'HH:mm"),
      endDate: format(project.endDate, "yyyy-MM-dd'T'HH:mm"),
      teamMembers: project.teamMembers
    })
    setIsDialogOpen(true)
  }

  const handleDeleteProject = (projectId: any) => {
    setProjects(projects.filter((p) => p.id !== projectId))
  }
  const handleMemberAssignment = (memberId: string) => {
    setNewProject((prev: any) => ({
      ...prev,
      // @ts-ignore
      teamMembers: prev.teamMembers
        ? prev.teamMembers.includes(memberId)
          ? prev.teamMembers.filter((id: string) => id !== memberId)
          : [...prev.teamMembers, memberId]
        : [memberId]
    }))
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredTeamMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(memberSearchQuery.toLowerCase())
  )

  const onDragStart = (e: any, projectId: any) => {
    draggedItem.current = projectId
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', projectId)
    e.target.style.opacity = '0.5'
  }

  const onDragEnd = (e: any) => {
    e.target.style.opacity = '1'
    draggedItem.current = null
  }

  const onDragOver = (e: any) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (e: any, status: any) => {
    e.preventDefault()
    const projectId = e.dataTransfer.getData('text')
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return { ...project, status }
      }
      return project
    })
    setProjects(updatedProjects)
  }

  return (
    <div className='container mx-auto p-4 space-y-8'>
      <header className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Project Management Kanban</h1>
        <div className='flex space-x-4'>
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <Input
              placeholder='Search projects...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-8'
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[825px]'>
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                <DialogDescription>
                  {editingProject ? 'Edit the details of your project.' : 'Create a new project for your team.'}
                </DialogDescription>
              </DialogHeader>
              <div className='flex gap-8'>
                <div className='flex-1 space-y-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-right'>
                      Name
                    </Label>
                    <Input
                      id='name'
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='startDate' className='text-right'>
                      Start Date
                    </Label>
                    <Input
                      id='startDate'
                      type='datetime-local'
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='endDate' className='text-right'>
                      End Date
                    </Label>
                    <Input
                      id='endDate'
                      type='datetime-local'
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='status' className='text-right'>
                      Status
                    </Label>
                    <Select onValueChange={(value) => setNewProject({ ...newProject, status: value })}>
                      <SelectTrigger className='w-[150px]'>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        {statusColumns.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='description' className='text-right'>
                      Description
                    </Label>
                    <Textarea
                      id='description'
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className='col-span-3'
                    />
                  </div>
                </div>
                {/* Assign To */}
                <div className='flex-1 space-y-4'>
                  <div className='flex items-center justify-between space-x-2'>
                    <Label className='text-right'>Assign To</Label>
                    <div className='flex items-center space-x-2'>
                      <Search className='h-4 w-4 text-gray-400' />
                      <Input
                        placeholder='Search members...'
                        value={memberSearchQuery}
                        onChange={(e) => setMemberSearchQuery(e.target.value)}
                        className='flex-1'
                      />
                    </div>
                  </div>
                  <div className='col-span-3 space-y-2'>
                    <ScrollArea className='h-[200px] rounded-md border p-2'>
                      {filteredTeamMembers.map((member) => (
                        <div key={member.id} className='flex items-center space-x-2 py-2'>
                          <Checkbox
                            id={`member-${member.id}`}
                            // @ts-ignore
                            checked={newProject.teamMembers.includes(member.id)}
                            onCheckedChange={() => handleMemberAssignment(member.id)}
                          />
                          <Label htmlFor={`member-${member.id}`} className='flex items-center space-x-2'>
                            <Avatar className='h-6 w-6'>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </Label>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' onClick={handleProjectAdd}>
                  {editingProject ? 'Save Changes' : 'Add Project'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {statusColumns.map((status) => (
          <div
            key={status}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
            className='bg-gray-100 p-4 rounded-lg'
          >
            <h2 className='text-lg font-semibold mb-4'>{status}</h2>
            {filteredProjects
              .filter((project) => project.status === status)
              .map((project) => (
                <Card
                  key={project.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, project.id)}
                  onDragEnd={onDragEnd}
                  className='mb-4 cursor-move'
                >
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex justify-between items-center'>
                      <div className='flex -space-x-2'>
                        {project.teamMembers.map((memberId) => {
                          const member = teamMembers.find((m) => m.id === memberId)
                          return (
                            <Avatar key={memberId} className='h-8 w-8 border-2 border-background'>
                              <AvatarImage src={member?.avatar} alt={member?.name} />
                              <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )
                        })}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditProject(project)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteProject(project.id)}>
                            <Trash className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
