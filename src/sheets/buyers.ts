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

export const Buyers = new Sheet('buyers', {

    'First Name': TextField({

        label: 'First Name',
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

        'Last Name': TextField({

            label: 'Last Name',
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

            'Phone': TextField({
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

              'Email': TextField({
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

         // only missing Loan Adjustable, Loan ARM Years Initial, and Preapproved headers     