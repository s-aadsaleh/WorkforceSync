import MainHeaderFrame from "@/components/main-header-frame";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { downloadEmpFile, getEmpDetailedData } from "@/lib/appwrite/api";
import {  useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const EmpDetailsPage = () => {
    const [empID, setEmpID] = useState('');
    const [empData, setEmpData] = useState<Document | null>(null);
    const [empDetails, setEmpDetails] = useState({
        EmpID: '',
        EmpName: '',
        JoinDate: '',
        Status: '',
        EmpPNumber: '',
        EmpEmail: '',
        DOB: '',
        CurrentPosition: '',
        Education: '',
        Address: '',
        EmergencyContact: '',
        PAN: '',
        Aadhar: '',
        Photo: '',
        Resume: '',
        NetPay:'',
    });

    useEffect(() => {
        console.log('Employee data:', empData);
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
                    EmpPNumber: data?.EmpPNumber ?? '',
                    EmpEmail: data?.EmpEmail ?? '',
                    DOB: data?.DOB?.split('T')[0] ?? '',
                    CurrentPosition: data?.CurrentPosition ?? '',
                    Education: data?.Education ?? '',
                    Address: data?.Address ?? '',
                    EmergencyContact: data?.EmergencyContact ?? '',
                    PAN: data?.PAN ?? '',
                    Aadhar: data?.Aadhar ?? '',
                    Photo: data?.Photo ?? '',
                    Resume: data?.Resume ?? '',
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

    const [panUrl, setPanUrl] = useState('');
    const [aadharUrl, setAadharUrl] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');

    const fetchImageUrls = async () => {
        try {
          const panUrl = await downloadEmpFile(empDetails.PAN);
          const aadharUrl = await downloadEmpFile(empDetails.Aadhar);
          const photoUrl = await downloadEmpFile(empDetails.Photo);
          const resumeUrl = await downloadEmpFile(empDetails.Resume);
      
          if (panUrl && aadharUrl && photoUrl && resumeUrl) {
            setPanUrl(panUrl.toString());
            setAadharUrl(aadharUrl.toString());
            setPhotoUrl(photoUrl.toString());
            setResumeUrl(resumeUrl.toString());
            console.log("URL fetched and saved")
          } else {
            console.error('Failed to fetch image URLs');
          }
        } catch (error) {
          console.error('Error fetching image URLs:', error);
        }
      };

      return (
        <MainHeaderFrame>
            <div className="p-4 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Employee Details</CardTitle>
                        <CardDescription>Input ID of an employee to view their details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-4">
                            <div className="flex w-full max-w-sm items-center space-x-2 py-5">
                                <Input id="empID" placeholder="Employee ID" onKeyDown={handleEnterPress} value={empID} onChange={(e) => setEmpID(e.target.value)} />
                                <Button onClick={handleButtonClick}>Fetch</Button>
                            </div>
                            <Separator />
                            {empData && (
                                <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    <Card>
                                        <CardHeader>
                                            <h3 className="text-lg font-bold mb-4">Employee Information</h3>
                                        </CardHeader>
                                        <CardContent>
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
                                                    <p className="text-sm font-medium">Status:</p>
                                                    <p className="text-base font-medium py-2">{empDetails.Status}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Current Position:</p>
                                                    <p className="text-base font-medium py-2">{empDetails.CurrentPosition}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Net Pay:</p>
                                                    <p className="text-base font-medium py-2">
                                                        ₹{ empDetails.NetPay.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") }
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col space-y-3">
                                                <div>
                                                    <p className="text-sm font-medium py-2">Phone Number(s):</p>
                                                    <p className="text-base font-medium">{empDetails.EmpPNumber}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium py-2">Email:</p>
                                                    <p className="text-base font-medium">{empDetails.EmpEmail}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium pt-8">Emergency Contact Details:</p>
                                                    <p className="text-base font-medium">{empDetails.EmergencyContact}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col space-y-3">
                                                <div>
                                                    <p className="text-sm font-medium py-2">Date of Birth:</p>
                                                    <p className="text-base font-medium">{empDetails.DOB}</p>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium py-2">Education:</p>
                                                    <p className="text-base font-medium">{empDetails.Education}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium py-2">Address:</p>
                                                    <p className="text-base font-medium">{empDetails.Address}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="pt-4">
                                    <Card>
                                        <CardHeader>
                                            <h3 className="text-lg font-bold mb-4">Identification and Documents</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                                <div className="flex justify-center">
                                                    <AlertDialog onOpenChange={fetchImageUrls}>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" className="px-6 py-3">Show PAN</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <div className="flex justify-between items-center">
                                                                    <AlertDialogTitle>PAN Card</AlertDialogTitle>
                                                                    <AlertDialogCancel>Done</AlertDialogCancel>
                                                                </div>
                                                            </AlertDialogHeader>
                                                            <div>
                                                                {panUrl && <img src={panUrl} alt="PAN Card" className="rounded-md object-cover" />}
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                                <div className="flex justify-center">
                                                    <AlertDialog onOpenChange={fetchImageUrls}>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" className="px-6 py-3">Show Aadhar</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <div className="flex justify-between items-center">
                                                                    <AlertDialogTitle>Aadhar Card</AlertDialogTitle>
                                                                    <AlertDialogCancel>Done</AlertDialogCancel>
                                                                </div>
                                                            </AlertDialogHeader>
                                                            <div>
                                                                {aadharUrl && <img src={aadharUrl} alt="Aadhar Card" className="rounded-md object-cover" />}
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                                <div className="flex justify-center">
                                                    <AlertDialog onOpenChange={fetchImageUrls}>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" className="px-6 py-3">Show Photo</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <div className="flex justify-between items-center">
                                                                    <AlertDialogTitle>Photo</AlertDialogTitle>
                                                                    <AlertDialogCancel>Done</AlertDialogCancel>
                                                                </div>
                                                            </AlertDialogHeader>
                                                            <div>
                                                                {photoUrl && <img src={photoUrl} alt="Photo" className="rounded-md object-cover" />}
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                                <div className="flex justify-center">
                                                    <AlertDialog onOpenChange={fetchImageUrls}>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" className="px-6 py-3">Show Resume</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <div className="flex justify-between items-center">
                                                                    <AlertDialogTitle>Resume</AlertDialogTitle>
                                                                    <AlertDialogCancel>Done</AlertDialogCancel>
                                                                </div>
                                                            </AlertDialogHeader>
                                                            <div>
                                                                {resumeUrl && <img src={resumeUrl} alt="Resume" className="rounded-md object-cover" />}
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Toaster />
            </div>
        </MainHeaderFrame>
    );
    
};

export default EmpDetailsPage;



// return (
//     <MainHeaderFrame>
//         <div className="p-4 md:p-8">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Employee Details</CardTitle>
//                     <CardDescription>Select an employee to view their details</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex flex-col space-y-4">
//                         <div className="flex w-full max-w-sm items-center space-x-2 py-5">
//                             <Input id="empID" placeholder="Employee ID" value={empID} onChange={(e) => setEmpID(e.target.value)} />
//                             <Button onClick={handleButtonClick}>Fetch</Button>
//                         </div>
//                         <Separator />
//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//                         <Card>
//                             {/* <div className="rounded-lg shadow-xl p-4"> Increased shadow intensity to shadow-xl */}
//                                 <CardHeader>
//                                     <h3 className="text-lg font-bold mb-4">Employee Information</h3>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="flex flex-col space-y-3">
//                                         <div>
//                                             <p className="text-sm font-medium">Employee ID:</p>
//                                             <p className="text-base font-medium py-2">{empDetails.EmpID}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-medium">Employee Name:</p>
//                                             <p className="text-base font-medium py-2">{empDetails.EmpName}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-medium">Joining Date:</p>
//                                             <p className="text-base font-medium py-2">{empDetails.JoinDate}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-medium">Status:</p>
//                                             <p className="text-base font-medium py-2">{empDetails.Status}</p>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             {/* </div> */}
//                         </Card>
//                         <Card>

//                             <CardHeader>
//                                 <h3 className="text-lg font-bold mb-4">Contact Information</h3>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="flex flex-col space-y-3">
//                                     <div>
//                                         <p className="text-sm font-medium">Employee Phone Number:</p>
//                                         <p className="text-base font-medium">{empDetails.EmpPNumber}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm font-medium">Employee Email:</p>
//                                         <p className="text-base font-medium">{empDetails.EmpEmail}</p>
//                                     </div>
//                                     <div className="py-2"/>
//                                     <div>
//                                     <p className="text-sm font-medium">Emergency Contact Details:</p>
//                                     <p className="text-base font-medium">{empDetails.EmergencyContact}</p>
//                                 </div>
//                                 </div>
//                             </CardContent>

//                         </Card>
//                         <Card>
//                             <CardHeader>
//                                 <h3 className="text-lg font-bold mb-4">Personal Information</h3>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="flex flex-col space-y-3">
//                                     <div>
//                                         <p className="text-sm font-medium">DOB:</p>
//                                         <p className="text-base font-medium">{empDetails.DOB}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm font-medium">CurrentPosition:</p>
//                                         <p className="text-base font-medium">{empDetails.CurrentPosition}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm font-medium">Education:</p>
//                                         <p className="text-base font-medium">{empDetails.Education}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm font-medium">Address:</p>
//                                         <p className="text-base font-medium">{empDetails.Address}</p>
//                                     </div>
//                                 </div>
//                             </CardContent>

//                         </Card>
//                     </div>
//                     <Card>
// <CardHeader>
//     <h3 className="text-lg font-bold mb-4">Identification and Documents</h3>
// </CardHeader>
// <CardContent>
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         <div cclassName="flex justify-center">
//             <AlertDialog onOpenChange={fetchImageUrls}>
//                 <AlertDialogTrigger asChild>
//                     <Button variant="outline" className="px-6 py-3">Show PAN</Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <div className="flex justify-between items-center">
//                             <AlertDialogTitle>PAN Card</AlertDialogTitle>
//                             <AlertDialogCancel>Done</AlertDialogCancel>
//                         </div>
//                     </AlertDialogHeader>
//                     <div>
//                         {panUrl && <img src={panUrl} alt="PAN Card" className="rounded-md object-cover" />}
//                     </div>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </div>
//         <div className="flex justify-center">
//             <AlertDialog onOpenChange={fetchImageUrls}>
//                 <AlertDialogTrigger asChild>
//                     <Button variant="outline" className="px-6 py-3">Show Aadhar</Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <div className="flex justify-between items-center">
//                             <AlertDialogTitle>Aadhar Card</AlertDialogTitle>
//                             <AlertDialogCancel>Done</AlertDialogCancel>
//                         </div>
//                     </AlertDialogHeader>
//                     <div>
//                         {aadharUrl && <img src={aadharUrl} alt="Aadhar Card" className="rounded-md object-cover" />}
//                     </div>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </div>
//         <div className="flex justify-center">
//             <AlertDialog onOpenChange={fetchImageUrls}>
//                 <AlertDialogTrigger asChild>
//                     <Button variant="outline" className="px-6 py-3">Show Photo</Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <div className="flex justify-between items-center">
//                             <AlertDialogTitle>Photo</AlertDialogTitle>
//                             <AlertDialogCancel>Done</AlertDialogCancel>
//                         </div>
//                     </AlertDialogHeader>
//                     <div>
//                         {photoUrl && <img src={photoUrl} alt="Photo" className="rounded-md object-cover" />}
//                     </div>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </div>
//         <div className="flex justify-center">
//             <AlertDialog onOpenChange={fetchImageUrls}>
//                 <AlertDialogTrigger asChild>
//                     <Button variant="outline" className="px-6 py-3">Show Resume</Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <div className="flex justify-between items-center">
//                             <AlertDialogTitle>Resume</AlertDialogTitle>
//                             <AlertDialogCancel>Done</AlertDialogCancel>
//                         </div>
//                     </AlertDialogHeader>
//                     <div>
//                         {resumeUrl && <img src={resumeUrl} alt="Resume" className="rounded-md object-cover" />}
//                     </div>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </div>
//     </div>
// </CardContent>
// </Card>

//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     </MainHeaderFrame>
// );
// };

// export default EmpDetailsPage;

