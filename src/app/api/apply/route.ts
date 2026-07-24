import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export interface ApplyFormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  motivation: string;
}

export interface ApplyFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  experience?: string;
  motivation?: string;
}

function validate(data: ApplyFormData): ApplyFormErrors {
  const errors: ApplyFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.role) {
    errors.role = "Please select a role";
  }

  if (!data.motivation.trim()) {
    errors.motivation = "Please tell us why you want to join";
  } else if (data.motivation.trim().length < 20) {
    errors.motivation = "Please write at least 20 characters";
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplyFormData;

    const errors = validate(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { error } = await supabase.from("applications").insert({
      full_name: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim() || null,
      role: body.role,
      experience: body.experience.trim() || null,
      motivation: body.motivation.trim(),
    });

    if (error) {
      // Duplicate application
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            errors: { email: "You have already submitted an application" },
          },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
