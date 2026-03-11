import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, GitBranch, Clock, Search, Plus } from "lucide-react"

const projects = [
  {
    name: "acme-web",
    url: "acme-web.vercel.app",
    framework: "Next.js",
    status: "Ready",
    lastDeployed: "2 minutes ago",
    branch: "main",
  },
  {
    name: "dashboard-v2",
    url: "dashboard.acme.com",
    framework: "React",
    status: "Building",
    lastDeployed: "5 minutes ago",
    branch: "dev",
  },
  {
    name: "api-gateway",
    url: "api.acme.com",
    framework: "Node.js",
    status: "Ready",
    lastDeployed: "12 minutes ago",
    branch: "main",
  },
  {
    name: "mobile-app",
    url: "app.acme.com",
    framework: "Next.js",
    status: "Error",
    lastDeployed: "1 hour ago",
    branch: "staging",
  },
  {
    name: "blog-platform",
    url: "blog.acme.com",
    framework: "Next.js",
    status: "Ready",
    lastDeployed: "3 hours ago",
    branch: "main",
  },
  {
    name: "e-commerce",
    url: "shop.acme.com",
    framework: "Next.js",
    status: "Ready",
    lastDeployed: "1 day ago",
    branch: "main",
  },
]

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              aria-label="Search projects"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {project.url}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      project.status === "Ready"
                        ? "default"
                        : project.status === "Building"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Framework</span>
                    <span className="font-medium">{project.framework}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      Branch
                    </span>
                    <span className="font-medium">{project.branch}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last deployed
                    </span>
                    <span className="font-medium">{project.lastDeployed}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Visit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
