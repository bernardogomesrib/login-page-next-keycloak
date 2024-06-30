'use server';
//import { LogoutButton } from "@/components/logoutButton";
import { auth, signOut } from "../../../auth";


import { Login } from './../../components/loginButton';
import { Button } from './../../components/ui/button';


import { redirect } from "next/navigation";

export async function LogoutButton() {
    async function sair() {
        'use server'
        const session = await auth();
        
        if(session){
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
            console.log(response);

            
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
        }
        }
        await signOut();
        redirect('/dashboard');
    }

    const session = await auth();
    if(session){

        return(<form action={sair}><Button type="submit">Sair</Button></form>);
    }
    else{
        return(<Login/>)
    }
    
}




export default async function paginaSegura(){
    
    
    const user = await auth();
    
        return(<main>
            <h1>{
                user ? `Olá, ${user.user?.name}` : 'Olá, visitante'
                }</h1>

            
                {
                user ? (<p>Você está logado como {user.user?.email}</p>) : (<p>Você não está logado</p>)
                
                }
                {
                    user?.user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.user?.image as string} width={200} height={200} alt="Imagem de perfil" />
                    )
                    : (<p>não tem imagem de perfil </p>)
                }
            <br />
            <LogoutButton/>
        </main>);
    
}
