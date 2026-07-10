import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'vehicleMake', 'vehicleModel', 'vehicleYear', 'serviceRequired', 'vehicleCondition'];
    const missing = requiredFields.filter((field) => !body[field]);

    if (missing.length > 0) {
      return NextResponse.json({ message: `Missing required quote field: ${missing[0]}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Quote request saved.' });
  } catch {
    return NextResponse.json({ message: 'Failed to save quote request.' }, { status: 500 });
  }
}
