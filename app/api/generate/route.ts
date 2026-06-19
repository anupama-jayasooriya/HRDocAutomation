import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { prisma } from '@/lib/db'
import React from 'react'

// Intern templates
import { OfferLetterPDF } from '@/lib/pdf/OfferLetter'
import { NDAPDF } from '@/lib/pdf/NDA'
import { InternshipAgreementPDF } from '@/lib/pdf/InternshipAgreement'

// Full-Time templates
import { FullTimeOfferLetterPDF } from '@/lib/pdf/FullTimeOfferLetter'
import { FullTimeAgreementPDF } from '@/lib/pdf/FullTimeAgreement'
import { FullTimeNDAPDF } from '@/lib/pdf/FullTimeNDA'

// Contract templates
import { ContractOfferLetterPDF } from '@/lib/pdf/ContractOfferLetter'
import { ContractAgreementPDF } from '@/lib/pdf/ContractAgreement'
import { ContractNDAPDF } from '@/lib/pdf/ContractNDA'

export async function POST(req: Request) {
  try {
    const { candidateId } = await req.json()

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    })

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      )
    }

    const startDate = new Date(candidate.startDate)
    const endDate = new Date(candidate.startDate)
    endDate.setFullYear(endDate.getFullYear() + 1)

    const formatDate = (date: Date) =>
      date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

    const letterDate = formatDate(new Date())
    const formattedStart = formatDate(startDate)
    const formattedEnd = formatDate(endDate)

    let documentsToCreate: {
      candidateId: string
      documentType: string
      fileUrl: string
    }[] = []

    if (candidate.employmentType === 'Intern') {
      const offerBuffer = await renderToBuffer(
        React.createElement(OfferLetterPDF, {
          candidateName: candidate.fullName,
          candidateAddress: 'Sri Lanka',
          position: candidate.position,
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
        }) as React.ReactElement<any>
      )

      const ndaBuffer = await renderToBuffer(
        React.createElement(NDAPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          letterDate,
        }) as React.ReactElement<any>
      )

      const agreementBuffer = await renderToBuffer(
        React.createElement(InternshipAgreementPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          allowance: candidate.salary.toString(),
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
        }) as React.ReactElement<any>
      )

      documentsToCreate = [
        {
          candidateId,
          documentType: 'Internship Offer Letter',
          fileUrl: `data:application/pdf;base64,${Buffer.from(offerBuffer).toString('base64')}`,
        },
        {
          candidateId,
          documentType: 'Intern NDA',
          fileUrl: `data:application/pdf;base64,${Buffer.from(ndaBuffer).toString('base64')}`,
        },
        {
          candidateId,
          documentType: 'Internship Agreement',
          fileUrl: `data:application/pdf;base64,${Buffer.from(agreementBuffer).toString('base64')}`,
        },
      ]

    } else if (candidate.employmentType === 'Full-Time') {
      const offerBuffer = await renderToBuffer(
        React.createElement(FullTimeOfferLetterPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          salary: candidate.salary.toString(),
          startDate: formattedStart,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      )

      const agreementBuffer = await renderToBuffer(
        React.createElement(FullTimeAgreementPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          salary: candidate.salary.toString(),
          startDate: formattedStart,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      )

      const ndaBuffer = await renderToBuffer(
        React.createElement(FullTimeNDAPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          letterDate,
        }) as React.ReactElement<any>
      )

      documentsToCreate = [
        {
          candidateId,
          documentType: 'Employment Offer Letter',
          fileUrl: `data:application/pdf;base64,${Buffer.from(offerBuffer).toString('base64')}`,
        },
        {
          candidateId,
          documentType: 'Employment Agreement',
          fileUrl: `data:application/pdf;base64,${Buffer.from(agreementBuffer).toString('base64')}`,
        },
        {
          candidateId,
          documentType: 'Employee NDA',
          fileUrl: `data:application/pdf;base64,${Buffer.from(ndaBuffer).toString('base64')}`,
        },
      ]

    } else if (candidate.employmentType === 'Contract') {
      const offerBuffer = await renderToBuffer(
        React.createElement(ContractOfferLetterPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          contractFee: candidate.salary.toString(),
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      )

      const agreementBuffer = await renderToBuffer(
        React.createElement(ContractAgreementPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          contractFee: candidate.salary.toString(),
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      )

      const ndaBuffer = await renderToBuffer(
        React.createElement(ContractNDAPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          letterDate,
          endDate: formattedEnd,
        }) as React.ReactElement<any>
      )

      documentsToCreate = [
        {
          candidateId,
          documentType: 'Contract Offer Letter',
          fileUrl: `data:application/pdf;base64,${Buffer.from(offerBuffer).toString('base64')}`,
        },
        {
          candidateId,
          documentType: 'Contract Agreement',
          fileUrl: `data:application/pdf;base64,${Buffer.from(agreementBuffer).toString('base64')}`,
        },
        {
          candidateId,
          documentType: 'Contractor NDA',
          fileUrl: `data:application/pdf;base64,${Buffer.from(ndaBuffer).toString('base64')}`,
        },
      ]
    }

    // Save to database
    await prisma.document.deleteMany({ where: { candidateId } })
    await prisma.document.createMany({ data: documentsToCreate })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate documents' },
      { status: 500 }
    )
  }
}