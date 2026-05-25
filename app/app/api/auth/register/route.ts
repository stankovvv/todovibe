import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password, isAdmin } = body;

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: { username, password, isAdmin: !!isAdmin },
  });

  return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
}
