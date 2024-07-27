import QuotesModel from "@/app/models/quotes";
import dbConnect from "@/app/utils/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");

  const filterObj = {};
  const sortObj = {};
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
  console.log(filterObj);
  await dbConnect();
  const data = await QuotesModel.find(filterObj);

  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body) {
    await dbConnect();
    const data = await QuotesModel.create(body);
    return Response.json(data);
  }
  return Response.json(0);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (body) {
    await dbConnect();
    const data = await QuotesModel.findByIdAndUpdate(body.id);
    return Response.json(data);
  }
  return Response.json(0);
}
