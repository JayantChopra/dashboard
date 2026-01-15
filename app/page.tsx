import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Activity, Users, CreditCard, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Subscriptions",
    value: "+2,350",
    change: "+180.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19%",
    trend: "up",
    icon: CreditCard,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201",
    trend: "up",
    icon: Activity,
  },
]

const recentDeployments = [
  {
    project: "acme-web",
    status: "Ready",
    branch: "main",
    commit: "Update landing page",
    time: "2m ago",
  },
  {
    project: "dashboard-v2",
    status: "Building",
    branch: "dev",
    commit: "Add new charts",
    time: "5m ago",
  },
  {
    project: "api-gateway",
    status: "Ready",
    branch: "main",
    commit: "Fix authentication",
    time: "12m ago",
  },
  {
    project: "mobile-app",
    status: "Error",
    branch: "staging",
    commit: "Update dependencies",
    time: "1h ago",
  },
]

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  {" from last month"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Deployments */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Deployments</CardTitle>
              <CardDescription>
                Latest deployment activity across your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeployments.map((deployment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {deployment.project}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {deployment.commit}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          deployment.status === "Ready"
                            ? "default"
                            : deployment.status === "Building"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {deployment.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {deployment.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Commonly used actions and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  +
                </div>
                <div>
                  <p className="font-medium">New Project</p>
                  <p className="text-xs text-muted-foreground">
                    Deploy a new project from Git
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">View Analytics</p>
                  <p className="text-xs text-muted-foreground">
                    Check your site performance
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Team Settings</p>
                  <p className="text-xs text-muted-foreground">
                    Manage team members and permissions
                  </p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
