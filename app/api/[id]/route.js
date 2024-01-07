import { NextResponse } from "next/server"

export async function GET(request, { params }) {

    console.log('params-id: ' + params?.id);

    return NextResponse.json({ message: 'Weldone my friend with id params!' })
}