/**
 * This is a scaffold for defining a Workbook with Sheets and Portals.
 * Test this scaffold using the sample file in examples/sample-uploads/my-sheet-sample.csv.
 *
 * See examples/workbooks/FullExample.ts for a full, working example of a Workbook.
 */

import {
  Portal,
  Workbook,
} from '@flatfile/configure'
import { Buyers } from '../src/sheets/buyers'
import { Frontend } from '../src/sheets/frontend'
import { Universal } from '../src/sheets/universal'

/**
 * Portals
 * Define your Portals here, or import them:
 * import { YourPortal } from './path-to-your-portal/your-portal.ts'
 */
const FrontendPortal = new Portal({
  name: 'frontend',
  sheet: 'Frontend'
})

const BuyersPortal = new Portal({
  name: 'buyers',
  sheet: 'Buyers'
})

const CustomerFacingPortal = new Portal({
  name: 'universal',
  sheet: 'Universal'
})

// Workbook  - Update to reference your Workbook with Sheet(s) and Portal(s)
export default new Workbook({
  name: 'MyWorkbook',
  namespace: 'my-workbook',
  portals: [FrontendPortal, BuyersPortal, CustomerFacingPortal],
  sheets: {
    Buyers,
    Frontend,
    Universal
  },
})
