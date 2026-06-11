import { useMutation } from "@tanstack/react-query";

export function useCreateContact() {
  return useMutation(async (payload: { data: { name: string; email: string; service?: string; budget?: string; message: string } }) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload.data),
    });

    if (!response.ok) {
      throw new Error("Failed to send contact message");
    }

    return response.json();
  });
}
