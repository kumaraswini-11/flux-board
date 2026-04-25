import { APP_NAME } from "@/lib/constants";
  import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { env } from "@/lib/env";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export default function VarificationEmailTemplate({
    userName,
    varificationUrl,
  }: {
    userName: string;
    varificationUrl: string;
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
            Hi {userName},
          </Text>
          <Text className="text-[16px] leading-[26px]">
            Welcome to Koala, the sales intelligence platform that helps you
            uncover qualified leads and close deals faster.
          </Text>
          <Section className="text-center">
            <Button
              className="bg-primary rounded-[3px] text-white text-[16px] no-underline text-center block p-3"
              href={varificationUrl}
            >
              Verify Email
            </Button>
          </Section>
          <Text className="text-[16px] leading-[26px]">
            Best,
            <br />
            The {APP_NAME} team
          </Text>
          <Hr className="border-[#cccccc] my-5" />
          <Text className="text-[#8898aa] text-[12px]">
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
  </Html>)
  }
