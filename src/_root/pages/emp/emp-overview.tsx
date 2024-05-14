import MainHeaderFrame from '@/components/main-header-frame';


const EmpOverviewPage = () => {
    return (
        <MainHeaderFrame>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here's a list of your tasks for this month!
                        </p>
                    </div>
                </div>
            </div>
        </MainHeaderFrame>
    );
}

export default EmpOverviewPage