import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to create an organization' },
        { status: 401 }
      )
    }
    
    const { name, size, industry, description, logo } = await req.json()
    
    // Validate input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      )
    }
    
    // Create the organization with description and logo if provided
    const organization = await prisma.organization.create({
      data: {
        name,
        ownerId: session.user.id as string,
        // description: description || null,
        logo: logo || null,
        // Create a membership for the creator automatically
        memberships: {
          create: {
            userId: session.user.id as string,
            role: 'OWNER',
          },
        },
      },
    })
    
    // Log additional metadata that we're not storing in the database yet
    console.log('Additional organization metadata:', { size, industry })
    
    return NextResponse.json({ 
      organization,
      message: 'Organization created successfully'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating organization:', error)
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    // const session = await auth()
    
    // // Check if user is authenticated
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: 'You must be logged in to view organizations' },
    //     { status: 401 }
    //   )
    // }
    
    // Get all organizations the user is a member of
    const organizations = await prisma.organization.findMany()
    
    return NextResponse.json({ organizations })
    
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to update an organization' },
        { status: 401 }
      )
    }
    

    const { id, name, size, industry, description, logo } = await req.json()

    const organization = await prisma.organization.update({
      where: { id },
      data: { name, size, industry, description, logo },
    })

    return NextResponse.json({ organization })
  } catch (error) {
    console.error('Error updating organization:', error)
    return NextResponse.json(
      { error: 'Failed to update organization' },
      { status: 500 }
    )
  }
}
