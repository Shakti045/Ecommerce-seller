import Product from "@/modals/product";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { isSeller } from "@/utils/apimiddleware";
export async function GET(req: NextRequest) {
    try {
        await connectdb();
        const user = await isSeller(req);
        if (!user) {
            return NextResponse.json({
                Success: false,
                Message: "Unauthorised access"
            }, { status: 401 })
        }
        const products = await Product.find({ seller: user.id })
        return NextResponse.json({
            Success: true,
            Message: "Products fetched successfully",
            Products: products
        }, { status: 200 });
    } catch (err: any) {
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching products"
        }, { status: 500 });
    }
}
