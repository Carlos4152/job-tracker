import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  clientName: string;
  resetUrl: string;
}

export function ResetPasswordEmail({
  clientName,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Reset your JobTrack password</Preview>
      <Tailwind>
        <Body className="bg-zinc-100 font-sans my-auto mx-auto">
          <Container className="mx-auto my-10 max-w-[540px] rounded-xl border border-solid border-zinc-200 bg-white overflow-hidden">

            {/* Logo */}
            <Section>
              <div style={{ padding: '32px 40px 0', textAlign: 'center' }}>
                <Img
                  src="https://res.cloudinary.com/dix4jbsri/image/upload/v1763406970/kleint-icon_sguaxa.png"
                  alt="Kleint"
                  width="110"
                  height="auto"
                  style={{ margin: '0 auto' }}
                />
              </div>
            </Section>

            {/* Heading */}
            <Section>
              <div style={{ padding: '16px 40px 0', textAlign: 'center' }}>
                <Text
                  style={{
                    margin: '0',
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#09090b',
                    letterSpacing: '-0.4px',
                    lineHeight: '1.3',
                  }}
                >
                  Reset your password
                </Text>
              </div>
            </Section>

            {/* Body copy */}
            <Section>
              <div style={{ padding: '28px 40px 0' }}>
                <Text
                  style={{
                    margin: '0 0 4px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#09090b',
                    lineHeight: '1.6',
                  }}
                >
                  Dear {clientName},
                </Text>
                <Text
                  style={{
                    margin: '12px 0 0',
                    fontSize: '14px',
                    color: '#52525b',
                    lineHeight: '1.7',
                  }}
                >
                  We received a request to reset the password for your account.
                  If you made this request, click the button below to set a new
                  password.
                </Text>
                <Text
                  style={{
                    margin: '12px 0 0',
                    fontSize: '14px',
                    color: '#52525b',
                    lineHeight: '1.7',
                  }}
                >
                  This link will expire in{' '}
                  <span style={{ fontWeight: 600, color: '#09090b' }}>
                    24 hours
                  </span>
                  . If you did not request a password reset, you can safely
                  ignore this email — your account remains secure.
                </Text>
              </div>
            </Section>

            {/* CTA Button */}
            <Section>
              <div style={{ padding: '28px 40px 0', textAlign: 'center' }}>
                <Button
                  href={resetUrl}
                  style={{
                    backgroundColor: '#4F46E5',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '12px 28px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Set new password
                </Button>
              </div>
            </Section>

            {/* Fallback link */}
            <Section>
              <div style={{ padding: '16px 40px 0', textAlign: 'center' }}>
                <Text
                  style={{
                    margin: '0',
                    fontSize: '13px',
                    color: '#a1a1aa',
                    lineHeight: '1.6',
                  }}
                >
                  Can't see the button? Use the link:{' '}
                  <Link
                    href={resetUrl}
                    style={{
                      color: '#4F46E5',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }}
                  >
                    Click here
                  </Link>
                </Text>
              </div>
            </Section>

            {/* Signature */}
            <Section>
              <div style={{ padding: '28px 40px 0' }}>
                <Text
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#52525b',
                    lineHeight: '1.6',
                  }}
                >
                  Yours sincerely,
                </Text>
                <Text
                  style={{
                    margin: '4px 0 0',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#09090b',
                  }}
                >
                  The JobTrack Team
                </Text>
              </div>
            </Section>

            {/* Support box */}
            <Section>
              <div style={{ padding: '24px 40px 0' }}>
                <div
                  style={{
                    backgroundColor: '#fafafa',
                    border: '1px solid #e4e4e7',
                    borderRadius: '6px',
                    padding: '14px 16px',
                  }}
                >
                  <Text
                    style={{
                      margin: '0',
                      fontSize: '13px',
                      color: '#71717a',
                      lineHeight: '1.6',
                    }}
                  >
                    If you have additional questions, please refer to the{' '}
                    <Link
                      href="https://jobtrack.com/support"
                      style={{
                        color: '#71717a',
                        textDecoration: 'underline',
                        fontWeight: '600',
                      }}
                    >
                      Support Service
                    </Link>
                    .
                  </Text>
                </div>
              </div>
            </Section>

            {/* Divider */}
            <Section>
              <div style={{ padding: '28px 40px 0' }}>
                <Hr style={{ borderColor: '#e4e4e7', margin: '0' }} />
              </div>
            </Section>

            {/* Footer */}
            <Section>
              <div style={{ padding: '20px 40px 32px' }}>
                <Text
                  style={{
                    margin: '0 0 4px',
                    fontSize: '12px',
                    color: '#a1a1aa',
                    lineHeight: '1.6',
                  }}
                >
                  Please do not reply to this email. This mailbox is not
                  monitored, and we are unable to respond to inquiries sent to
                  this address. For assistance please visit our Support Service
                  page.
                </Text>
                <Text
                  style={{
                    margin: '4px 0 0',
                    fontSize: '12px',
                    color: '#a1a1aa',
                    lineHeight: '1.6',
                  }}
                >
                  To unsubscribe from security emails, visit your{' '}
                  <Link
                    href="https://jobtrack.com/settings/notifications"
                    style={{ color: '#a1a1aa', textDecoration: 'underline' }}
                  >
                    notification settings
                  </Link>
                  .
                </Text>
                <Text
                  style={{
                    margin: '12px 0 0',
                    fontSize: '12px',
                    color: '#a1a1aa',
                  }}
                >
                  © {new Date().getFullYear()} JobTrack. All rights reserved.
                </Text>
              </div>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ResetPasswordEmail.PreviewProps = {
  clientName: 'Jordan Davis',
  resetUrl: 'https://jobtrack.com/reset-password?token=abc123xyz',
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;