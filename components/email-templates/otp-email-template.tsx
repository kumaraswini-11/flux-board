import { Body, Html, Head, Preview } from "@react-email/components";
import { Container } from "@react-email/components";
import { Img } from "@react-email/components";
import { Text } from "@react-email/components";
import { env } from "@/lib/env";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export default function OtpEmailTemplate({
    otp,
  }: {
    otp: string;
  }) {
    return (
    <Html>
      <Head />
        <Body className="bg-white font-koala">
          <Preview>
            The sales intelligence platform that helps you uncover qualified
            leads.
          </Preview>
          <Container className="mx-auto py-5 pb-12">
            <Img
              src={`${baseUrl}/logo.png`}
              width="170"
              height="50"
              alt="Koala"
              className="mx-auto"
            />
            <Text className="text-[16px] leading-[26px]">
              {/* Hi {userName}, */}
            </Text>
            <Text className="text-[16px] leading-[26px]">
              Welcome to Koala, the sales intelligence platform that helps you
              uncover qualified leads and close deals faster.
            </Text>
           
            <Text className="text-[16px] leading-[26px]">
OTP ::<strong>{otp}</strong>
            </Text>
          </Container>
        </Body>
    </Html>)
  }