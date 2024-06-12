import { useState, useRef, useEffect } from 'react';
import MainHeaderFrame from '@/components/main-header-frame';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toaster, toast } from 'sonner';
import { uploadToCloudStorageDB, listFilesInCloud, handleCloudDelete, renameFileInCloud } from '@/lib/appwrite/api';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
// import { File, FileArchive, FileAudio2, FileQuestion, FileText, FileType2, FileVideo2 } from 'lucide-react';

const FileStoragePage = () => {

  // Authentication check
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<Array<{ $id: string; name: string }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const fetchedFiles = await listFilesInCloud();
      if (fetchedFiles) {
        setFiles(fetchedFiles);
      }
    };
    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const fileNameParts = selectedFile.name.split('.');
    const extension = fileNameParts.pop();
    const baseName = fileNameParts.join('.');

    const newName = window.prompt('Enter a name for the file (leave blank to use file name)', baseName) || baseName;
    const fileName = `${newName}.${extension}`;

    setUploading(true);
    try {
      const fileId = await uploadToCloudStorageDB(selectedFile, fileName);
      if (fileId) {
        console.log('File uploaded successfully. ID:', fileId);
        toast(`File "${fileName}" uploaded successfully.`);
        setSelectedFile(null);
        const fetchedFiles = await listFilesInCloud();
        if (fetchedFiles) {
          setFiles(fetchedFiles);
        }
      } else {
        console.error('Failed to upload file to cloud storage');
        toast('Failed to upload file to cloud storage');
      }
    } catch (error) {
      console.error('Error uploading file to cloud storage:', error);
      toast(`Error uploading file "${fileName}".`);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      window.open(`https://cloud.appwrite.io/v1/storage/buckets/6658db9e0036b652391f/files/${fileId}/view?project=workforcesync&mode=admin`, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast('Error downloading file');
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await handleCloudDelete(fileId);
      const fetchedFiles = await listFilesInCloud();
      if (fetchedFiles) {
        setFiles(fetchedFiles);
      }
      toast(`File deleted successfully.`);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast('Error deleting file');
    }
  };

  

  // Function to handle renaming of the file
  const handleRename = async (fileId: string, fileName: string) => {
    try {
      // Split the file name into base name and extension
      const fileNameParts = fileName.split('.');
      const extension = fileNameParts.pop();
      const baseName = fileNameParts.join('.');

      // Prompt the user for a new base name
      const newName = window.prompt('Enter a new name for the file (leave blank to cancel)', baseName);
      
      // If the user cancels or provides no input, return early
      if (newName === null || newName.trim() === '') {
        return;
      }

      // Concatenate the new base name with the original extension
      const newFileName = `${newName}.${extension}`;

      // Perform the renaming operation
      await renameFileInCloud(fileId, newFileName);

      // Update the file name in the local state
      setFiles(prevFiles => prevFiles.map(file => {
        if (file.$id === fileId) {
          return { ...file, name: newFileName };
        }
        return file;
      }));

      // Show toast message indicating successful renaming
      toast(`File "${fileName}" renamed to "${newFileName}" successfully.`);
    } catch (error) {
      console.error('Error renaming file:', error);
      toast('Error renaming file');
    }
  };

  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  };
  
  // const isPdfFile = (fileName: string): boolean => {
  //   const extension = fileName.split('.').pop()?.toLowerCase();
  //   return extension === 'pdf';
  // };
  
  // const isVideoFile = (fileName: string): boolean => {
  //   const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
  //   const extension = fileName.split('.').pop()?.toLowerCase();
  //   return extension ? videoExtensions.includes(extension) : false;
  // };
  
  // const isAudioFile = (fileName: string): boolean => {
  //   const audioExtensions = ['mp3', 'wav', 'aac'];
  //   const extension = fileName.split('.').pop()?.toLowerCase();
  //   return extension ? audioExtensions.includes(extension) : false;
  // };
  
  // const isWordFile = (fileName: string): boolean => {
  //   const wordExtensions = ['doc', 'docx'];
  //   const extension = fileName.split('.').pop()?.toLowerCase();
  //   return extension ? wordExtensions.includes(extension) : false;
  // };
  
  // const isTextFile = (fileName: string): boolean => {
  //   const extension = fileName.split('.').pop()?.toLowerCase();
  //   return extension === 'txt';
  // };

  // const isArchiveFile = (fileName: string): boolean => {
  //   const archiveExtensions = ['zip', 'rar', 'tar', '7z', 'gz'];
  //   const extension = fileName.split('.').pop()?.toLowerCase();
  //   return extension ? archiveExtensions.includes(extension) : false;
  // };

  return (
    <MainHeaderFrame>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>File Storage</CardTitle>
            {/* <Button onClick={getPreviewInCloud}>test</Button> */}
            <div
              className={`flex items-center justify-between ${dragging ? 'bg-gray-100' : ''}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className="flex items-center" onClick={handleFileInputClick}>
                <CardDescription>
                  {selectedFile ? `Selected file: ${selectedFile.name}` : (dragging ? 'Drop file here' : 'Drag & Drop or Click to Upload')}
                </CardDescription>
              </div>
              <div className="flex">
                <div className="px-2">
                  {selectedFile && (
                    <Button onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                </div>
                <div className="px-2">
                  <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                    Upload File
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="px-3">
        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <Card key={file.$id} className="flex flex-col items-center justify-center p-2 shadow-lg">
              <div className="w-full h-24 sm:h-32 bg-[#eceff1] flex items-center justify-center overflow-hidden">
              {/* <div className="w-full h-24 sm:h-32 bg-[rgb(236, 239, 241)] flex items-center justify-center overflow-hidden"> */}
                {
                  isImageFile(file.name) ? (
                    <img
                      src={`https://cloud.appwrite.io/v1/storage/buckets/6658db9e0036b652391f/files/${file.$id}/view?project=workforcesync&mode=admin`}
                      alt={file.name}
                      className="w-full h-auto max-h-32 object-contain"
                    />
                  // ) : isPdfFile(file.name) ? (
                  //   <div className="flex flex-col items-center">
                  //     <File style={{ color: 'black' }}/>
                  //     <p className="text-sm sm:text-base" style={{ color: 'black' }}>PDF preview not available</p>
                  //   </div>
                  // ) : isVideoFile(file.name) ? (
                  //   // <div className="flex flex-col items-center">
                  //   //   <FileVideo2 style={{ color: 'black' }}/>
                  //   //   <p className="text-sm sm:text-base" style={{ color: 'black' }}>Video preview not available</p>
                  //   // </div>
                  //   <img
                  //     src={`https://cloud.appwrite.io/v1/storage/buckets/6658db9e0036b652391f/files/${file.$id}/preview?project=workforcesync`}
                  //     // src={`https://cloud.appwrite.io/v1/storage/buckets/6658db9e0036b652391f/files/${file.$id}/view?project=workforcesync&mode=admin`}
                  //     alt={file.name}
                  //     className="w-full h-auto max-h-32 object-contain"
                  //   />
                  // ) : isAudioFile(file.name) ? (
                  //   <div className="flex flex-col items-center">
                  //     <FileAudio2 style={{ color: 'black' }}/>
                  //     <p className="text-sm sm:text-base" style={{ color: 'black' }}>Audio preview not available</p>
                  //   </div>
                  // ) : isWordFile(file.name) ? (
                  //   <div className="flex flex-col items-center">
                  //     <FileType2 style={{ color: 'black' }}/>
                  //     <p className="text-sm sm:text-base" style={{ color: 'black' }}>Word file preview not available</p>
                  //   </div>
                  // ) : isTextFile(file.name) ? (
                  //   <div className="flex flex-col items-center">
                  //     <FileText style={{ color: 'black' }}/>
                  //     <p className="text-sm sm:text-base" style={{ color: 'black' }}>Text file preview not available</p>
                  //   </div>
                  // ) : isArchiveFile(file.name) ? (
                  //   <div className="flex flex-col items-center">
                  //     <FileArchive style={{ color: 'black' }}/>
                  //     <p className="text-sm sm:text-base" style={{ color: 'black' }}>Archive file preview not available</p>
                  //   </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <img
                        src={`https://cloud.appwrite.io/v1/storage/buckets/6658db9e0036b652391f/files/${file.$id}/preview?project=workforcesync`}
                        // src={`https://cloud.appwrite.io/v1/storage/buckets/6658db9e0036b652391f/files/${file.$id}/view?project=workforcesync&mode=admin`}
                        alt={file.name}
                        className="w-full h-auto max-h-32 object-contain"
                      />
                    </div>
                  )
                }
              </div>
              <div className="mt-2 text-center flex items-center justify-between">
                <p className="font-medium text-sm sm:text-base flex-grow">{file.name}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                      
                      <DotsHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" >
                    <DropdownMenuItem onClick={() => handleDownload(file.$id)}>Download</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(file.$id)}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRename(file.$id, file.name)}>Rename</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Toaster />
    </MainHeaderFrame>
  );
};

export default FileStoragePage;