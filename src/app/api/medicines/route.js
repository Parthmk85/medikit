import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Medicine from '@/models/Medicine';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Helper to verify admin
async function isAdmin(req) {
  const token = req.cookies.get('token')?.value;
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.role === 'admin';
  } catch (e) {
    return false;
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const problemType = searchParams.get('problemType');
    const search = searchParams.get('search');

    let query = {};

    if (category) query.category = category;
    if (problemType) query.problemType = problemType;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const medicines = await Medicine.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ medicines });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch medicines' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  
  // Verify Admin
  // Note: in Next.js App Router API, we can access cookies from req
  const authorized = await isAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized: Admin only' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const medicine = await Medicine.create(body);
    return NextResponse.json({ message: 'Medicine added successfully', medicine }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add medicine' }, { status: 500 });
  }
}

export async function DELETE(req) {
    await dbConnect();
    const authorized = await isAdmin(req);
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if(!id) return NextResponse.json({error: 'ID required'}, {status: 400});

        await Medicine.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (e) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}

export async function PUT(req) {
    await dbConnect();
    const authorized = await isAdmin(req);
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { _id, ...updateData } = body;
        if (!_id) return NextResponse.json({error: 'ID required'}, {status: 400});
        
        const updated = await Medicine.findByIdAndUpdate(_id, updateData, { new: true });
        return NextResponse.json({ message: 'Updated successfully', medicine: updated });
    } catch (e) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
