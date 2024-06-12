import React, { useState, useEffect } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { listFilesInCloud } from "@/lib/appwrite/api";
import CustomizedContent from './CustomizedContent'; // Adjust the path as needed

const FilesTreeMap: React.FC = () => {
  const [files, setFiles] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesData = await listFilesInCloud() as any[] | null;
      if (filesData) {
        setFiles(filesData);
      }
    };
    fetchFiles();
  }, []);

  const groupFilesByType = (files: any[]): { name: string, value: number, color: string }[] => {
    const groupedFiles: { [key: string]: number } = {};
    const colorMap: { [key: string]: string } = {}; // Map to store unique colors for each category
  
    // Predefined array of colors
    // const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];
    const COLORS = [
      '#4CAF50', // Green
      '#FF5722', // Deep Orange
      '#03A9F4', // Light Blue
      '#F44336', // Red
      '#9C27B0', // Purple
      '#FFC107', // Amber
      '#00BCD4', // Cyan
      '#FF9800', // Orange
      '#8BC34A', // Light Green
      '#795548', // Brown
      '#2196F3', // Blue
      '#E91E63'  // Pink
    ];
    
    files.forEach((file, index) => {
      const extension = file.name.split('.').pop(); // Extract file extension
      if (extension) {
        if (groupedFiles[extension]) {
          groupedFiles[extension] += 1;
        } else {
          groupedFiles[extension] = 1;
          // Use a color from the predefined array based on the index
          colorMap[extension] = COLORS[index % COLORS.length];
        }
      }
    });
  
    // Convert object to array of objects
    return Object.keys(groupedFiles).map((extension) => ({
      name: extension,
      value: groupedFiles[extension],
      color: colorMap[extension], // Use the generated color for each category
    }));
  };
  
  const data: { name: string, value: number, color: string }[] = files ? groupFilesByType(files) : [];

  return (
    <ResponsiveContainer width="98%" height={300}>
      <Treemap
        width={200}
        height={100}
        data={data}
        dataKey="value"
        aspectRatio={10 / 3}
        stroke="#fff" 
        isAnimationActive={false} // Disable animation for better interaction
        content={<CustomizedContent />}
        
      >
        <Tooltip
          cursor={{ stroke: '#000', strokeWidth: 1 }} // Customize cursor style
          content={({ payload }) => {
            if (payload && payload[0]) {
              return (
                <div style={{ backgroundColor: '#fff', padding: '5px' }}>
                  <p style={{ color: '#000' }}>{`${payload[0].payload.name}: ${payload[0].value} files`}</p> {/* Change text color to black */}
                </div>
              );
            }
            return null;
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default FilesTreeMap;
