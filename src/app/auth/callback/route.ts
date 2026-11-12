import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/recuperar-senha?erro=link", url.origin),
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Erro na recuperação:", error.code);

    return NextResponse.redirect(
      new URL("/recuperar-senha?erro=link", url.origin),
    );
  }

  return NextResponse.redirect(new URL("/redefinir-senha", url.origin));
}
