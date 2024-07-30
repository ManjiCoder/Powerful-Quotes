import dbConnect from '@/app/utils/db';
import { BASE_URL } from '@/app/utils/service';
import axios from 'axios';

export async function GET() {
  try {
    await dbConnect();
    // const filter = '?filter=isEnabled||eq||true';
    const { data } = await axios.get(BASE_URL + '/quotes');

    const randonNumber = await Math.floor(Math.random() * data.length);
    return Response.json({
      quote: data[randonNumber],
      randonNumber,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}
