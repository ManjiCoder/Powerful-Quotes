import QuotesModel from '@/app/models/quotes';
import RandomModel from '@/app/models/randomNumber';
import dbConnect from '@/app/utils/db';
import { BASE_URL } from '@/app/utils/service';
import axios from 'axios';

export async function GET() {
  try {
    await dbConnect();
    // const filter = '?filter=isEnabled||eq||true';
    const today = new Date().toISOString().split('T')[0];
    let quote;
    const randomQuote = await RandomModel.findOne({ date: today });

    if (!randomQuote) {
      const { data } = await axios.get(BASE_URL + '/quotes');
      const randomNumber = await Math.floor(Math.random() * data.length);
      const RandomNum = await RandomModel.create({
        date: new Date().toISOString().split('T')[0],
        quoteId: data[randomNumber]._id,
        number: randomNumber,
      });
      quote = data[randomNumber];
    } else {
      quote = await QuotesModel.findById(randomQuote.quoteId, { __v: 0 });
    }
    return Response.json({ quote: quote });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}
