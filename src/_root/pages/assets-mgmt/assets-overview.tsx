import MainHeaderFrame from '@/components/main-header-frame'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const AssetOverviewPage = () => {
  return (
    <MainHeaderFrame>
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Asset Mangement</CardTitle>
                </CardHeader>
                <CardContent>
                    <Separator />
                    <div className="py-3">
                        <div className="flex flex-1 items-center space-x-2">
                            <Button disabled>
                                Overview
                            </Button>
                            <Button asChild>
                                <Link to="/assets/register">Register</Link>
                            </Button>
                        </div>
                        {/* ACTUAL CONTENTS */}
                        <div className="p-2 md:p-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Assets Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </MainHeaderFrame>
  )
}

export default AssetOverviewPage