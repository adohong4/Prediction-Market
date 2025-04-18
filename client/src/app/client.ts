import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
    // use `secretKey` for server side or script usage
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});
