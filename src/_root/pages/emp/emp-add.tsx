import MainHeaderFrame from '@/components/main-header-frame';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { addEmployee } from '@/lib/appwrite/api'; // Import the updated addEmployee function

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';




const EmpAddPage = () => {
    const [empId, setEmpId] = useState('');
    const [empName, setEmpName] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [status, setStatus] = useState('');
    const [empPNumber, setEmpPNumber] = useState('');
    const [empEmail, setEmpEmail] = useState('');
    const [dob, setDob] = useState('');
    const [position, setPosition] = useState('');
    const [education, setEducation] = useState('');
    const [address, setAddress] = useState('');
    const [emergency, setEmergency] = useState('');
    const [panFile, setPanFile] = useState<File | null>(null);
    const [aadharFile, setAadharFile] = useState<File | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    // const [miscFile, setMiscFile] = useState<File | null>(null);
    
    const handleSubmit = async () => {
        const empData = {
            'EmpID': empId,
            'EmpName': empName,
            'JoinDate': new Date(joinDate),
            'Status': status,
            'EmpPNumber': empPNumber,
            'EmpEmail': empEmail,
            'DOB': new Date(dob),
            'CurrentPosition': position,
            'Education': education,
            'Address': address,
            'EmergencyContact': emergency,
        };

        const fileData = {
            'PAN': panFile,
            'Aadhar': aadharFile,
            'Photo': photoFile,
            'Resume': resumeFile,
            // 'Misc': miscFile,
        };

        // try {
        //     await addEmployee(empData, fileData);
        //     console.log('Employee added successfully');
        //     toast("Employee added successfully"); // Display the success toast message
        //     // Reset form fields
        //     setEmpId('');
        //     setEmpName('');
        //     setJoinDate('');
        //     setStatus('');
        //     setEmpPNumber('');
        //     setEmpEmail('');
        //     setDob('');
        //     setPosition('');
        //     setEducation('');
        //     setAddress('');
        //     setEmergency('');
        //     setPanFile(null);
        //     setAadharFile(null);
        //     setPhotoFile(null);
        //     setResumeFile(null);
        //     // setMiscFile(null);
        // } catch (error: any) {
        //     console.error('Error adding employee:', error);
        //     toast("Uh oh! Something went wrong. Employee not added. Error: " + error.message); // Display the error message in the toast
        // }
        const result = await addEmployee(empData, fileData);

        if (result) {
            console.log('Employee added successfully');
            toast("Employee added successfully"); // Display the success toast message
            // Reset form fields
            setEmpId('');
            setEmpName('');
            setJoinDate('');
            setStatus('');
            setEmpPNumber('');
            setEmpEmail('');
            setDob('');
            setPosition('');
            setEducation('');
            setAddress('');
            setEmergency('');
            setPanFile(null);
            setAadharFile(null);
            setPhotoFile(null);
            setResumeFile(null);
            // setMiscFile(null);
        } else {
            const error = new Error('Employee not added successfully');
            console.error('Error adding employee:', error);
            toast("Uh oh! Something went wrong. Employee not added.");
        }
        
    };

    return (
        <MainHeaderFrame>
            <div className="flex justify-center h-full">
                <div className="w-full px-8">
                    <div className="flex justify-center">
                        <div className="w-1/4"></div> {/* Spacer */}
                        {/* Cards Section */}
                        <div className="flex-grow max-w-md " >
                            {/* Card for Employee Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Employee Information</CardTitle>
                                    <CardDescription>Enter the employee details</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="empId">Employee ID</Label>
                                            <div className="py-1"/>
                                            <Input id="empId" type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="empName">Employee Name</Label>
                                            <div className="py-1"/>
                                            <Input id="empName" type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="joinDate">Join Date</Label>
                                            <div className="py-1"/>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full">
                                                        <CalendarIcon className="h-5 w-5 mr-2" />
                                                        {joinDate ? format(joinDate, "PPP") : "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar mode="single" selected={joinDate} onSelect={setJoinDate} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div>
                                            <Label htmlFor="dob">Date of Birth</Label>
                                            <div className="py-1"/>
                                            {/* <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full">
                                                        <CalendarIcon className="h-5 w-5 mr-2" />
                                                        {dob ? format(dob, "PPP") : "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar mode="single" selected={dob} onSelect={setDob} initialFocus />
                                                </PopoverContent>
                                            </Popover> */}
                                            <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="empPNumber">Phone Number</Label>
                                            <div className="py-1"/>
                                            <Input id="empPNumber" type="tel" value={empPNumber} onChange={(e) => setEmpPNumber(e.target.value)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="empEmail">Email</Label>
                                            <div className="py-1"/>
                                            <Input id="empEmail" type="email" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} />
                                        </div>
                                        {/* <div>
                                            <Label htmlFor="status">Status</Label>
                                            <div className="py-1"/>
                                            <Input id="status" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                                        </div> */}
                                        <div>
                                            <Label>Status</Label>
                                            <div className="py-1"/>
                                            <Select
                                            value={status}
                                            onValueChange={(value) => setStatus(value)}
                                            >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Probation">Probation</SelectItem>
                                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                                <SelectItem value="Contract">Contract</SelectItem>
                                                <SelectItem value="Trainee">Trainee</SelectItem>
                                                <SelectItem value="Intern">Intern</SelectItem>
                                            </SelectContent>
                                            </Select>
                                            {/* <button onClick={() => console.log(selectedStatus)}>
                                            Log Selected Status
                                            </button> */}
                                        </div>
                                        <div>
                                            <Label htmlFor="position">Current Position</Label>
                                            <div className="py-1"/>
                                            <Input id="position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="education">Education</Label>
                                            <div className="py-1"/>
                                            <Textarea id="education" value={education} placeholder="Enter the educational background here" onChange={(e) => setEducation(e.target.value)} />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="address">Address</Label>
                                            <div className="py-1"/>
                                            <Textarea id="address" value={address} placeholder="Enter the current residential address here" onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="emergency">Emergency Contact</Label>
                                            <div className="py-1"/>
                                            <Textarea id="emergency" value={emergency} placeholder="Enter the emergency contact details here" onChange={(e) => setEmergency(e.target.value)} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-8"></div>
                        <div className="flex-grow max-w-md">
                            {/* Card for File Uploads */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Files</CardTitle>
                                    <CardDescription>Upload employee documents</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-7 px-2">
                                        <div>
                                            <Label htmlFor="pan">PAN</Label>
                                            <div className="py-1"/>
                                            <Input id="pan" type="file" onChange={(e) => setPanFile(e.target.files?.[0] || null)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="aadhar">Aadhar</Label>
                                            <div className="py-1"/>
                                            <Input id="aadhar" type="file" onChange={(e) => setAadharFile(e.target.files?.[0] || null)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="photo">Photo</Label>
                                            <div className="py-1"/>
                                            <Input id="photo" type="file" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                                        </div>
                                        <div>
                                            <Label htmlFor="resume">Resume</Label>
                                            <div className="py-1"/>
                                            <Input id="resume" type="file" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
                                        </div>
                                    </div>


                                <div className="flex justify-center pt-10">
                                    <Button onClick={handleSubmit} size="sm" className="w-3/4" >Add Employee</Button>
                                </div>

                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-1/4"></div> {/* Spacer */}
                    </div>
                </div>
            </div>
            <Toaster />
        </MainHeaderFrame>
    );
}

export default EmpAddPage;