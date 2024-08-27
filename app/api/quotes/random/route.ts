import QuotesModel from '@/app/models/quotes';
import dbConnect from '@/app/utils/db';

export async function GET() {
  try {
    await dbConnect();
    const quotes = await QuotesModel.find({}, { __v: 0 });
    const n = quotes.length;
    const randomNumber = await Math.floor(Math.random() * n);
    return Response.json({
      quote: n === 0 ? 'No Quotes Available.' : quotes[randomNumber],
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}

export async function POST() {
  try {
    await dbConnect();
    const quotes = await QuotesModel.find({}, { __v: 0 });
    const n = quotes.length;
    const randomNumber = await Math.floor(Math.random() * n);
    return Response.json({
      quote: n === 0 ? 'No Quotes Available.' : quotes[randomNumber],
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}
