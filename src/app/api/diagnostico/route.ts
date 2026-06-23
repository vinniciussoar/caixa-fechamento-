import { NextResponse } from "next/server";
import { diagnosticFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = diagnosticFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Placeholder: log the lead. Wire this up to a CRM, email service, or
  // spreadsheet integration before launch.
  console.log("[diagnostico] novo lead recebido:", parsed.data);

  return NextResponse.json({ ok: true });
}
