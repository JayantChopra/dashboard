import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Deployment Successful",
    description: "acme-web deployed to production successfully",
    time: "2 minutes ago",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Build Warning",
    description: "dashboard-v2 has deprecation warnings in dependencies",
    time: "15 minutes ago",
    type: "warning",
    read: false,
  },
  {
    id: 3,
    title: "New Team Member",
    description: "Sarah Johnson joined your team",
    time: "1 hour ago",
    type: "info",
    read: true,
  },
  {
    id: 4,
    title: "Deployment Failed",
    description: "mobile-app deployment failed - check logs for details",
    time: "2 hours ago",
    type: "error",
    read: true,
  },
  {
    id: 5,
    title: "Usage Alert",
    description: "You've used 80% of your monthly bandwidth quota",
    time: "1 day ago",
    type: "warning",
    read: true,
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "error":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <Info className="h-5 w-5 text-blue-500" />
  }
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} unread</Badge>
            )}
          </div>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Mark all as read
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Stay updated on your projects and team activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
