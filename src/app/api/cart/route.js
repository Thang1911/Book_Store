import db from "@/lib/db";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db.connect();
    const {
      userId,
      productId,
      productName,
      productImg,
      number,
      price,
      status,
    } = await req.json();
    const newItem = {
      userId,
      productId,
      productName,
      productImg,
      number,
      price,
      status,
    };
    await Cart.create(newItem);
    return  NextResponse.json({ message: "Thêm sản phẩm vào giỏ hàng thành công" }, {status: 200});
  } catch (err) {
    // Trả về phản hồi lỗi nếu có lỗi xảy ra
    return new NextResponse(JSON.stringify(err.message), { status: 500 });
  }
}

export async function GET(request) {
  try {
    await db.connect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      throw new Error("Thiếu thông tin userId");
    }

    // // Sử dụng userId để tìm kiếm Cart
    const userCart = await Cart.find({ userId });

    return NextResponse.json({ userCart });
  } catch (err) {
    return new NextResponse(JSON.stringify(err.message), { status: 500 });
  }
}

export async function UPDATE(request) {
  try {
    await db.connect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const productName = searchParams.get("productName");

    // // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      throw new Error("Thiếu thông tin userId");
    }

    // // Sử dụng userId để tìm kiếm Cart
    const deletedItem = await Cart.findOneAndDelete({ userId, productName });

    if (!deletedItem) {
      throw new Error("Không tìm thấy sản phẩm để xóa");
    }

    return NextResponse.json(
      { message: "Xóa sản phẩm thành công" },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify(err.message), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await db.connect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      throw new Error("Thiếu thông tin userId");
    }

    // // Sử dụng userId để tìm kiếm Cart
    const deletedItem = await Cart.deleteMany({ userId });

    if (!deletedItem) {
      throw new Error("Không tìm thấy sản phẩm để xóa");
    }

    return NextResponse.json(
      { message: "Xóa sản phẩm thành công" },
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify(err.message), { status: 500 });
  }
}
