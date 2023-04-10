import {
    NumberField,
    Sheet,
    TextField,
    OptionField,
    Message,
    makeField
  } from '@flatfile/configure'
import * as emailValidator from 'email-validator'

export const NameField = makeField(TextField(), {
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
})

export const PhoneField = makeField(TextField(), {
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
})

export const EmailField = makeField(TextField(), {
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
})

export const AddressField = makeField(TextField(), {
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
})

export const AddressZipField = makeField(TextField(), {
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
})