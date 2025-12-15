import { redirect } from "next/navigation";

export default async function home() {
    redirect("/dashboard")
}