import { requireUnAuth } from "@/lib/auth-utils";
// import OtpForm from "@/components/auth/otp-form";

export default async function TwoFactorPage() {
     await requireUnAuth();

    // return (
    //    <OtpForm/>
    // )
}