import MainHeaderFrame from "@/components/main-header-frame";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePunchIn } from '../../components/misc-components/punch-in';
import PunchInButton from '../../components/misc-components/punch-in-button';
import ElapsedTimeDisplay from '../../components/misc-components/elapsed-time';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart3, Database, PieChartIcon, ShieldCheck, TimerIcon } from "lucide-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TOTP } from "totp-generator";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { getTasks } from "@/lib/appwrite/api";

import EmployeeCards from "@/components/dash-components/EmployeeCards";
import AssetsPieChart from "@/components/dash-components/AssetsPieChart";
import CustomContentTreemap from "@/components/dash-components/CustomContentTreemap";
import SimpleBarChart from "@/components/dash-components/SimpleBarChart";

const COLORS = [
  '#4CAF50', // Green
  '#FF5722', // Deep Orange
  '#03A9F4', // Light Blue
  '#9C27B0', // Purple
  '#FFC107', // Amber
  '#00BCD4', // Cyan
  '#FF9800', // Orange
  '#8BC34A', // Light Green
  '#795548', // Brown
  '#2196F3', // Blue
  '#E91E63'  // Pink
];

export default function DashPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      navigate('/login');
    } else {
      navigate(window.location.pathname);
    }
  }, []);

  const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

  const [totp, setTotp] = useState('');
  const [progress, setProgress] = useState(0);
  const [taskData, setTaskData] = useState<{ [key: string]: any }[]>([]);
  const interval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const generateTotp = () => {
      const secretInput = import.meta.env.VITE_TOTP_SECRET;
      const { otp, expires } = TOTP.generate(secretInput);
      setTotp(otp);
  
      const remainingTime = expires - Date.now();
  
      if (interval.current) {
        clearTimeout(interval.current);
      }
  
      interval.current = setTimeout(() => {
        generateTotp();
        setProgress(0);
      }, remainingTime);
    };
  
    generateTotp();
  
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 30);
    }, 1000);
  
    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getTasks();
      if (tasks) {
        setTaskData(tasks);
      }
    };
    fetchData();
  }, []);

  const statusCounts: { [key: string]: { name: string, value: number, tasks: any[] } } = {};

  if (taskData) {
    taskData.forEach(task => {
      if (!statusCounts[task.Status]) {
        statusCounts[task.Status] = { name: task.Status, value: 0, tasks: [] };
      }
      statusCounts[task.Status].value += 1;
      statusCounts[task.Status].tasks.push(task.Title);
    });
  }

  const pieChartData = Object.values(statusCounts);
 
  return (
    <MainHeaderFrame>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
          <Card className="flex flex-col">
            <CardHeader className="pb-2 flex justify-between">
              <CardDescription className="flex gap-3">
                <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
              </CardDescription>
              <CardTitle className="text-4xl py-2 flex justify-between">
                <div className="flex gap-2" style={{ minWidth: '200px', maxWidth: '200px' }}>
                  <ElapsedTimeDisplay elapsedTime={timeElapsed} />
                </div>
                <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
              </CardTitle>
            </CardHeader>
          </Card>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="flex flex-col items-center">
                  <CardHeader className="pb-2 flex justify-between">
                    <CardDescription className="flex gap-3">
                      <ShieldCheck /> TOTP for Attendance
                    </CardDescription>
                    <CardTitle className="text-4xl py-2 flex justify-between items-center gap-4">
                      <div className="text-4xl font-bold" style={{ letterSpacing: '0.2rem' }}>{totp}</div>
                      <div className="progress-bar-container">
                        <CircularProgressbar
                          value={(progress / 30) * 100}
                          styles={buildStyles({
                            pathColor: 'red',
                            trailColor: '#d6d6d6',
                            strokeLinecap: 'butt',
                          })}
                          strokeWidth={5}
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>TOTP is valid for 30 seconds.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* This is the remianing space in the top row */}
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
          <EmployeeCards />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
          {/* Task Pie Chart Card */}
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardDescription className="flex gap-3">
                <PieChartIcon /> Status of Tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    innerRadius={80}
                    label={({ name, value }) => `${name} (${value})`}
                    animationBegin={0} // Start animation immediately
                    animationDuration={750} // Animation duration in milliseconds
                    animationEasing="linear" // Easing function for the animation
                  >
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    cursor={{ stroke: '#000', strokeWidth: 1 }} // Customize cursor style
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        const tasks = payload[0].payload.tasks;
                        const categoryName = payload[0].payload.name;
                        const categoryValue = payload[0].value;

                        const taskNames = tasks.map((task: string) => (
                          <span key={task}>
                            - {task}
                            <br /> {/* Add line break after each task */}
                          </span>
                        ));

                        return (
                          <div style={{ backgroundColor: '#cccccc', padding: '5px', borderRadius: '5px' }}>
                            <p style={{ color: '#000' }}>
                              <u><i><b>{categoryName}: {categoryValue} tasks</b></i></u> {/* Display italicized category name */}
                            </p>
                            <p style={{ color: '#000', width:'250px'}}>
                            {/* Display task names with line breaks */}
                            {taskNames}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Simple Bar Chart Card */}
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardDescription className="flex gap-3">
                <BarChart3 /> Employee Attendance Bar Chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
          {/* Files Tree Map Card */}
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <CardDescription className="flex gap-3">
                <Database /> Employee Attendance Bar Chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomContentTreemap />
            </CardContent>
          </Card>
          {/* Assets Pie Chart Card */}
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardDescription className="flex gap-3">
                <PieChartIcon /> Status of Assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssetsPieChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainHeaderFrame>
  );
}

