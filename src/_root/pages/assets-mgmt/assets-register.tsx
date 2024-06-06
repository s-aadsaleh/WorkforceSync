import MainHeaderFrame from '@/components/main-header-frame'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const AssetRegisterPage = () => {
  return (
    <MainHeaderFrame>
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Register Assets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Separator />
                </CardContent>
            </Card>
        </div>
    </MainHeaderFrame>
  )
}

export default AssetRegisterPage
