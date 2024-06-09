import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { toast } from 'sonner';


interface ProcessedPayroll {
  grossSalary: number;
  basicSalary: number;
  hra: number;
  epf: number;
  professionalTax: number;
  incomeTax: number;
  totalDeductions: number;
  finalNetPay: number;
  payPeriod: string;
  slipGenerationDate: string;
}

interface EmployeeDetails {
  EmpID: string;
  EmpName: string;
  JoinDate: string;
  Status: string;
  DOB: string;
  EmpPNumber: string;
  EmpEmail: string;
  CurrentPosition: string;
  NetPay: string;
}

const convertNumberToWords = (number: number): string => {
  if (number === 0) return 'zero';

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const convertLessThanOneThousand = (num: number): string => {
    let result = '';

    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' hundred ';
      num %= 100;
    }

    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }

    if (num >= 10 && num <= 19) {
      result += teens[num - 10];
      num = 0;
    }

    if (num > 0) {
      result += ones[num];
    }

    return result.trim();
  };

  let integerPart = Math.floor(number);
  let decimalPart = Math.round((number - integerPart) * 100);

  let result = '';

  if (integerPart >= 1000000000) {
    result += convertLessThanOneThousand(Math.floor(integerPart / 1000000000)) + ' billion ';
    integerPart %= 1000000000;
  }

  if (integerPart >= 1000000) {
    result += convertLessThanOneThousand(Math.floor(integerPart / 1000000)) + ' million ';
    integerPart %= 1000000;
  }

  if (integerPart >= 1000) {
    result += convertLessThanOneThousand(Math.floor(integerPart / 1000)) + ' thousand ';
    integerPart %= 1000;
  }

  if (integerPart > 0) {
    result += convertLessThanOneThousand(integerPart);
  }

  if (decimalPart > 0) {
    result += ' rupees and ' + convertLessThanOneThousand(decimalPart) + ' paisa only';
  }

  return result.trim();
};


export const generateSalarySlipPDF = async (
    processedPayroll: ProcessedPayroll,
    empDetails: EmployeeDetails,
    workingDays: number,
    overtimeHours: number,
  ) => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
  
      // Add a new page
      const page = pdfDoc.addPage([612, 792]); // A4 size
  
      // Embed fonts
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
      // Draw content on the page
      const { width, height } = page.getSize();
      const fontSize = 12;
      const lineHeight = fontSize * 1.5;
  
      
      // Header
      page.drawText('Payslip', {
        x: 50,
        y: height - 50,
        size: 24,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      page.drawText('WorkforceSync', {
        x: width - 200,
        y: height - 50,
        size: 18,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
  
      // Employee details
      let y = height - 100;
      page.drawText(`Employee Name: ${empDetails.EmpName}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText(`Designation: ${empDetails.CurrentPosition}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      // page.drawText(`Department: ${empDetails.Department}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // y -= lineHeight;
      page.drawText(`Date of Joining: ${empDetails.JoinDate}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText(`Pay Period: ${processedPayroll.payPeriod}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });

      y -= lineHeight;
      page.drawText(`Slip Generation Date: ${processedPayroll.slipGenerationDate}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight * 2;
      page.drawText(`Worked Days: ${workingDays}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText(`Overtime Hours: ${overtimeHours}`, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight * 2;
  
      // Earnings
      page.drawText('Earnings', { x: 50, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      page.drawText('Amount', { x: width - 100, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText('Basic Pay', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText(`${processedPayroll.basicSalary.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      // page.drawText('Incentive Pay', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // page.drawText(`${processedPayroll.incentivePay.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // y -= lineHeight;
      page.drawText('House Rent Allowance', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText(`${processedPayroll.hra.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      // page.drawText('Meal Allowance', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // page.drawText(`${processedPayroll.mealAllowance.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // y -= lineHeight;
      const totalEarnings = processedPayroll.basicSalary + processedPayroll.hra;
      // const totalEarnings = processedPayroll.basicSalary + processedPayroll.incentivePay + processedPayroll.hra + processedPayroll.mealAllowance;
      page.drawText('Total Earnings', { x: 50, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      page.drawText(`${totalEarnings.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      y -= lineHeight * 2;
  
      // Deductions
      page.drawText('Deductions', { x: 50, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      page.drawText('Amount', { x: width - 100, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText('Provident Fund', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText(`${processedPayroll.epf.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText('Income Tax', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText(`${processedPayroll.incomeTax.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      page.drawText('Professional Tax', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText(`${processedPayroll.professionalTax.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight;
      // page.drawText('Loan', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // page.drawText(`${processedPayroll.loan.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      // y -= lineHeight;
      const totalDeductions = processedPayroll.epf + processedPayroll.incomeTax + processedPayroll.professionalTax;
      // const totalDeductions = processedPayroll.epf + processedPayroll.professionalTax + processedPayroll.loan;
      page.drawText('Total Deductions', { x: 50, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      page.drawText(`${totalDeductions.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      y -= lineHeight * 2;
  
      // Net Pay
      // const netPay = '${processedPayroll.finalNetPay.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}'';
      const netPay =  (processedPayroll.finalNetPay)
      page.drawText('Net Pay', { x: 50, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      page.drawText(`${processedPayroll.finalNetPay.toFixed(2)}`, { x: width - 100, y, size: fontSize, font: helveticaBoldFont, color: rgb(0, 0, 0) });
      y -= lineHeight;

      
      const capitalizedWordNetPay = convertNumberToWords(netPay).charAt(0).toUpperCase() + convertNumberToWords(netPay).slice(1);
      page.drawText(capitalizedWordNetPay, { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight * 2;
      
      // Signatures
      
      y -= lineHeight * 4;
      page.drawText('Employer Stamp', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      page.drawText('Employee Signature', { x: width - 150, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
      y -= lineHeight * 2;
  
      // Footer
      y -= lineHeight * 8.5;
      page.drawText('This is system generated payslip. Company stamp is required to assure authenticity.', { x: 50, y, size: fontSize, font: timesRomanFont, color: rgb(0, 0, 0) });
  
      // // Save the PDF document as a byte array
      // const pdfBytes = await pdfDoc.save();
  
      // // Fixing the date format
      // const [month, year] = processedPayroll.payPeriod.split(' ');
      // const formattedPayPeriod = `${month}-${year}`;

      // Download the PDF file
      // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      // saveAs(blob, `SalarySlip_${empDetails.EmpID}_${formattedPayPeriod}.pdf`);
      // Return the PDF document
      return pdfDoc;
    } catch (error) {
      console.error('Error generating salary slip PDF:', error);
      toast("Uh oh! Something went wrong while generating the salary slip.");
    }
  };