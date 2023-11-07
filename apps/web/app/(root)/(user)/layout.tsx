import { withPageAuthRequired } from "@auth0/nextjs-auth0";


export default withPageAuthRequired(function User({
    children,
}: {
    children: React.ReactNode;
}){
    return  children
})