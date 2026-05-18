import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title: body.title },
  });
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ success: true });
}