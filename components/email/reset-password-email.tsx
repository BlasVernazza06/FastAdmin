import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  username?: string;
  resetUrl: string;
}

export const ResetPasswordEmail = ({
  username,
  resetUrl,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Restablece tu contraseña de FastAdmin</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Restablecer contraseña</Heading>
          <Text style={text}>Hola {username},</Text>
          <Text style={text}>
            Recibimos una solicitud para restablecer la contraseña de tu cuenta en FastAdmin.
            Si no fuiste tú, puedes ignorar este correo.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={resetUrl}>
              Restablecer contraseña
            </Button>
          </Section>
          <Text style={text}>
            O copia y pega este enlace en tu navegador:
          </Text>
          <Text style={link}>{resetUrl}</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Este correo fue enviado por FastAdmin.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  padding: "0 48px",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
};

const link = {
  color: "#000000",
  fontSize: "14px",
  textDecoration: "underline",
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 48px",
};
