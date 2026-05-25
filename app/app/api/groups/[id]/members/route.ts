import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const members = await prisma.groupMember.findMany({
    where: { groupId: parseInt(id) },
    include: { user: { select: { id: true, username: true } } },
  });
  return NextResponse.json(members);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  try {
    const member = await prisma.groupMember.create({
      data: { groupId: parseInt(id), userId: body.userId },
    });
    return NextResponse.json(member, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'User is already a member' }, { status: 409 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await prisma.groupMember.deleteMany({
    where: { groupId: parseInt(id), userId: body.userId },
  });
  return NextResponse.json({ success: true });
}
