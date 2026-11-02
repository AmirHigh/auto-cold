import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // بررسی تنظیمات Cloudinary
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          error: "تنظیمات Cloudinary در فایل .env وجود ندارد.",
        },
        { status: 500 }
      );
    }

    // دریافت FormData
    const formData = await req.formData();

    const file = formData.get("file");

    // بررسی فایل
    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "فایل تصویر دریافت نشد.",
        },
        { status: 400 }
      );
    }

    // فقط تصویر
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "فقط فایل تصویری مجاز است.",
        },
        { status: 400 }
      );
    }

    // حداکثر 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: "حجم تصویر نباید بیشتر از 10 مگابایت باشد.",
        },
        { status: 400 }
      );
    }

    // تبدیل فایل به Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // آپلود به Cloudinary
    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "auto-cold",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            reject(error);
            return;
          }

          if (!result?.secure_url) {
            reject(
              new Error("Cloudinary URL was not returned.")
            );
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      uploadStream.end(buffer);
    });

    console.log(
      "Image uploaded successfully:",
      uploadResult.secure_url
    );

    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "آپلود تصویر ناموفق بود.",
      },
      { status: 500 }
    );
  }
}