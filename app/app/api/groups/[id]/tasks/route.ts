import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const todos = await prisma.groupTodo.findMany({
    where: { groupId: parseInt(id) },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(todos);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const todo = await prisma.groupTodo.create({
    data: {
      title: body.title,
      groupId: parseInt(id),
      createdById: body.userId,
    },
  });
  return NextResponse.json(todo, { status: 201 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const todo = await prisma.groupTodo.update({
    where: { id: body.todoId },
    data: { title: body.title },
  });
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await prisma.groupTodo.delete({
    where: { id: body.todoId },
  });
  return NextResponse.json({ success: true });
}
