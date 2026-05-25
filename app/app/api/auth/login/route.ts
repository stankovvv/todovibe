import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.findUnique({ where: { username: body.username } });
  if (!user || user.password !== body.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
}
