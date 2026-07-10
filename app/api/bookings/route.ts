import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'vehicleMake', 'vehicleModel', 'vehicleYear', 'vehicleType', 'serviceName', 'preferredDate', 'preferredTime'];
    const missing = requiredFields.filter((field) => !body[field]);

    if (missing.length > 0) {
      return NextResponse.json({ message: `Missing required booking field: ${missing[0]}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Booking logged successfully.' });
  } catch {
    return NextResponse.json({ message: 'Failed to record booking request.' }, { status: 500 });
  }
}
