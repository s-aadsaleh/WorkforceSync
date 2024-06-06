import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Toaster, toast } from "sonner"

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Label } from "../ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"
import { addAsset, getAssetsData, getEmpNamesData, updateAssetData } from "@/lib/appwrite/api"

interface AssetsTableToolbarProps<TData> {
  table: Table<TData>
}

export function AssetsTableToolbar<TData>({
  table,
}: AssetsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [employeeNames, setEmployeeNames] = useState<string[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  useEffect(() => {
      const fetchEmployeeNames = async () => {
        try {
          const names = await getEmpNamesData();
          if (names) {
            setEmployeeNames(names.map(emp => emp.EmpName));
          }
        } catch (error) {
          console.error('Error fetching employee names:', error);
        }
      };

      fetchEmployeeNames();
  }, []);

  const handleAddAsset = async () => {
      const assetsId = (document.getElementById('assetsId') as HTMLInputElement)?.value;
      const assetsNameValue = (document.getElementById('assetsName') as HTMLInputElement)?.value;
      const assetsTypeValue = (document.getElementById('assetsType') as HTMLInputElement)?.value;
      const assetsValueValue = (document.getElementById('assetsValue') as HTMLInputElement)?.value;
      const assetsRemarksValue = (document.getElementById('assetsRemarks') as HTMLInputElement)?.value;

      const assetData = {
          AssetsID: assetsId,
          AssetsName: assetsNameValue,
          AssetsStatus: selectedStatus,
          AssetsType: assetsTypeValue,
          AssetsValue: assetsValueValue,
          AllocatedTo: selectedEmployee,
          AssetsRemarks: assetsRemarksValue,
      };

      console.log(assetData);
      try {
          const response = await addAsset(assetData); // Call the addAsset function with the asset data
          if (response) {
            // Asset added successfully
            console.log('Asset added successfully:', response);
            toast("Asset added successfully."); // Display the success toast message
            setTimeout(() => {
              window.location.assign(window.location.href); // Reload the page after a short delay
            }, 500); // Delay of 500 milliseconds (0.5 seconds)
          } else {
            // Handle the case where the asset was not added successfully
            console.error('Error adding asset: Asset not added');
            toast("Uh oh Something went wrong. Asset not added.");
          }
      } catch (error) {
          // Handle any errors that occur during the process
          console.error('Error adding asset:', error);
      }
  };

  interface Asset {
    id: string;
    AssetsID: string;
    AssetsName: string;
    AssetsStatus: string;
    AssetsType: string;
    AllocatedTo: string;
    AssetsRemarks: string | null;
    AssetsValue: string | null;
    label: string;
  }

  const [data, setData] = useState<Asset[]>([]);
  const [assetIdInput, setAssetIdInput] = useState<string>('');
  const [assetsValue, setAssetsValue] = useState<string>('');
  const [assetsRemarks, setAssetsRemarks] = useState<string>('');

  useEffect(() => {
    const fetchAndMapAssetsData = async () => {
      try {
        const assetsData = await getAssetsData();
        if (assetsData) {
          const mappedAssets = assetsData.map((assets: any) => {
            return {
              id: assets.$id,
              AssetsID: assets.AssetsID.toString(),
              AssetsName: assets.AssetsName.trim(),
              AssetsStatus: assets.AssetsStatus.toString(),
              AssetsType: assets.AssetsType.toString(),
              AllocatedTo: assets.AllocatedTo.toString(),
              AssetsRemarks: assets.AssetsRemarks,
              AssetsValue: assets.AssetsValue,
              label: assets.label
            };
          });
          setData(mappedAssets);
        } else {
          console.error('No asset data found.');
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };
    fetchAndMapAssetsData();
  }, []);

  const handleSubmit = async () => {
    const asset = data.find(a => a.AssetsID === assetIdInput);
    if (asset) {
      const updatedData: any = {
        AssetsStatus: selectedStatus,
        AllocatedTo: "-"
      };

      if (assetsValue) {
        updatedData.AssetsValue = assetsValue;
      } else {
        updatedData.AssetsValue = asset.AssetsValue;
      }

      if (assetsRemarks) {
        updatedData.AssetsRemarks = assetsRemarks;
      } else {
        updatedData.AssetsRemarks = asset.AssetsRemarks;
      }

      console.log('Updating asset with ID:', asset.id); // Log the asset ID
      console.log('Updated data:', updatedData); // Log the updated data
      const response = await updateAssetData(asset.id, updatedData);
      if (response) {
        console.log('Asset updated successfully:', response);
        toast(`Asset updated successfully.`);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } else {
      console.error('Asset ID not found.');
      toast(`Asset ID not found.`);
    }
  };

  const handleSubmitAllocation = async () => {
    const asset = data.find(a => a.AssetsID === assetIdInput);
    if (asset) {
      const updatedData: any = {
        AssetsStatus: "Allocated",
        AllocatedTo: selectedEmployee,
        AssetsRemarks: assetsRemarks
      };

      console.log('Allocating asset with ID:', asset.id); // Log the asset ID
      console.log('Updated data:', updatedData); // Log the updated data
      const response = await updateAssetData(asset.id, updatedData);
      if (response) {
        console.log('Asset allocated successfully:', response);
        toast(`Asset allocated successfully.`);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } else {
      console.error('Asset ID not found.');
      toast(`Asset ID not found.`);
    }
  };


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter assets by name..."
          value={(table.getColumn("AssetsName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("AssetsName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2 px-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Register</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Register an Asset</SheetTitle>
              <SheetDescription>
                Use the form below to register an asset.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Asset ID
                </Label>
                <Input id="assetsId" placeholder="Type ID Here" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Asset Name
                </Label>
                <Input id="assetsName" placeholder="Type Name Here" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">
          Allocated to
        </Label>
        <Select
          value={selectedEmployee}
          onValueChange={(value) => setSelectedEmployee(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Employee" />
          </SelectTrigger>
          <SelectContent>
            {employeeNames.map((name, index) => (
              <SelectItem key={index} value={name}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">
          Status
        </Label>
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Allocated">Allocated</SelectItem>
          </SelectContent>
        </Select>
      </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Asset Type
                </Label>
                <Input id="assetsType" placeholder="Asset Type Here" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Asset Value
                </Label>
                <Input id="assetsValue" placeholder="Type Value Here" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Remarks
                </Label>
                <Input id="assetsRemarks" placeholder="Remarks" className="col-span-3 h-[75px]" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleAddAsset}>Save Asset</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Allocate</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Allocate an Asset</SheetTitle>
              <SheetDescription>
                Use the form below to allocate an asset.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Asset ID</Label>
                <Input
                  id="assetId"
                  placeholder="Type ID Here"
                  className="col-span-3"
                  value={assetIdInput}
                  onChange={(e) => setAssetIdInput(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Allocated to
                </Label>
                <Select
                  value={selectedEmployee}
                  onValueChange={(value) => setSelectedEmployee(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeNames.map((name, index) => (
                      <SelectItem key={index} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Remarks
                </Label>
                <Input id="assetsRemarks" placeholder="Remarks" className="col-span-3 h-[75px]" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleSubmitAllocation}>
                  Allocate Asset
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex px-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Return</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Return an Asset</SheetTitle>
              <SheetDescription>
                Use the form below to return an asset.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Asset ID</Label>
                <Input
                  id="assetId"
                  placeholder="Type ID Here"
                  className="col-span-3"
                  value={assetIdInput}
                  onChange={(e) => setAssetIdInput(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status on Return</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
                    <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                    <SelectItem value="Under Repair">Under Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Asset Value</Label>
                <Input
                  id="assetsValue"
                  placeholder="Change value if needed"
                  className="col-span-3"
                  value={assetsValue}
                  onChange={(e) => setAssetsValue(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Remarks</Label>
                <Input
                  id="assetsRemarks"
                  placeholder="Add remarks after inspection"
                  className="col-span-3 h-[75px]"
                  value={assetsRemarks}
                  onChange={(e) => setAssetsRemarks(e.target.value)}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleSubmit}>
                  Save Asset
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <Toaster />
    </div>
  )
}