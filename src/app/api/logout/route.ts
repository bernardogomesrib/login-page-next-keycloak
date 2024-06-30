import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../auth';







export async function GET(req: NextRequest) {
    const session = await auth();

    if (session) {
        console.log(session);
        const keycloakLogoutUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
        const params = new URLSearchParams();
        params.append('client_id', process.env.AUTH_KEYCLOAK_ID as string);
        params.append('client_secret', process.env.AUTH_KEYCLOAK_SECRET as string);
        params.append('refresh_token', session.refreshToken as string);

        try {
            const response = await fetch(keycloakLogoutUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });

            if (response.status !== 204){
                throw response;
            }

            return NextResponse.json({ message: 'Logout realizado com sucesso' }, { status: 200 });
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
            return NextResponse.json({ message: 'Erro ao realizar logout', error: String(error) }, { status: 500 });
        }
    }

    return NextResponse.json({ message: 'Nenhuma sessão ativa' }, { status: 200 });
}

export async function POST() {
    return NextResponse.json({ message: 'Método não permitido para esta rota' }, { status: 405 });
}