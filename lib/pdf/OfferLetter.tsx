import {
  Document, Page, Text, View, StyleSheet, Image
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000000',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyName: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    letterSpacing: 4,
  },
  body: {
    marginTop: 20,
  },
  companyInfo: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 3,
  },
  companyInfoBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
  },
  toText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginTop: 10,
  },
  addressText: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 2,
  },
  dearText: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 10,
    color: '#ffffff',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletDot: {
    fontSize: 10,
    color: '#ffffff',
    marginRight: 6,
  },
  bulletLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  bulletValue: {
    fontSize: 10,
    color: '#ffffff',
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 2,
  },
  footerBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginTop: 40,
    marginBottom: 10,
  },
})

interface Props {
  candidateName: string
  candidateAddress: string
  position: string
  startDate: string
  endDate: string
  companyRepName: string
  letterDate: string
}

export function OfferLetterPDF({
  candidateName,
  candidateAddress,
  position,
  startDate,
  endDate,
  companyRepName,
  letterDate,
}: Props) {
  const firstName = candidateName.split(' ')[1] || candidateName.split(' ')[0]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/KnightOwl_Logo.jpeg" />
          <Text style={styles.companyName}>KNIGHT OWL</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.companyInfoBold}>Knight Owl</Text>
          <Text style={styles.companyInfo}>86/1, Egodawatta, Ambalangoda,</Text>
          <Text style={styles.companyInfo}>Polgasowita, Sri Lanka</Text>
          <Text style={styles.companyInfo}>contact@knightowl.online | +94766773354</Text>

          <Text style={styles.dateText}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Date:</Text> {letterDate}</Text>

          <Text style={styles.toText}>To:</Text>
          <Text style={styles.addressText}>{candidateName},</Text>
          <Text style={styles.addressText}>{candidateAddress}</Text>

          <Text style={styles.dearText}>Dear {firstName},</Text>

          <Text style={styles.titleText}>Internship Offer Letter - {position}</Text>

          <Text style={styles.bodyText}>
            We are pleased to offer you the position of <Text style={{ fontFamily: 'Helvetica-Bold' }}>{position}</Text> at <Text style={{ fontFamily: 'Helvetica-Bold' }}>Knight Owl</Text>. This internship opportunity will commence on <Text style={{ fontFamily: 'Helvetica-Bold' }}>{startDate}</Text> and will continue until <Text style={{ fontFamily: 'Helvetica-Bold' }}>{endDate}</Text>.
          </Text>

          <Text style={styles.bodyText}>
            As a <Text style={{ fontFamily: 'Helvetica-Bold' }}>{position}</Text>, you will be part of our development team, contributing to the design, development, and deployment of real-world digital solutions. You will work closely with other developers, designers, and project managers, gaining hands-on industry experience, enhancing your technical skills, and building a strong portfolio of work.
          </Text>

          <Text style={styles.sectionTitle}>Internship Details:</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Position: </Text>
            <Text style={styles.bulletValue}>{position}</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Internship Duration: </Text>
            <Text style={styles.bulletValue}>{startDate} to {endDate}</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Location: </Text>
            <Text style={styles.bulletValue}>Remote</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Reporting To: </Text>
            <Text style={styles.bulletValue}>{companyRepName} – CEO</Text>
          </View>

          <Text style={styles.bodyText}>
            During your internship, you are expected to maintain professionalism, meet deadlines, and actively contribute to team efforts. This offer is contingent upon your acceptance and adherence to Knight Owl's policies and code of conduct, which will be shared upon your onboarding.
          </Text>

          <Text style={styles.bodyText}>
            To confirm your acceptance of this offer, please reply to this email with a confirmation or provide a signed copy of this letter.
          </Text>

          <Text style={styles.bodyText}>
            We are excited to have you on board and look forward to a productive and impactful journey together.
          </Text>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Warm regards,</Text>
            <Text style={styles.footerBold}>{companyRepName}</Text>
            <Text style={styles.footerText}>Founder & CEO</Text>
            <Text style={styles.footerText}>Knight Owl</Text>
            <Text style={styles.footerText}>manul.knightowl@gmail.com | +94766773354</Text>
          </View>

          <View style={styles.divider} />
        </View>
      </Page>
    </Document>
  )
}