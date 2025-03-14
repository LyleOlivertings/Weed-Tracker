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

    // Default values if not provided
    const defaultRatings = {
      taste: 3,
      potency: 3,
      duration: 3,
      overall: 3
    };

    // Merge with provided ratings
    const ratings = {
      ...defaultRatings,
      ...(body.ratings || {})
    };

    // Validation
    if (!body.name || typeof body.effects !== 'number') {
      return NextResponse.json(
        { message: 'Name and numeric effects value are required' },
        { status: 400 }
      );
    }

    // Validate rating values
    const isValidRating = (value) => value >= 1 && value <= 5;
    if (!Object.values(ratings).every(isValidRating)) {
      return NextResponse.json(
        { message: 'All ratings must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create new strain
    const strain = new Strain({
      name: body.name,
      effects: parseInt(body.effects),
      comments: body.comments || '',
      ratings
    });

    await strain.save();

    return NextResponse.json(strain, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}