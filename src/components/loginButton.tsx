'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';


export function Login(){
    'use client';
    const entrar =  () => {
        'use client';
        try {
             signIn("keycloak", { callbackUrl: "/dashboard" })
          } catch (error) {
            console.error("Erro ao fazer login:", error)
          }
    };
    return(<Button onClick={entrar}>Entrar</Button>);
}