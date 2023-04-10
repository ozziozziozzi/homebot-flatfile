import {
  Sheet,
  TextField,
  OptionField,
  Message,
  BooleanField
} from '@flatfile/configure'
import {
  NameField,
  PhoneField,
  EmailField,
} from '../fields/reusable'
import * as hooks from '../datahooks/hooks'
import { SmartDateField } from '../../examples/fields/SmartDateField'

export const Buyers = new Sheet('buyers', {
  'First Name': NameField({
    label: 'First Name',
    required: true
  }),

  'Last Name': NameField({
    label: 'Last Name',
    required: true
  }),

  'Phone': PhoneField({
    label: 'Phone'
  }),

  'Email': EmailField({
    label: 'Email',
    required: true
  }),

  'Zip Codes': TextField({
    label: 'Zip Codes',
    description: 'XXXXX (5 digit zip code)',
    validate: (zip: string) => {
      const regex = /^[0-9]{5}$/
      if (!regex.test(zip)) {
        return [
          new Message(
            'Invalid zip code',
            'error',
            'validate'
          )
        ]
      }
    },
    compute: (zip: string) => {
      if (zip.length > 5) {
        return zip.slice(0, 5)
      } else if (zip.length === 4) {
        return '0' + zip
      } else {
        return zip
      }
    }
  }),

  'Price Point': TextField({
    label: 'Price Point',
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

  'Language Preference': OptionField({
    label: 'Language Preference',
    description: 'English or Spanish',
    options: {
      english: 'en',
      spanish: 'es'
    }
  }),

  'Max Loan Amount': TextField({
    label: 'Max Loan Amount',
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),

  'Downpayment': TextField({
    label: 'Downpayment',
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),


  'Max Home Price': TextField({
    label: 'Max Home Price',
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
  }),

  'Estimated Rate': TextField({
    label: 'Estimated Rate',
    compute: (value: string) => {
      const rate = value.replace('%', '').trim()
      if (rate.match(/^0+.?0{0,2}$/g)) {
        return '0.01'
      } else {
        return value
      }
    }
  }),

  'Loan Type': TextField({
    label: 'Loan Type'
  }),

  'Loan Term Months': OptionField({
    label: 'Loan Term Months',
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

  'Expires At': SmartDateField({
    label: 'Expires At',
    locale: 'en',
    description: 'Smart dates',
    formatString: 'M/d/yyyy'
  }),

  'Loan Adjustable': BooleanField({
    description: "Is the loan adjustable?",
  }),

  'Pre Approved': BooleanField({
    description: "Is the loan pre approved?",
  }),

  'Loan ARM Years': TextField({
    label: 'Loan ARM Years',
    compute: (value: string) => {
      return value.replace('$', '').trim()
    }
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
