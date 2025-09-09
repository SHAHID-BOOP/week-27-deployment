import dotenv from "dotenv";
dotenv.config({ path: "../../packages/db/.env"})
import { prismaclient }  from "db/client"

  
export default async function Home() {
  const users = await prismaclient.user.findMany();
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}
