import {
    NumberField,
    Sheet,
    TextField,
    OptionField,
    Message
  } from '@flatfile/configure'
  import * as hooks from '../datahooks/hooks'
  import * as emailValidator from 'email-validator'
  import { SmartDateField } from '../../examples/fields/SmartDateField'

const MySheet = new Sheet('frontend', {

'Borrower First/Middle Name': TextField({

    label: 'Borrower First/Middle Name',
    required: true,
    validate: (name:string) => {

        const regex = /^[\D\s]+$/g
        if (!regex.test(name)) {
            return [
                new Message(
                    'Names cannot contain numbers',
                    'error',
                    'validate'
                )
            ]
        }
    },

    compute: (name: string) => {
        const names = name.split(' ')
  
        for (let i = 0; i < names.length; i++) {
          names[i] = names[i][0].toUpperCase() + names[i].substring(1).toLowerCase();
        }
  
        return names.join(' ')
      }
    }),

    'Borr Cell Phone': TextField({
        label: 'Phone',
        description: 'XXX-XXX-XXXX',
        validate: (phone: string) => {
          const regex = /^(\+?\d{1,2})?\s?([-.\s\(])?\d{3}\)?([-.\s\)])?\d{3}[-.\s]?\d{4}$/g
          if (!regex.test(phone)) {
            return [
              new Message(
                'Invalid phone number',
                'error',
                'validate'
              )
            ]
          }
        },
        compute: (phone: string) => {
          const regex = /^[\)\(\*\s-(N/?A)]+$/g
          if (regex.test(phone)) {
            return ''
          } else {
            return phone
          }
        }
      }),

      'Borr Email': TextField({
        label: 'Email',
        required: true,
        description: 'Tip! Double check the emails are complete, valid, and match the associated client on that row.',
        validate: (email: string) => {
          const regex = /[\w-]+@([\w-]+\.)+[\w-]+/g
          const noneRegex = /^(none|noemail|fakeemail|na|N\/A)@/gi
          if (!regex.test(email) || noneRegex.test(email) || !emailValidator.validate(email)) {
            return [
              new Message(
                'Invalid email',
                'error',
                'validate'
              )
            ]
          } 
        }
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

      'Co-Borrower First/Middle Name': TextField({
        label: 'Co-Borrower First Name',
        validate: (name: string) => {
          const regex = /^[\D\s]+$/g
          if (!regex.test(name)) {
            return [
              new Message(
                'Names cannot contain numbers',
                'error',
                'validate'
              )
            ]
          }
        },
        compute: (name: string) => {
          const names = name.split(' ')
    
          for (let i = 0; i < names.length; i++) {
            names[i] = names[i][0].toUpperCase() + names[i].substring(1).toLowerCase();
          }
    
          return names.join(' ')
        }
      }),

      'Co-Borrower Last Name/Suffix': TextField({
        label: 'Co-Borrower Last Name',
        validate: (name: string) => {
          const regex = /^[\D\s]+$/g
          if (!regex.test(name)) {
            return [
              new Message(
                'Names cannot contain numbers',
                'error',
                'validate'
              )
            ]
          }
        },
        compute: (name: string) => {
          const names = name.split(' ')
    
          for (let i = 0; i < names.length; i++) {
            names[i] = names[i][0].toUpperCase() + names[i].substring(1).toLowerCase();
          }
    
          return names.join(' ')
        }
      }),

      'Co-Borr Cell Phone': TextField({
        label: 'Co-Borr Phone',
        description: 'XXX-XXX-XXXX',
        validate: (phone: string) => {
          const regex = /^(\+?\d{1,2})?\s?([-.\s\(])?\d{3}\)?([-.\s\)])?\d{3}[-.\s]?\d{4}$/g
          if (!regex.test(phone)) {
            return [
              new Message(
                'Invalid phone number',
                'error',
                'validate'
              )
            ]
          }
        },
        compute: (phone: string) => {
          const regex = /^[\)\(\*\s-(N/?A)]+$/g
          if (regex.test(phone)) {
            return ''
          } else {
            return phone
          }
        }
      }),

      'Co-Borr Email': TextField({
        label: 'Co-Borr Email',
        description: 'Tip! Double check the emails are valid and complete and match the associated client on that row.',
        validate: (email: string) => {
          const regex = /[\w-]+@([\w-]+\.)+[\w-]+/g
          const noneRegex = /^(none|noemail|fakeemail|na|N\/A)@/gi
          if (!regex.test(email) || noneRegex.test(email) || !emailValidator.validate(email)) {
            return [
              new Message(
                'Invalid email',
                'error',
                'validate'
              )
            ]
          } 
        }
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
    

      'Subject Property Address': TextField({
        label: 'Subject Property Address',
        description: '123 Main Street #1 (Please include the full street address and unit number. Ensure that the address is a residential property, not serviced by a PO Box or commercial. Do not include city and state in this field)',
        validate: (addy: string) => {
          const regex = /(\d)+(-?)[a-zA-Z]?\s+([a-zA-Z0-9])+/g
          if (!regex.test(addy)) {
            return [
              new Message(
                'Invalid propery address',
                'error',
                'validate'
              )
            ]
          }
        }
      }),

      'Subject Property Zip': TextField({
        label: 'Subject Property Zip',
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