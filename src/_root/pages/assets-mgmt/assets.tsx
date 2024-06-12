import MainHeaderFrame from '@/components/main-header-frame'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React, { useEffect } from 'react'
import { getAssetsData } from '@/lib/appwrite/api'
import { AssetsTable } from '@/components/assets-components/assets-table'
import { columns } from '@/components/assets-components/assets-column'
import { Assets } from '@/components/assets-components/assets-data/schema'
import { useNavigate } from 'react-router-dom'
// import { Button } from '@/components/ui/button'

const AssetMGMTPage = () => {
  
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

    const [data, setData] = React.useState<Assets[]>([]);

    React.useEffect(() => {
        const fetchAndMapAssetsData = async () => {
            try {
                const assetsData = await getAssetsData();
                // console.log(assetsData);
                if (assetsData) {
                    const mappedAssets = assetsData.map(assets => {
                        return {
                            id: assets.$id, // Use the employee ID field
                            AssetsID: assets.AssetsID.toString(), // Convert to string if needed
                            AssetsName: assets.AssetsName.trim(),
                            // JoinDate: new Date(assets.JoinDate), // Convert to Date object
                            AssetsStatus: assets.AssetsStatus.toString(),
                            AssetsType: assets.AssetsType.toString(),
                            AllocatedTo: assets.AllocatedTo.toString(),
                            AssetsRemarks: assets.AssetsRemarks,
                            AssetsValue: assets.AssetsValue,
                            label: assets.label // Adjust as necessary
                        };
                    });
                    setData(mappedAssets);
                    // console.log(mappedAssets);
                } else {
                    console.error('No employee data found.');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchAndMapAssetsData();
    }, []);

  return (
    <MainHeaderFrame>
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    {/* <CardTitle>Assets Overview</CardTitle> */}
                    <h2 className="text-2xl font-bold tracking-tight">Assets Overview</h2>
                    {/* <Button onClick={getAssetsData()}>Test</Button> */}
                </CardHeader>
                <CardContent>
                    <Separator />
                    <div className="py-3">
                        <AssetsTable columns={columns} data={data} />
                    </div>
                </CardContent>
            </Card>
        </div>
    </MainHeaderFrame>
  )
}

export default AssetMGMTPage