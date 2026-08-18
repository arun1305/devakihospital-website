import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export interface AppointmentPayload {
  patientName: string;
  email: string;
  phone: string;
  department: string;
  doctor?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  message?: string;
}

export async function submitAppointment(payload: AppointmentPayload) {
  const { data } = await apiClient.post("/appointments", payload);
  return data;
}

export interface EnquiryPayload {
  type: "contact" | "doctor" | "international" | "second-opinion" | "career";
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

export async function submitEnquiry(payload: EnquiryPayload) {
  const { data } = await apiClient.post("/enquiries", payload);
  return data;
}

export async function subscribeNewsletter(email: string) {
  const { data } = await apiClient.post("/subscribers", { email });
  return data;
}

export interface EventRegistrationPayload {
  name: string;
  email: string;
  phone: string;
}

export async function registerForEvent(eventId: string, payload: EventRegistrationPayload) {
  const { data } = await apiClient.post(`/events/${eventId}/register`, payload);
  return data;
}

export interface PackageBookingPayload {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
}

export async function bookHealthPackage(packageId: string, payload: PackageBookingPayload) {
  const { data } = await apiClient.post(`/packages/${packageId}/book`, payload);
  return data;
}

export interface JobApplicationPayload {
  name: string;
  email: string;
  phone: string;
  resume: File;
  coverLetter?: string;
}

export async function applyToJob(jobId: string, payload: JobApplicationPayload) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("resume", payload.resume);
  if (payload.coverLetter) formData.append("coverLetter", payload.coverLetter);

  // Let the browser set the multipart boundary itself — overriding
  // Content-Type here would omit it and the upload would fail server-side.
  const { data } = await apiClient.post(`/careers/${jobId}/apply`, formData, {
    headers: { "Content-Type": undefined },
  });
  return data;
}
