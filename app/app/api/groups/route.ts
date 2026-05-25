import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const memberId = url.searchParams.get('memberId');

  const where = memberId
    ? { members: { some: { userId: parseInt(memberId) } } }
    : {};

  const groups = await prisma.group.findMany({
    where,
    include: { _count: { select: { members: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(groups);
}

export async function POST(request: Request) {
  const body = await request.json();
  const group = await prisma.group.create({
    data: { name: body.name },
  });
  return NextResponse.json(group, { status: 201 });
}
