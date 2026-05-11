import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import Navbar from "../components/common/Navbar";
import {
  ActivityTimeline,
  AnalyticsChartCard,
  AnalyticsFilters,
  AnalyticsOverviewCard,
  RecentDeploymentsPanel,
  TopProjectsTable,
  UsageTrendChart,
} from "../components/analytics";
import { useAnalytics } from "../hooks/useAnalytics";
import SEOHeadManager from "../components/seo/SEOHeadManager";
import { ROUTES } from "../constants/routes";
import { FloatingActionButton, SkeletonCard } from "../components/ui";

const PIE_COLORS = ["#60a5fa", "#22d3ee", "#34d399", "#f59e0b", "#a78bfa"];

export default function Analytics() {
  const { filters, setFilters, isLoading, data } = useAnalytics();

  const updateFilter = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <SEOHeadManager
        title="Analytics"
        description="Workspace analytics for generations, deployments, exports, and activity trends."
        path={ROUTES.ANALYTICS}
      />
      <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl space-y-5 px-4 py-8">
        <div>
          <h1 className="text-3xl font-semibold text-white">Analytics & Insights</h1>
          <p className="mt-1 text-sm text-slate-300">Track generation, deployment, export, and workspace activity trends.</p>
        </div>

        <AnalyticsFilters filters={filters} onChange={updateFilter} />

        {isLoading || !data ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <AnalyticsOverviewCard label="Total Projects" value={data.overview.totalProjects} />
              <AnalyticsOverviewCard label="AI Generations" value={data.overview.totalAIGenerations} />
              <AnalyticsOverviewCard label="Deployments" value={data.overview.deploymentsCount} />
              <AnalyticsOverviewCard label="Exports" value={data.overview.totalExports} />
              <AnalyticsOverviewCard label="Screenshot Gen" value={data.overview.screenshotGenerations} />
              <AnalyticsOverviewCard label="Favorite Projects" value={data.overview.favoriteProjects} />
              <AnalyticsOverviewCard label="Version Checkpoints" value={data.overview.versionCheckpoints} />
              <AnalyticsOverviewCard label="Recent Activity" value={data.overview.recentActivityCounts} />
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <AnalyticsChartCard title="Usage Trends">
                  <UsageTrendChart data={data.trends} />
                </AnalyticsChartCard>
              </div>
              <div className="lg:col-span-4">
                <AnalyticsChartCard title="Usage Breakdown">
                  <div className="h-64 w-full">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={data.typeBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85}>
                          {data.typeBreakdown.map((entry, index) => (
                            <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </AnalyticsChartCard>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <TopProjectsTable projects={data.topProjects} />
              </div>
              <div className="lg:col-span-4">
                <RecentDeploymentsPanel deployments={data.recentDeployments} />
              </div>
              <div className="lg:col-span-4">
                <ActivityTimeline items={data.recentActivity} />
              </div>
            </div>
          </>
        )}
      </main>
      <FloatingActionButton label="Top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
    </>
  );
}
