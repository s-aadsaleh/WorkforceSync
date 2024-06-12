import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { listFilesInCloud } from '@/lib/appwrite/api';

const TreemapComponent = () => {
  const [files, setFiles] = useState<{ $id: string; name: string }[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listFilesInCloud();
      if (data) {
        setFiles(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (files && files.length > 0) {
      drawTreemap();
    }
  }, [files]);

  const drawTreemap = () => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#treemap-container')
                  .append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    if (files) {
      // Extract file types from file names
      const fileTypes = files.map(file => file.name.split('.').pop());

      // Count occurrences of each file type
      const groupedFiles: { [key: string]: number } = {};
      fileTypes.forEach(fileType => {
        if (fileType !== undefined) {
          groupedFiles[fileType] = (groupedFiles[fileType] || 0) + 1;
        }
      });

      // Convert file type counts to hierarchical data
      const root = d3.hierarchy({ name: 'root', children: Object.entries(groupedFiles).map(([name, value]) => ({ name, value, children: [] }))}
                     .sum((d: { value: number }) => d.value))

      const treemapLayout = d3.treemap();
      treemapLayout.size([width, height])
                     .padding(1)
                     .round(true);

      const treemapRoot = treemapLayout(root);

      svg.selectAll('rect')
         .data(treemapRoot.leaves())
         .enter()
         .append('rect')
         .attr('x', d => (d.x0 || 0))
         .attr('y', d => (d.y0 || 0))
         .attr('width', d => ((d.x1 || 0) - (d.x0 || 0)))
         .attr('height', d => ((d.y1 || 0) - (d.y0 || 0)))
         .attr('fill', 'steelblue');

      svg.selectAll('text')
         .data(treemapRoot.leaves())
         .enter()
         .append('text')
         .attr('x', d => ((d.x0 || 0) + 5))
         .attr('y', d => ((d.y0 || 0) + 20))
         .text(d => `${(d.data as { name: string; value: number }).name} (${(d.data as { name: string; value: number }).value})`)
         .attr('font-size', '12px')
         .attr('fill', 'white');
    }
  };

  return <div id="treemap-container"></div>;
};

export default TreemapComponent;
