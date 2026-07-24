export type JoinSubmission = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  studentId?: string;
  major: string;
  year: string;
  interests?: string;
  confirmed: boolean;
  submittedAt: string;
};

export type JoinFormData = {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  major: string;
  year: string;
  interests: string;
  confirmed: boolean;
};

export type JoinFormErrors = Partial<Record<keyof JoinFormData, string>>;

export function validateJoinForm(data: JoinFormData): JoinFormErrors {
  const errors: JoinFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.major.trim()) {
    errors.major = "Major or field of study is required";
  }

  if (!data.year) {
    errors.year = "Please select your year of study";
  }

  if (!data.confirmed) {
    errors.confirmed = "You must confirm that you want to join the club";
  }

  return errors;
}

export function hasJoinFormErrors(errors: JoinFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
