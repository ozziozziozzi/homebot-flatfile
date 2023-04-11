import {
    NumberField,
    Sheet,
    TextField,
    OptionField,
    Message
} from '@flatfile/configure'
import {
  NameField,
  PhoneField,
  EmailField,
  AddressField,
  AddressZipField
} from '../fields/reusable'
import * as hooks from '../datahooks/hooks'
import { SmartDateField } from '../../examples/fields/SmartDateField'

export const Archive = new Sheet('archive', {
  'Borrower First/Middle Name': NameField({
    label: 'Borrower First/Middle Name',
    required: true
  }),

  'Borrower Last Name/Suffix': NameField({
    label: 'Borrower Last Name/Suffix'
  }),

  'Borr Cell Phone': PhoneField({
    label: 'Borr Cell Phone',
    description: 'XXX-XXX-XXXX',
  }),

  'Borr Email': EmailField({
    label: 'Borr Email',
    required: true
  }),

  'Borr DOB': SmartDateField({
    label: 'Date of Birth',
    description: 'MM/DD/YYYY (This field is used to display reverse mortgage for eligible homeowners).',
    locale: 'en',
    formatString: 'M/d/yyyy'
  }),

  'Borr Language Preference': OptionField({
    label: 'Language Preference',
    description: 'English or Spanish',
    options: {
      english: 'en',
      spanish: 'es'
    }
  }),

  'Co-Borrower First/Middle Name': NameField({
    label: 'Co-Borrower First/Middle Name'
  }),

  'Co-Borrower Last Name/Suffix': NameField({
    label: 'Co-Borrower Last Name/Suffix'
  }),

  'Co-Borr Cell Phone': PhoneField({
    label: 'Co-Borr Phone',
    description: 'XXX-XXX-XXXX'
  }),

  'Co-Borr Email': EmailField({
    label: 'Co-Borr Email'
  }),

  'Co-Borr DOB': SmartDateField({
    label: 'Co-Borr Date of Birth',
    description: 'MM/DD/YYYY (This field is used to display reverse mortgage for eligible homeowners).',
    locale: 'en',
    formatString: 'M/d/yyyy'
  }),

  'Co-Borr Language Preference': OptionField({
    label: 'Co-Borr Language Preference',
    description: 'English or Spanish',
    options: {
      english: 'en',
      spanish: 'es'
    }
  }),

  'Subject Property Address': AddressField({
    label: 'Subject Property Address'
  }),

  'Subject Property Zip': AddressZipField({
    label: 'Subject Property Zip'
  }),

  'Subject Property Appraised Value': TextField({
    label: 'Subject Property Appraised Value',
    validate: (amount: string) => {
      const numRegex = /(^\d+$)|(^\d*,?\d*,?\d*.?(\d{1,2})?$)/g
      if (!numRegex.test(amount)) {
        return [
          new Message(
            'Invalid numeric amount',
            'error',
            'validate'
          )
        ]
      }
    },
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),

  'Subject Property Appraised Date': SmartDateField({
    label: 'Subject Property Appraised Date',
    locale: 'en',
    description: 'Smart dates',
    formatString: 'M/d/yyyy'
  }),

  'Subject Property Purchase Price': TextField({
    label: 'Subject Property Purchase Price',
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),

  'Subject Property Purchase Date': SmartDateField({
    label: 'Subject Property Purchase Date',
    locale: 'en',
    description: 'Smart dates',
    formatString: 'M/d/yyyy'
  }),

  'Total Loan Amount': TextField({
    label: 'Total Loan Amount',
    validate: (amount: string) => {
      const numRegex = /(^\d+$)|(^\d*,?\d*,?\d*.?(\d{1,2})?$)/g
      if (!numRegex.test(amount)) {
        return [
          new Message(
            'Invalid numeric amount',
            'error',
            'validate'
          )
        ]
      }
    },
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),

  'Interest Rate': TextField({
    label: 'Interest Rate',
    compute: (value: string) => {
      const rate = value.replace('%', '').trim()
      if (rate.match(/^0+.?0{0,2}$/g)) {
        return '0.01'
      } else {
        return value
      }
    }
  }),

  'Loan Term': OptionField({
    label: 'Loan Term',
    matchStrategy: 'exact',
    options: {
      '120': '120',
      '180': '180',
      '240': '240',
      '264': '264',
      '300': '300',
      '360': '360'
    },
    compute: (value: any) => {
      const labels = ['120', '180', '240', '264', '300', '360']
      let term = value.toString()
      if (!labels.includes(term)) {
        term = term.replace(/\D/g, '').trim()
        if (labels.includes(String(term))) {
          return term
        }
        if (term <= 30) {
          const product : number = Number(term) * 12
          return String(product)
        } else {
          return term
        }
      } else {
        return term
      }
    }
  }),

  'Loan Purpose': TextField({
    label: 'Loan Purpose',
    default: 'Purchase'
  }),

  'Closing Date': SmartDateField({
    label: 'Closing Date',
    locale: 'en',
    description: 'Smart dates',
    formatString: 'M/d/yyyy'
  }),

  'NMLS Loan Originator ID': TextField({
    label: 'Loan Officer NMLS ID',
    compute: (nmls: string) => {
      return nmls.replace(/\D/g, '').trim()
    }
  }),

  'Lender NMLS ID': NumberField({
    label: 'Company NMLS ID'
  }),

  'NMLS Loan Type': OptionField({
    label: 'NMLS Loan Type',
    matchStrategy: 'exact',
    options: {
      'ResidentialFirst': 'ResidentialFirst',
            'ClosedEndSecond': 'Second',
            'HELOC': 'HELOC',
            'ReverseMortgage': 'Reverse Mortgage',
            'Construction': 'Construction',
            'MultiFamily': 'Multifamily',
            'Commercial': 'Commercial',
            'Other': 'Other'
    }
  }),

  'Total Monthly Payment': TextField({
    label: 'Total Monthly Payment',
    validate: (amount: string) => {
      const numRegex = /(^\d+$)|(^\d*,?\d*,?\d*.?(\d{1,2})?$)/g
      if (!numRegex.test(amount)) {
        return [
          new Message(
            'Invalid numeric amount',
            'error',
            'validate'
          )
        ]
      }
    },
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),

  'Mortgage Insurance Premium': TextField({
    label: 'Mortgage Insurance Premium',
    validate: (amount: string) => {
      const numRegex = /(^\d+$)|(^\d*,?\d*,?\d*.?(\d{1,2})?$)/g
      if (!numRegex.test(amount)) {
        return [
          new Message(
            'Invalid numeric amount',
            'error',
            'validate'
          )
        ]
      }
    },
    compute: (value: string) => {
      const regex = /[A-Za-z\s]+/g
      if (value.includes('$')) {
        return value.replace('$', '').trim()
      } else if (regex.test(value)) {
        return ''
      } else {
        return value
      }
    }
  }),

  'First Payment Due Date': SmartDateField({
    label: 'First Payment Due Date',
    locale: 'en',
    description: 'Smart dates',
    formatString: 'M/d/yyyy'
  }),

  'Loan Number': TextField({
    label: 'Loan Number'
  }),

  'Lien Position': TextField({
    label: 'Lien Position'
  }),

  'Amort Type': TextField({
    label: 'Amort Type'
  }),

  'Loan Type': TextField({
    label: 'Loan Type'
  }),

  'Occupancy (PSI)': OptionField({
    label: 'Occupancy (Primary, Secondary, Investment)',
    options: {
      primary: 'Primary',
      secondary: 'Secondary',
      investment: 'Investment'
    }
  })
}, 
{
  allowCustomFields: true,
  recordCompute: (record) => {
    // hooks.conditionalFormatting(record)
    hooks.splitName(record)
    hooks.highlyEncouraged(record)
    hooks.miscellaneousPhoneRemover(record)
    hooks.coborrowerEmailCheck(record)
    return record
  }
})