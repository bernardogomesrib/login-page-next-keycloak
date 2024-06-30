import "next-auth";
declare module "next-auth"{
    interface User {
        id:string
        email:string
        email_constraint:string
        email_verified:boolean
        enabled       :boolean
        federation_link :string
        first_name      :string
        last_name       :string
        realm_id        :string
        username        :string
        created_timestamp:Date
        service_account_client_link:string
        user_type:string
        picture:string | null | undefined
        image:string | null | undefined
        get name():string{
            return `${this.first_name} ${this.last_name}`
        }
    }
    interface Session {
        user:User
        accessToken:string
        refreshToken:string
        userId:string
    }
}