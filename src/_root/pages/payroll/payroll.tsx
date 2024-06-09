
import MainHeaderFrame from "@/components/main-header-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchAttendanceRecords, getEmpDetailedData } from "@/lib/appwrite/api";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming you have a Select component from shadcn
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import { saveAs } from 'file-saver-es';
import { generateSalarySlipPDF } from "@/components/misc-components/generate-payslip-pdf";

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

// interface EmployeeDetails {
//   EmpID: string;
//   EmpName: string;
//   JoinDate: string;
//   Status: string;
//   DOB: string;
//   EmpPNumber: string;
//   EmpEmail: string;
//   CurrentPosition: string;
//   NetPay: string;
// }

const PayrollPage = () => {
  const [empID, setEmpID] = useState('');
  const [empData, setEmpData] = useState<Document | null>(null);
  const [empDetails, setEmpDetails] = useState({
    EmpID: '',
    EmpName: '',
    JoinDate: '',
    Status: '',
    DOB: '',
    EmpPNumber: '',
    EmpEmail: '',
    CurrentPosition: '',
    NetPay: '',
  });
  const [workingDays, setWorkingDays] = useState(24);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5);
  const [processedPayroll, setProcessedPayroll] = useState<ProcessedPayroll | null>(null);
  const [showPayrollDetails, setShowPayrollDetails] = useState(false); // New state to track if payroll details should be displayed

  useEffect(() => {
    console.log('Employee data:', empData);
    // Toggle the flag to true when empData is fetched
    if (empData) {
      setShowPayrollDetails(true);
    }
  }, [empData]);

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleButtonClick = async () => {
    if (empID) {
      try {
        const data = await getEmpDetailedData(empID);

        setEmpData(data as Document | null);
        setEmpDetails({
          EmpID: data?.EmpID ?? '',
          EmpName: data?.EmpName ?? '',
          JoinDate: data?.JoinDate?.split('T')[0] ?? '',
          Status: data?.Status ?? '',
          DOB: data?.DOB?.split('T')[0] ?? '',
          EmpPNumber: data?.EmpPNumber ?? '',
          EmpEmail: data?.EmpEmail ?? '',
          CurrentPosition: data?.CurrentPosition ?? '',
          NetPay: data?.NetPay ?? '',
        });
      } catch (error) {
        console.error('Error:', error);
        toast("Uh oh! Something went wrong. Task not added.");
      }
    } else {
      console.error('Employee ID is required');
      toast("Employee ID is required.");
    }
  };

  const processPayroll = () => {
    const netAnnualSalary = parseFloat(empDetails.NetPay);
    const netMonthlySalary = netAnnualSalary / 12;
    const grossSalary = netMonthlySalary; // Assuming no deductions in Net Pay
    const basicSalary = grossSalary * 0.6;
    const hra = grossSalary * 0.4;
    const epf = basicSalary * 0.12;
    const professionalTax = 2500/12;
    const incomeTax = calculateIncomeTax(grossSalary * 12) / 12;
    const totalDeductions = epf + professionalTax + incomeTax;

    const salaryPerDay = grossSalary / 24; // Assuming 6 days a week, 24 days a month
    const salaryPerHour = salaryPerDay / 8;
    const overtimePay = overtimeHours * salaryPerHour * overtimeMultiplier;
    const finalNetPay = (salaryPerDay * workingDays) + overtimePay - totalDeductions;

    const payPeriod = `${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    const slipGenerationDate = new Date().toLocaleDateString();

    setProcessedPayroll({
      grossSalary,
      basicSalary,
      hra,
      epf,
      professionalTax,
      incomeTax,
      totalDeductions,
      finalNetPay,
      payPeriod,
      slipGenerationDate
    });
    toast("Payroll processed successfully.");
  };

  const calculateIncomeTax = (annualSalary: number) => {
    // New regime tax slabs
    if (annualSalary <= 250000) return 0;
    if (annualSalary <= 500000) return (annualSalary - 250000) * 0.05;
    if (annualSalary <= 750000) return 12500 + (annualSalary - 500000) * 0.1;
    if (annualSalary <= 1000000) return 37500 + (annualSalary - 750000) * 0.15;
    if (annualSalary <= 1250000) return 75000 + (annualSalary - 1000000) * 0.2;
    if (annualSalary <= 1500000) return 125000 + (annualSalary - 1250000) * 0.25;
    return 187500 + (annualSalary - 1500000) * 0.3;
  };


  const handleDownloadPayslip = async () => {

    if (processedPayroll) {
      const pdfDoc = await generateSalarySlipPDF(processedPayroll, empDetails, workingDays, overtimeHours);
      if (pdfDoc) {
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);

        const [month, year] = processedPayroll.payPeriod.split(' ');
        const formattedPayPeriod = `${month}-${year}`;

        link.download = `SalarySlip_${empDetails.EmpID}_${formattedPayPeriod}.pdf`;
        link.click();
      }
    } else {
      console.error('Payroll data is not available');
      toast("Payroll data is not available. Please process the payroll first.");
    }
  };
  

  const handlePrintPayslip = async () => {
    if (processedPayroll) {
      const pdfDoc = await generateSalarySlipPDF(processedPayroll, empDetails, workingDays, overtimeHours);
      if (pdfDoc) {
        // Get PDF data as a blob
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
  
        // Convert blob to URL
        const pdfUrl = URL.createObjectURL(blob);
  
        // Open print dialog
        const printWindow = window.open(pdfUrl, "_blank");
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
          };
        } else {
          console.error('Failed to open print window');
        }
      }
    } else {
      console.error('Payroll data is not available');
      toast("Payroll data is not available. Please process the payroll first.");
    }
  };
  
  

  // Calculating attendance
  const [currentMonthAttendance, setCurrentMonthAttendance] = useState(0);
  const [prevMonthAttendance, setPrevMonthAttendance] = useState(0);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const attendanceRecords = await fetchAttendanceRecords();

      if (attendanceRecords) {
        const currentMonth = new Date().getMonth() + 1;
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const currentYear = new Date().getFullYear();
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const currentMonthRecords = attendanceRecords.filter(
          (record) =>
            record.empID === empDetails.EmpID &&
            new Date(record.attendanceDateTime).getMonth() + 1 === currentMonth &&
            new Date(record.attendanceDateTime).getFullYear() === currentYear
        );

        const prevMonthRecords = attendanceRecords.filter(
          (record) =>
            record.empID === empDetails.EmpID &&
            new Date(record.attendanceDateTime).getMonth() + 1 === prevMonth &&
            new Date(record.attendanceDateTime).getFullYear() === prevYear
        );

        setCurrentMonthAttendance(currentMonthRecords.length);
        setPrevMonthAttendance(prevMonthRecords.length);
      }
    };

    fetchAttendanceData();
  }, [empDetails.EmpID]);

  return (
    <MainHeaderFrame>
      <div className="p-3 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Processing</CardTitle>
            <CardDescription>Input ID of an employee to view their details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2 py-5">
              <Input
                id="empID"
                placeholder="Employee ID"
                onKeyDown={handleEnterPress}
                value={empID}
                onChange={(e) => setEmpID(e.target.value)}
              />
              <Button onClick={handleButtonClick}>Fetch</Button>
            </div>
            <Separator />
            {showPayrollDetails && (
              <div>
                {/* <div className="flex space-x-2 py-5"> */}
                <div className="flex w-full items-center space-x-2 py-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col">
                          <Label className="text-xs font-medium text-gray-500 p-1">Working Days</Label>
                          <Input
                            id="workingDays"
                            type="number"
                            placeholder="Working Days"
                            value={workingDays}
                            onChange={(e) => setWorkingDays(Number(e.target.value))}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of days worked in this month</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col">
                        <Label className="text-xs font-medium text-gray-500 p-1">Overtime Hours</Label>
                          <Input
                            id="overtimeHours"
                            type="number"
                            placeholder="Overtime Hours"
                            value={overtimeHours}
                            onChange={(e) => setOvertimeHours(Number(e.target.value))}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of overtime hours worked in this month</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* <div className="flex justify-between items-center space-x-2"> */}
                    <div>
                      <Label className="text-xs font-medium text-gray-500 p-1">Overtime Multiplier</Label>
                      <Select
                        value={overtimeMultiplier.toString()}
                        onValueChange={(value) => setOvertimeMultiplier(Number(value))}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Select OT Multiplier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1x</SelectItem>
                          <SelectItem value="1.1">1.1x</SelectItem>
                          <SelectItem value="1.2">1.2x</SelectItem>
                          <SelectItem value="1.3">1.3x</SelectItem>
                          <SelectItem value="1.4">1.4x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="1.6">1.6x</SelectItem>
                          <SelectItem value="1.7">1.7x</SelectItem>
                          <SelectItem value="1.8">1.8x</SelectItem>
                          <SelectItem value="1.9">1.9x</SelectItem>
                          <SelectItem value="2">2x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-grow flex justify-end space-x-2">
                      <Button onClick={processPayroll}>Process</Button>
                      {/* <Button
                        onClick={() => {
                          if (processedPayroll) {
                            generateSalarySlipPDF(processedPayroll, empDetails, workingDays, overtimeHours);
                          } else {
                            console.error('Payroll data is not available');
                            toast("Payroll data is not available. Please process the payroll first.");
                          }
                        }}
                      >
                        Download Salary Slip
                      </Button> */}
                      <Button onClick={handleDownloadPayslip}>Download Salary Slip</Button>
                      <Button onClick={handlePrintPayslip}>Print Salary Slip</Button>
                    </div>
                </div>
                <Separator />
                <div className="flex space-x-4 py-5">
                  <div className="w-7/12">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>Payroll Details</CardTitle>
                        <CardDescription>Click entries to expand.</CardDescription>
                      </CardHeader>
                      <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            Cost to Company (CTC) Per Annum: ₹{empDetails.NetPay.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                          </AccordionTrigger>
                          <AccordionContent>
                            {processedPayroll ? (
                              <div>
                                <Accordion type="single" collapsible>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      Gross Monthly Salary: ₹{processedPayroll.grossSalary.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <p>Gross Monthly Salary is the total salary before any deductions.</p>
                                      <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1a">
                                          <AccordionTrigger>
                                            Basic Salary: ₹{processedPayroll.basicSalary.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <p>Basic Salary is the primary component of an employee's salary.</p>
                                          </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-1b">
                                          <AccordionTrigger>
                                            HRA: ₹{processedPayroll.hra.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <p>HRA (House Rent Allowance) is a component of salary that helps employees cover housing expenses.</p>
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                      Total Monthly Deductions: ₹{processedPayroll.totalDeductions.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <p>Total Monthly Deductions is the sum of all deductions from the employee's salary.</p>
                                      <Accordion type="single" collapsible>
                                        <AccordionItem value="item-2a">
                                          <AccordionTrigger>
                                            EPF: ₹{processedPayroll.epf.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <p>EPF (Employee Provident Fund) is a retirement savings scheme for employees.</p>
                                          </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2b">
                                          <AccordionTrigger>
                                            Professional Tax: ₹{processedPayroll.professionalTax.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <p>Professional Tax is a tax levied on individuals earning a certain level of income. ₹2500/yr.</p>
                                          </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2c">
                                          <AccordionTrigger>
                                            Income Tax: ₹{processedPayroll.incomeTax.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <p>Income Tax is a tax levied on an individual's income by the government.</p>
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="item-3">
                                    <AccordionTrigger>
                                      Final Monthly Net Pay: ₹{processedPayroll.finalNetPay.toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <p>Final Net Pay is the net salary after adding overtime pay and subtracting all deductions.</p>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            ) : (
                              <p>No payroll processed yet.</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex-grow flex justify-end">
                    <Card className="h-full">
                      <CardHeader>
                        <h3 className="text-lg font-bold mb-4">Employee Information</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col space-y-3">
                            <div>
                              <p className="text-sm font-medium">Employee ID:</p>
                              <p className="text-base font-medium py-2">{empDetails.EmpID}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Full Name:</p>
                              <p className="text-base font-medium py-2">{empDetails.EmpName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Joining Date:</p>
                              <p className="text-base font-medium py-2">{empDetails.JoinDate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Current Position:</p>
                              <p className="text-base font-medium py-2">{empDetails.CurrentPosition}</p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <div>
                              <p className="text-sm font-medium">Current Month Attendance:</p>
                              <p className="text-base font-medium py-2">
                                {new Date().toLocaleString('default', { month: 'long' })}: {currentMonthAttendance}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Previous Month Attendance:</p>
                              <p className="text-base font-medium py-2">
                                {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })}: {prevMonthAttendance}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Phone:</p>
                              <p className="text-base font-medium py-2">{empDetails.EmpPNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email:</p>
                              <p className="text-base font-medium py-2">{empDetails.EmpEmail}</p>
                            </div>

                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster/>
    </MainHeaderFrame>
  );

};

export default PayrollPage;
