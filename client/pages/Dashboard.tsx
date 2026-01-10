import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Upload,
  TrendingUp,
  Download,
  DollarSign,
  Settings,
  Eye,
  Star,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 1200, downloads: 400 },
  { month: "Feb", revenue: 1900, downloads: 600 },
  { month: "Mar", revenue: 1600, downloads: 500 },
  { month: "Apr", revenue: 2300, downloads: 750 },
  { month: "May", revenue: 2800, downloads: 900 },
  { month: "Jun", revenue: 3200, downloads: 1100 },
];

const assetCategoryData = [
  { name: "3D Models", value: 45 },
  { name: "UI Design", value: 25 },
  { name: "Scripts", value: 20 },
  { name: "Animations", value: 10 },
];

const COLORS = ["#2563eb", "#7c3aed", "#ec4899", "#f59e0b"];

// Mock assets
const mockAssets = [
  {
    id: "1",
    name: "Premium UI Components",
    category: "UI Design",
    downloads: 1245,
    sales: 2890,
    rating: 4.8,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&h=80&fit=crop",
  },
  {
    id: "2",
    name: "3D Character Models",
    category: "3D Models",
    downloads: 856,
    sales: 1920,
    rating: 4.9,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6cb?w=80&h=80&fit=crop",
  },
  {
    id: "3",
    name: "Animation Pack Pro",
    category: "Animations",
    downloads: 432,
    sales: 1045,
    rating: 4.7,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1578926314433-ed0bbd21c5f7?w=80&h=80&fit=crop",
  },
  {
    id: "4",
    name: "Scripting Framework",
    category: "Scripts",
    downloads: 612,
    sales: 1560,
    rating: 4.6,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=80&h=80&fit=crop",
  },
];

interface DashboardStats {
  totalEarnings: number;
  totalDownloads: number;
  totalAssets: number;
  avgRating: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "assets" | "analytics">(
    "overview"
  );

  // Mock user data
  const stats: DashboardStats = {
    totalEarnings: 9415,
    totalDownloads: 3145,
    totalAssets: 4,
    avgRating: 4.75,
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "assets", label: "My Assets" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Creator! Manage your assets and track your success.
            </p>
          </div>
          <Link to="/upload">
            <Button className="gap-2">
              <Upload size={20} />
              Upload Asset
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total Earnings
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                    <DollarSign size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    ${stats.totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-400 mt-2">
                    ↑ 12% from last month
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total Downloads
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Download size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalDownloads.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-400 mt-2">
                    ↑ 8% from last month
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Published Assets
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalAssets}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Active on marketplace
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Avg. Rating
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                    <Star size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.avgRating}
                  </p>
                  <p className="text-xs text-yellow-400 mt-2">
                    From {3245} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">
                  Revenue & Downloads
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid #444",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: "#2563eb", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="downloads"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      dot={{ fill: "#7c3aed", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">
                  Assets by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={assetCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid #444",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-secondary/30 border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Recent Assets</h3>
                <Link to="#" className="text-primary hover:underline text-sm">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {mockAssets.slice(0, 3).map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {asset.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {asset.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {asset.downloads} downloads
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${asset.sales} sales
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-secondary rounded transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>Unpublish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === "assets" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                You have {mockAssets.length} published assets
              </p>
              <Link to="/upload">
                <Button size="sm">
                  <Upload size={16} />
                  New Asset
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {mockAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-secondary/30 border border-border rounded-lg p-6 hover:border-border/80 transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-24 h-24 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {asset.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {asset.category}
                        </p>
                        <div className="flex gap-6 mt-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Downloads</p>
                            <p className="font-semibold text-foreground">
                              {asset.downloads}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sales</p>
                            <p className="font-semibold text-foreground">
                              ${asset.sales}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-semibold text-foreground">
                              ⭐ {asset.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                        {asset.status}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>View Reviews</DropdownMenuItem>
                          <DropdownMenuItem>Unpublish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Downloads Over Time */}
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">
                  Downloads Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid #444",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="downloads"
                      fill="#2563eb"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Over Time */}
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-6">
                  Revenue Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid #444",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Performing Assets */}
            <div className="bg-secondary/30 border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-6">
                Top Performing Assets
              </h3>
              <div className="space-y-4">
                {mockAssets.map((asset, index) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {asset.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {asset.downloads} downloads
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      ${asset.sales}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
