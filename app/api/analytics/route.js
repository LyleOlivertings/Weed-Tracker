import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Strain from '@/models/Strain';

export async function GET() {
  await dbConnect();
  
  try {
    const ratingAverages = await Strain.aggregate([
      {
        $group: {
          _id: null,
          avgTaste: { $avg: "$ratings.taste" },
          avgPotency: { $avg: "$ratings.potency" },
          avgDuration: { $avg: "$ratings.duration" },
          avgOverall: { $avg: "$ratings.overall" }
        }
      }
    ]);

    // Format data for chart
    const data = [
      { name: 'Taste', value: ratingAverages[0]?.avgTaste || 0 },
      { name: 'Potency', value: ratingAverages[0]?.avgPotency || 0 },
      { name: 'Duration', value: ratingAverages[0]?.avgDuration || 0 },
      { name: 'Overall', value: ratingAverages[0]?.avgOverall || 0 }
    ];

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching analytics' },
      { status: 500 }
    );
  }
}