import MainHeaderFrame from '@/components/main-header-frame'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const AssetMGMTPage = () => {
  return (
    <MainHeaderFrame>
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Assets Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <Separator />
                </CardContent>
            </Card>
        </div>
    </MainHeaderFrame>
  )
}

export default AssetMGMTPage