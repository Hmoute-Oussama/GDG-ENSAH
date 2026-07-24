import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  JoinFormData,
  hasJoinFormErrors,
  validateJoinForm,
} from "@/lib/join";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as JoinFormData;

    // Validate on the server side
    const errors = validateJoinForm(body);
    if (hasJoinFormErrors(errors)) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const normalizedEmail = body.email.trim().toLowerCase();

    const { error } = await supabase.from("members").insert({
      full_name: body.fullName.trim(),
      email: normalizedEmail,
      phone: body.phone.trim() || null,
      student_id: body.studentId.trim() || null,
      major: body.major.trim(),
      year: body.year,
      interests: body.interests.trim() || null,
      confirmed: body.confirmed,
    });

    if (error) {
      // Unique constraint violation — email already registered
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            errors: { email: "This email has already been registered" },
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

    return NextResponse.json({
      success: true,
      message: "Welcome to GDG ENSAH! Your membership request has been submitted.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
