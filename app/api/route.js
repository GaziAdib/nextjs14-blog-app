import { NextResponse } from "next/server"

export async function GET(request, { params }) {

    console.log(request.url);

    console.log('params-id: ' + JSON.stringify(params?.id));

    return NextResponse.json({ message: 'Weldone my friend!' })
}