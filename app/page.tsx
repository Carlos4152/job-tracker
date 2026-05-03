import { ResetPasswordEmail } from '@/lib/email/templates/reset-password'

export default function Home() {
  return (
    <ResetPasswordEmail
      clientName="Jordan Davis"
      resetUrl="https://jobtrack.com/reset-password?token=xxx"
      ipAddress="192.168.1.1"
      expiresIn="24 hours"
    />
  )
}