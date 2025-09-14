import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    
    const authenticated = true;
    if (request.nextUrl.pathname.startsWith('/despesas') && !authenticated) {
        console.log('Acesso negado. Redirecionando...');
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}