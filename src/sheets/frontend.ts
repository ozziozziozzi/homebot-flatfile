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
  import * as emailValidator from 'email-validator'
  import { SmartDateField } from '../../examples/fields/SmartDateField'

export const Frontend = new Sheet('frontend', {
  'Borrower First/Middle Name': NameField({
    label: 'Borrower First/Middle Name',
    required: true
    }),

  'Borrower Last Name/Suffix': NameField({
    label: 'Borrower Last Name/Suffix'
  }),

  'Borr Cell Phone': PhoneField({
      label: 'Borr Cell Phone'
    }),

  'Borr Email': EmailField({
    label: 'Borr Email',
    required: true,
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
    label: 'Co-Borrower First Name'
  }),

  'Co-Borrower Last Name/Suffix': NameField({
    label: 'Co-Borrower Last Name'
  }),

  'Co-Borr Cell Phone': PhoneField({
    label: 'Co-Borr Phone'
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

  },

  {
      allowCustomFields: true,
      recordCompute: (record) => {
        hooks.conditionalFormatting(record)
        hooks.highlyEncouraged(record)
        hooks.miscellaneousPhoneRemover(record)
        hooks.coborrowerEmailCheck(record)
        return record
    }
  })