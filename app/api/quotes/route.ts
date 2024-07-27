import QuotesModel from "@/app/models/quotes";
import dbConnect from "@/app/utils/db";
import { NextRequest } from "next/server";

const ignoreObj = {
  __v: 0,
  updatedAt: 0,
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get("filter");
    const sort = searchParams.get("sort");

    const filterObj = {};
    const sortObj = {
      createdAt: -1,
    };

    if (filter) {
      const filterArr = filter.split("||");
      // @ts-ignore
      filterObj[filterArr[0]] = JSON.parse(filterArr[2]);
    }
    if (sort) {
      const sortArr = sort.split(",");
      // @ts-ignore
      sortObj[sortArr[0]] = JSON.parse(sortArr[1]);
    }
    await dbConnect();

    // @ts-ignore
    const data = await QuotesModel.find(filterObj, ignoreObj).sort(sortObj);

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 400 });
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
    return Response.json({ msg: "Data is missing..." });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 400 });
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
    return new Response("Something Went Wrong", { status: 400 });
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
    return new Response("Something Went Wrong", { status: 400 });
  }
}
