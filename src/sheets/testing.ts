import {
    NumberField,
    Sheet,
    TextField,
    OptionField,
    Message
  } from '@flatfile/configure'
  import * as hooks from '../datahooks/hooks'
  import * as emailValidator from 'email-validator'
  var addressit = require("addressit")
  import { SmartDateField } from '../../examples/fields/SmartDateField'

  export const Testing = new Sheet('testing', {
    'Subject Property Address': TextField({
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
      },
      compute: (addy: string) => {
        let parsed_addy = addressit(addy)
        let final_addy = []

        final_addy.push(parsed_addy.number, parsed_addy.street)

        if (parsed_addy.unit != '')

        return final_addy
      }
    })
  }, {})