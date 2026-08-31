// Fields: name, type, normal_balance, contra, level, description

const chartOfAccounts = [
  // Basic – Asset
  {
    name: "Cash",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Currency on hand and demand deposits available for immediate use."
  },
  {
    name: "Marketable Securities",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Short-term, highly liquid investments that can be readily sold in active markets."
  },
  {
    name: "Short-term Investments",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Debt or equity investments expected to be sold or mature within one year."
  },
  {
    name: "Accounts Receivable",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Amounts owed by customers from credit sales of goods or services."
  },
  {
    name: "Trade Receivables",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Receivables arising from the sale of inventory or services in the normal course of business."
  },
  {
    name: "Notes Receivable",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Written promises from customers or others to pay a fixed amount on a specified future date."
  },
  {
    name: "Interest Receivable",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Interest earned but not yet received in cash."
  },
  {
    name: "Inventory",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Goods held for sale in the ordinary course of business."
  },
  {
    name: "Supplies",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Consumable items such as office or factory supplies on hand for future use."
  },
  {
    name: "Prepaid Expense",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Payments made in advance for benefits or services to be received in future periods."
  },
  {
    name: "Prepaid Insurance",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Insurance premiums paid in advance and not yet expired."
  },
  {
    name: "Prepaid Rent",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Rent paid ahead of time for the right to use property in future periods."
  },
  {
    name: "Investments",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Longer-term holdings of debt or equity instruments not classified as trading securities."
  },
  {
    name: "PP&E (Property, Plant, and Equipment)",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Tangible long-lived assets used in producing or supplying goods and services."
  },
  {
    name: "Accumulated Depreciation",
    normal_balance: "Credit",
    type: "Asset",
    contra: true,
    level: "basic",
    description: "Total depreciation recognized to date on related property, plant, and equipment."
  },
  {
    name: "Land",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Cost of land held for use in operations; not subject to depreciation."
  },
  {
    name: "Buildings",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Cost of structures owned and used in operations."
  },
  {
    name: "Equipment",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Cost of machinery, tools, and other equipment used in operations."
  },
  {
    name: "Intangibles",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "basic",
    description: "Non-physical assets such as patents, trademarks, licenses, and similar rights."
  },

  // Basic – Liability
  {
    name: "Accounts Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Obligations to suppliers for goods or services purchased on credit."
  },
  {
    name: "Trade Payables",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Payables arising specifically from trade purchases of inventory or services."
  },
  {
    name: "Utilities Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Amounts owed for electricity, water, and other utility services already consumed."
  },
  {
    name: "Interest Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Interest expense incurred but not yet paid."
  },
  {
    name: "Income Taxes Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Income taxes owed to tax authorities but not yet paid."
  },
  {
    name: "Salaries and Wages Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Employee salaries and wages incurred but unpaid at the reporting date."
  },
  {
    name: "Dividends Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Dividends declared by the board of directors but not yet paid to shareholders."
  },
  {
    name: "Unearned Revenue",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Cash received before goods or services are provided; revenue to be recognized in future periods."
  },
  {
    name: "Notes Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Written promises to pay a specified amount of money on a future date."
  },
  {
    name: "Borrowings",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Interest-bearing loans or credit facilities obtained from banks or other lenders."
  },
  {
    name: "Long-term Debts",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "basic",
    description: "Debt obligations that are due more than one year after the reporting date."
  },

  // Basic – Equity
  {
    name: "Share Capital - Ordinary",
    normal_balance: "Credit",
    type: "Equity",
    contra: false,
    level: "basic",
    description: "Par or stated value of ordinary shares issued and outstanding."
  },
  {
    name: "Retained Earnings",
    normal_balance: "Credit",
    type: "Equity",
    contra: false,
    level: "basic",
    description: "Cumulative profits retained in the business after dividends."
  },
  {
    name: "Accumulated Other Comprehensive Income",
    normal_balance: "Credit",
    type: "Equity",
    contra: false,
    level: "basic",
    description: "Cumulative other comprehensive income items recognized outside profit or loss."
  },

  // Basic – Revenue
  {
    name: "Sales",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "basic",
    description: "Revenue from the sale of goods in the ordinary course of business."
  },
  {
    name: "Service Revenue",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "basic",
    description: "Revenue from providing services to customers."
  },
  {
    name: "Rent Revenue",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "basic",
    description: "Income earned from leasing property to others."
  },
  {
    name: "Interest Income",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "basic",
    description: "Interest earned on cash, loans, or investments."
  },
  {
    name: "Gain on Sale of Equipment",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "basic",
    description: "Excess of proceeds over carrying amount from disposing of equipment."
  },

  // Basic – Expense
  {
    name: "Cost of Goods Sold",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Cost of inventory sold during the period."
  },
  {
    name: "Cost of Sales",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Alternative title for cost of goods sold."
  },
  {
    name: "SG&A (Selling, General & Administrative)",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Operating expenses related to selling activities and general administration."
  },
  {
    name: "Salaries and Wages Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Compensation paid to employees for work performed during the period."
  },
  {
    name: "Rent Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Cost of using property during the period under operating leases or rental agreements."
  },
  {
    name: "Utilities Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Cost of electricity, water, gas, and other utilities consumed."
  },
  {
    name: "Supplies Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Cost of supplies consumed during the period."
  },
  {
    name: "Insurance Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Cost of insurance coverage that has expired during the period."
  },
  {
    name: "Advertising Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Costs incurred to promote products or services."
  },
  {
    name: "Travel Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Transportation, accommodation, and related costs of business travel."
  },
  {
    name: "Depreciation",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Periodic allocation of the cost of property, plant, and equipment."
  },
  {
    name: "Amortization Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Periodic allocation of the cost of intangible assets."
  },
  {
    name: "R&D Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Research and development costs expensed in the period incurred."
  },
  {
    name: "Office Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "General office-related costs not classified elsewhere."
  },
  {
    name: "Interest Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Cost of borrowing funds, including interest on loans and bonds."
  },
  {
    name: "Loss on Sale of Property",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Excess of carrying amount over proceeds from disposing of property."
  },
  {
    name: "Income Tax Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "basic",
    description: "Income taxes recognized in profit or loss for the period."
  },

  // Basic – Other
  {
    name: "Dividends",
    type: "Other",
    subtype: "Dividend",  // ← ADD THIS LINE
    normal_balance: "Debit",
    contra: false,
    level: "basic",
    description: "Distributions of profit to shareholders; reduces retained earnings but is not an expense."
  },

  // Extended – Asset
  {
    name: "Cash & Cash Equivalents",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Cash plus highly liquid short-term investments readily convertible to known amounts of cash."
  },
  {
    name: "Petty Cash",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Small cash fund used to pay minor expenses."
  },
  {
  name: "Credityptocurrency",
  normal_balance: "Debit",
  type: "Asset",
  contra: false,
  level: "extended",
  description: "Digital tokens such as Bitcoin or Ether held by the entity as an asset (usually treated as an intangible asset or, for broker‑traders, as inventory under IFRS)."
  },
  {
    name: "Financial Asset",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Debt or equity instruments recognized as financial assets under IFRS."
  },
  {
    name: "Loss Allowance on Financial Asset",
    normal_balance: "Credit",
    type: "Asset",
    contra: true,
    level: "extended",
    description: "Allowance for expected credit losses on financial assets."
  },
  {
    name: "Allowance for Doubtful Accounts",
    normal_balance: "Credit",
    type: "Asset",
    contra: true,
    level: "extended",
    description: "Estimated uncollectible portion of trade receivables."
  },
  {
    name: "Allowance for Uncollectible Accounts",
    normal_balance: "Credit",
    type: "Asset",
    contra: true,
    level: "extended",
    description: "Alternative name for allowance for doubtful accounts."
  },
  {
    name: "Investment in Associates and Joint Venture",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Equity-accounted investments in associates and joint ventures."
  },
  {
    name: "Investment Property",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Property held to earn rentals or for capital appreciation rather than for use in operations."
  },
  {
    name: "Right-of-Use Asset",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Lessee’s right to use an underlying leased asset under IFRS 16."
  },
  {
    name: "Contract Asset",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Right to consideration in exchange for goods or services transferred to a customer."
  },
  {
    name: "Patents",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Exclusive legal rights to produce or use an invention."
  },
  {
    name: "Copyrights",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Rights granted to authors or creators over their literary or artistic works."
  },
  {
    name: "Trademarks",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Registered names, logos, or symbols used to identify the entity’s goods or services."
  },
  {
    name: "Goodwill",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Excess of purchase consideration over the fair value of identifiable net assets acquired in a business combination."
  },
  {
    name: "Deferred Tax Asset",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Income taxes recoverable in future periods due to deductible temporary differences or tax loss carryforwards."
  },
  {
    name: "Plan Asset (Pension)",
    normal_balance: "Debit",
    type: "Asset",
    contra: false,
    level: "extended",
    description: "Asset held by a defined benefit pension plan to fund future obligations."
  },

  // Extended – Liability
  {
    name: "Accrued Expense",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Expense incurred but not yet paid or invoiced."
  },
  {
    name: "Financial Liability",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Obligations that are financial liabilities under IFRS (e.g., loans, bonds)."
  },
  {
    name: "Warranty Liability",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Estimated costs to repair or replace products under warranty obligations."
  },
  {
    name: "Bonds Payable",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Face amount of bonds issued and outstanding."
  },
  {
    name: "Debentures",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Unsecured long-term debt instruments."
  },
  {
    name: "Lease Liability",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Present value of lease payments owed by the lessee under IFRS 16."
  },
  {
    name: "Current Portion of Long-term Debt",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Portion of long-term debt that is due within one year."
  },
  {
    name: "Contract Liability",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Obligation to transfer goods or services for which consideration has been received."
  },
  {
    name: "Provision for Warranty",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Provision recognized for expected warranty costs."
  },
  {
    name: "Refund liability",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Obligation to refund consideration when customers exercise return rights."
  },
  {
    name: "Deferred Tax Liability",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Income taxes payable in future periods due to taxable temporary differences."
  },
  {
    name: "Defined Benefit Obligation",
    normal_balance: "Credit",
    type: "Liability",
    contra: false,
    level: "extended",
    description: "Present value of the entity’s defined benefit pension obligation."
  },

  // Extended – Equity
  {
    name: "Share Capital - Preference",
    normal_balance: "Credit",
    type: "Equity",
    contra: false,
    level: "extended",
    description: "Par or stated value of preference shares issued and outstanding."
  },
  {
    name: "Share Premium",
    normal_balance: "Credit",
    type: "Equity",
    contra: false,
    level: "extended",
    description: "Amount received from shareholders in excess of par or stated value of shares issued."
  },
  {
    name: "Additional Paid-in Capital",
    normal_balance: "Credit",
    type: "Equity",
    contra: false,
    level: "extended",
    description: "Additional equity contributions from owners not included in share capital."
  },
  {
    name: "Treasury Stock",
    normal_balance: "Debit",
    type: "Equity",
    contra: true,
    level: "extended",
    description: "Cost of the entity’s own shares repurchased and held; reduces total equity."
  },

  // Extended – Revenue
  {
    name: "Finance Income",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "extended",
    description: "Interest income, dividend income, and other returns on financial assets."
  },
  {
    name: "Dividend Income",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "extended",
    description: "Dividends received from investments in equity instruments."
  },
  {
    name: "Commission Revenue",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "extended",
    description: "Fees earned for arranging transactions or providing agency services."
  },
  {
    name: "Royalty Income",
    normal_balance: "Credit",
    type: "Revenue",
    contra: false,
    level: "extended",
    description: "Receipts for the use of patents, trademarks, copyrights, or natural resources."
  },
  {
    name: "Sales Returns & Allowances",
    normal_balance: "Debit",
    type: "Revenue",
    contra: true,
    level: "extended",
    description: "Contra-revenue account for merchandise returned by customers or allowances granted."
  },
  {
    name: "Sales Discount",
    normal_balance: "Debit",
    type: "Revenue",
    contra: true,
    level: "extended",
    description: "Contra-revenue account for cash discounts offered to customers for early payment."
  },

  // Extended – Expense
  {
    name: "Bad Debt Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Expense recognized for expected credit losses on receivables."
  },
  {
    name: "Purchases",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Cost of goods purchased for resale under periodic inventory systems."
  },
  {
    name: "Promotion Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Costs of sales promotions, coupons, and similar marketing activities."
  },
  {
    name: "Impairment Loss",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Write-down of an asset when its recoverable amount falls below carrying amount."
  },
  {
    name: "Maintenance Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Costs of maintaining property, plant, and equipment in working condition."
  },
  {
    name: "Property Tax Expense",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Tax levied on property owned by the entity."
  },
  {
    name: "Finance Costs",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Interest and other costs incurred in connection with borrowing funds."
  },
  {
    name: "Provision for Income Taxes",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Income tax expense recognized for the current period, including current and deferred tax."
  },
  {
    name: "Freight-In",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Transportation cost of bringing purchased goods to the entity’s premises."
  },
  {
    name: "Freight-Out",
    normal_balance: "Debit",
    type: "Expense",
    contra: false,
    level: "extended",
    description: "Shipping cost of delivering goods to customers."
  },
  {
    name: "Purchase Returns & Allowances",
    normal_balance: "Credit",
    type: "Expense",
    contra: true,
    level: "extended",
    description: "Contra-purchases account for goods returned to suppliers or allowances received."
  },
  {
    name: "Purchase Discount",
    normal_balance: "Credit",
    type: "Expense",
    contra: true,
    level: "extended",
    description: "Contra-purchases account for cash discounts received from suppliers for early payment."
  },

  // Extended – Other
  {
    name: "Other Comprehensive Income (Gain)",
    type: "Other",
    subtype: "OCI",  // ← ADD THIS LINE
    normal_balance: "Credit",
    contra: false,
    level: "extended",
    description: "Unrealized fair value gains on FVOCI financial assets recognized in other comprehensive income."
  },
  {
    name: "Other Comprehensive Income (Loss)",
    type: "Other",
    subtype: "OCI",  // ← ADD THIS LINE
    normal_balance: "Debit",
    contra: false,
    level: "extended",
    description: "Unrealized fair value losses on FVOCI financial assets recognized in other comprehensive income."
  },
  {
    name: "Income Summary",
    type: "Other",
    subtype: "Income-Summary",  // ← ADD THIS LINE
    normal_balance: "Credit",
    contra: false,
    level: "extended",
    description: "Temporary account used in the closing process to summarize revenues and expenses."
  }
];

// Note: "Other" includes other comprehensive income items, dividends,
// closing/clearing accounts, and similar items that are not pure
// Asset, Liability, Equity, Revenue, or Expense types.


function getAccountsFromChart() {
  return chartOfAccounts
    .filter(a => a.name && a.type && a.normal_balance)
    .map(a => ({
      ...a
      // No transformation needed - types are already correct
    }));
}