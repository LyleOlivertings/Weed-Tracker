import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Strain from '@/models/Strain';

export async function GET() {
  await dbConnect();
  
  try {
    const strains = await Strain.find().sort({ date: -1 });
    return NextResponse.json(strains);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching strains' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const strain = new Strain(body);
    await strain.save();
    
    return NextResponse.json(strain, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating strain' },
      { status: 500 }
    );
  }
}