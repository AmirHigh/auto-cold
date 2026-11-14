"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// =========================
// دریافت اطلاعات فرم
// =========================

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

// =========================
// دریافت تصاویر
// =========================

function getImages(formData: FormData): string[] {
  try {
    const rawImages = formData.get("images");

    if (typeof rawImages !== "string") {
      return [];
    }

    const parsed = JSON.parse(rawImages);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (image): image is string =>
        typeof image === "string" &&
        image.startsWith("https://")
    );
  } catch {
    throw new Error("اطلاعات تصاویر معتبر نیست.");
  }
}

// =========================
// اطلاعات کامل خودرو
// =========================

function getCarData(formData: FormData) {
  return {
    brand: getText(formData, "brand"),
    model: getText(formData, "model"),
    year: Number(formData.get("year")),
    price: getText(formData, "price"),

    image: getText(formData, "image"),
    description: getText(formData, "description") || null,

    // مشخصات کلی
    mileage: getText(formData, "mileage") || null,
    color: getText(formData, "color") || null,

    // مشخصات فنی
    engineType: getText(formData, "engineType") || null,
    engineVolume: getText(formData, "engineVolume") || null,
    cylinders: getText(formData, "cylinders") || null,
    horsepower: getText(formData, "horsepower") || null,
    transmission: getText(formData, "transmission") || null,
    fuelType: getText(formData, "fuelType") || null,

    // وضعیت خودرو
    bodyCondition: getText(formData, "bodyCondition") || null,
    technicalCondition: getText(formData, "technicalCondition") || null,
    paintCondition: getText(formData, "paintCondition") || null,
    tireCondition: getText(formData, "tireCondition") || null,

    // امکانات رفاهی
    features: getText(formData, "features") || null,
  };
}

// =========================
// اعتبارسنجی خودرو
// =========================

function validateCar(data: ReturnType<typeof getCarData>) {
  if (!data.brand || !data.model || !data.price) {
    throw new Error("لطفاً برند، مدل و قیمت خودرو را وارد کنید.");
  }

  if (
    !Number.isInteger(data.year) ||
    data.year < 1900 ||
    data.year > 2100
  ) {
    throw new Error("سال ساخت معتبر نیست.");
  }
}

// =========================
// بروزرسانی صفحات
// =========================

function refreshCarPages(id?: number) {
  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin");
  revalidatePath("/admin/cars");

  if (id) {
    revalidatePath(`/cars/${id}`);
  }
}

// =========================
// CREATE CAR
// =========================

export async function createCar(formData: FormData) {
  const data = getCarData(formData);
  const images = getImages(formData);

  validateCar(data);

  if (images.length === 0) {
    throw new Error("لطفاً حداقل یک تصویر برای خودرو آپلود کنید.");
  }

  if (images.length > 10) {
    throw new Error("حداکثر ۱۰ تصویر مجاز است.");
  }

  const car = await prisma.car.create({
    data: {
      ...data,

      image: images[0],

      images: {
        create: images.map((image) => ({
          image,
        })),
      },
    },
  });

  refreshCarPages(car.id);

  redirect("/admin?success=created");
}

// =========================
// UPDATE CAR
// =========================

export async function updateCar(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("شناسه خودرو معتبر نیست.");
  }

  // دریافت اطلاعات قبلی خودرو
  const existingCar = await prisma.car.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!existingCar) {
    throw new Error("خودرو موردنظر پیدا نشد.");
  }

  const submittedData = getCarData(formData);
  const images = getImages(formData);

  // حفظ اطلاعات قبلی در صورت خالی بودن فیلدها
  const data = {
    brand: submittedData.brand || existingCar.brand,
    model: submittedData.model || existingCar.model,

    year:
      Number.isInteger(submittedData.year) &&
      submittedData.year >= 1900 &&
      submittedData.year <= 2100
        ? submittedData.year
        : existingCar.year,

    price: submittedData.price || existingCar.price,

    image:
      images[0] ||
      submittedData.image ||
      existingCar.image,

    description:
      submittedData.description || existingCar.description,

    mileage:
      submittedData.mileage || existingCar.mileage,

    color:
      submittedData.color || existingCar.color,

    engineType:
      submittedData.engineType || existingCar.engineType,

    engineVolume:
      submittedData.engineVolume || existingCar.engineVolume,

    cylinders:
      submittedData.cylinders || existingCar.cylinders,

    horsepower:
      submittedData.horsepower || existingCar.horsepower,

    transmission:
      submittedData.transmission || existingCar.transmission,

    fuelType:
      submittedData.fuelType || existingCar.fuelType,

    bodyCondition:
      submittedData.bodyCondition || existingCar.bodyCondition,

    technicalCondition:
      submittedData.technicalCondition || existingCar.technicalCondition,

    paintCondition:
      submittedData.paintCondition || existingCar.paintCondition,

    tireCondition:
      submittedData.tireCondition || existingCar.tireCondition,

    features:
      submittedData.features || existingCar.features,
  };

  if (images.length > 10) {
    throw new Error("حداکثر ۱۰ تصویر مجاز است.");
  }

  // ذخیره مشخصات خودرو
  await prisma.car.update({
    where: { id },
    data,
  });

  // فقط در صورت ارسال تصاویر جدید، گالری تغییر کند
  if (images.length > 0) {
    await prisma.carImage.deleteMany({
      where: { carId: id },
    });

    await prisma.carImage.createMany({
      data: images.map((image) => ({
        image,
        carId: id,
      })),
    });
  }

  refreshCarPages(id);

  redirect("/admin?success=updated");
}

// =========================
// DELETE CAR
// =========================

export async function deleteCar(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("شناسه خودرو معتبر نیست.");
  }

  // حذف خودرو و اطلاعات وابسته طبق روابط دیتابیس
  await prisma.car.delete({
    where: { id },
  });

  refreshCarPages(id);
}