import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { fetchAttendanceRecords, getEmpNamesData } from "@/lib/appwrite/api";

type AttendanceRecord = {
    attendanceDateTime: string;
    empID: string;
    name: string;
};

type Employee = {
    EmpName: string;
};

const SimpleBarChart: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const records = await fetchAttendanceRecords() as AttendanceRecord[] | null;
            const empNames = await getEmpNamesData() as Employee[] | null;

            if (records && empNames) {
                const employeeNames = empNames.map(emp => emp.EmpName);

                const groupedData: { [key: string]: { date: string; present: number; absent: number; presentNames: string[]; absentNames: string[] } } = {};

                records.forEach(record => {
                    const date = new Date(record.attendanceDateTime).toISOString().split('T')[0];
                    if (!groupedData[date]) {
                        groupedData[date] = { date, present: 0, absent: 0, presentNames: [], absentNames: [] };
                    }
                    groupedData[date].present += 1;
                    groupedData[date].presentNames.push(record.name);
                });

                const pastSixDays = Array.from({ length: 6 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    return date.toISOString().split('T')[0];
                });

                const finalData = pastSixDays.map(date => {
                    const dayData = groupedData[date] || { date, present: 0, absent: 0, presentNames: [], absentNames: [] };
                    dayData.absent = employeeNames.length - dayData.present;
                    dayData.absentNames = employeeNames.filter(name => !dayData.presentNames.includes(name));
                    return dayData;
                }).reverse(); // To go from 6 days ago to today

                setData(finalData);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={({ payload }) => {
                    if (payload && payload.length > 0) {
                        const { presentNames, absentNames, present, absent } = payload[0].payload;
                        const presentDisplayNames = presentNames.length > 10 ? presentNames.slice(0, 10).join(', ') + ' ...' : presentNames.join(', ');
                        const absentDisplayNames = absentNames.length > 10 ? absentNames.slice(0, 10).join(', ') + ' ...' : absentNames.join(', ');
                        return (
                            <div style={{ 
                                backgroundColor: 'white', 
                                padding: '5px', 
                                border: '1px solid #ccc', 
                                borderRadius: '5px', 
                                maxWidth: '300px' 
                            }}>
                                <p style={{ fontWeight: 'bold', color: '#00bcd4', fontSize: '14px' }}>Present ({present}): {presentDisplayNames}</p>
                                <p style={{ fontWeight: 'bold', color: '#f44336', fontSize: '14px' }}>Absent ({absent}): {absentDisplayNames}</p>
                            </div>
                        );
                    }
                    return null;
                }} />
                <Legend />
                <Bar dataKey="absent" fill="#f44336" name="Absent" />
                <Bar dataKey="present" fill="#00bcd4 " name="Present" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SimpleBarChart;
