import QuotesModel from '@/app/models/quotes';
import dbConnect from '@/app/utils/db';
import { NextRequest } from 'next/server';

const ignoreObj = {
  __v: 0,
  updatedAt: 0,
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get('filter');
    const sort = searchParams.get('sort');

    const filterObj: Record<string, string | number | boolean> = {};
    const sortObj: Record<string, any> = {
      createdAt: -1,
    };

    if (filter) {
      const filterArr = filter.split('||');
      filterObj[filterArr[0]] = JSON.parse(filterArr[2]);
    }
    if (sort) {
      const sortArr = sort.split(',');
      sortObj[sortArr[0]] = JSON.parse(sortArr[1]);
    }
    await dbConnect();

    const data = await QuotesModel.find(filterObj, ignoreObj).sort(sortObj);

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      await dbConnect();
      const data = await QuotesModel.create(body);
      return Response.json(data);
    }
    return Response.json({ msg: 'Data is missing...' });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      await dbConnect();
      const data = await QuotesModel.findByIdAndUpdate(body.id, body, {
        new: true,
      });
      return Response.json(data);
    }
    return Response.json(0);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      await dbConnect();
      const data = await QuotesModel.findByIdAndDelete(body.id);
      return Response.json(data);
    }
    return Response.json(0);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: 'Something went wrong!' }), {
      status: 400,
    });
  }
}
