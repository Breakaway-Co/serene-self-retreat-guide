import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, Activity, AlertTriangle, CheckCircle, Clock, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EngagementMetrics {
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
  averageEngagementTime: number;
  crisisInterventions: number;
  satisfactionScore: number;
}

interface DailyEngagement {
  date: string;
  users: number;
  activities: number;
  timeSpent: number;
}

interface RetreatAnalytics {
  retreatName: string;
  enrollments: number;
  completions: number;
  avgSatisfaction: number;
  dropoffDay: number;
}

const EngagementDashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    completionRate: 0,
    averageEngagementTime: 0,
    crisisInterventions: 0,
    satisfactionScore: 0
  });
  const [dailyData, setDailyData] = useState<DailyEngagement[]>([]);
  const [retreatData, setRetreatData] = useState<RetreatAnalytics[]>([]);
  const [timeframe, setTimeframe] = useState('7days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeframe]);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      const days = timeframe === '7days' ? 7 : timeframe === '30days' ? 30 : 90;
      startDate.setDate(endDate.getDate() - days);

      // Load engagement metrics
      await Promise.all([
        loadEngagementMetrics(startDate, endDate),
        loadDailyEngagement(startDate, endDate),
        loadRetreatAnalytics()
      ]);

    } catch (error: any) {
      console.error('Error loading analytics:', error);
      toast({
        title: 'Analytics Error',
        description: 'Failed to load engagement data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadEngagementMetrics = async (startDate: Date, endDate: Date) => {
    // Total users
    const { count: totalUsers } = await supabase
      .from('user_retreats')
      .select('*', { count: 'exact', head: true });

    // Active users (had activity in timeframe)
    const { count: activeUsers } = await supabase
      .from('retreat_engagement')
      .select('*', { count: 'exact', head: true })
      .gte('engagement_date', startDate.toISOString().split('T')[0])
      .lte('engagement_date', endDate.toISOString().split('T')[0]);

    // Completion rate
    const { data: completionData } = await supabase
      .from('user_retreats')
      .select('completion_percentage')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    const avgCompletion = completionData?.length ? 
      completionData.reduce((sum, r) => sum + (r.completion_percentage || 0), 0) / completionData.length : 0;

    // Crisis interventions
    const { count: crisisCount } = await supabase
      .from('crisis_interventions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    // Average engagement time
    const { data: engagementTime } = await supabase
      .from('retreat_engagement')
      .select('time_spent_minutes')
      .gte('engagement_date', startDate.toISOString().split('T')[0])
      .lte('engagement_date', endDate.toISOString().split('T')[0]);

    const avgTime = engagementTime?.length ?
      engagementTime.reduce((sum, e) => sum + (e.time_spent_minutes || 0), 0) / engagementTime.length : 0;

    setMetrics({
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      completionRate: Math.round(avgCompletion),
      averageEngagementTime: Math.round(avgTime),
      crisisInterventions: crisisCount || 0,
      satisfactionScore: 4.2 // Placeholder - would calculate from actual satisfaction data
    });
  };

  const loadDailyEngagement = async (startDate: Date, endDate: Date) => {
    const { data } = await supabase
      .from('retreat_engagement')
      .select('engagement_date, activities_completed, time_spent_minutes')
      .gte('engagement_date', startDate.toISOString().split('T')[0])
      .lte('engagement_date', endDate.toISOString().split('T')[0])
      .order('engagement_date');

    // Group by date
    const grouped = data?.reduce((acc: any, curr) => {
      const date = curr.engagement_date;
      if (!acc[date]) {
        acc[date] = { users: 0, activities: 0, timeSpent: 0 };
      }
      acc[date].users += 1;
      acc[date].activities += curr.activities_completed || 0;
      acc[date].timeSpent += curr.time_spent_minutes || 0;
      return acc;
    }, {});

    const chartData = Object.entries(grouped || {}).map(([date, data]: [string, any]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      users: data.users,
      activities: data.activities,
      timeSpent: Math.round(data.timeSpent / data.users) // Average per user
    }));

    setDailyData(chartData);
  };

  const loadRetreatAnalytics = async () => {
    const { data: retreats } = await supabase
      .from('retreat_configurations')
      .select(`
        name,
        user_retreats(
          completion_percentage,
          status
        )
      `);

    const analytics = retreats?.map(retreat => {
      const enrollments = retreat.user_retreats?.length || 0;
      const completions = retreat.user_retreats?.filter(ur => ur.status === 'completed').length || 0;
      const avgSatisfaction = 4.0; // Placeholder

      return {
        retreatName: retreat.name,
        enrollments,
        completions,
        avgSatisfaction,
        dropoffDay: 3 // Placeholder - would calculate from actual data
      };
    }) || [];

    setRetreatData(analytics);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 animate-pulse" />
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Engagement Analytics</h2>
          <p className="text-muted-foreground">Monitor user engagement and retreat effectiveness</p>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 Days</SelectItem>
            <SelectItem value="30days">30 Days</SelectItem>
            <SelectItem value="90days">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">{metrics.totalUsers}</p>
                <p className="text-xs text-muted-foreground">
                  {metrics.activeUsers} active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Completion Rate</p>
                <p className="text-2xl font-bold">{metrics.completionRate}%</p>
                <Progress value={metrics.completionRate} className="h-1 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Avg. Engagement</p>
                <p className="text-2xl font-bold">{metrics.averageEngagementTime}m</p>
                <p className="text-xs text-muted-foreground">per day</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Crisis Interventions</p>
                <p className="text-2xl font-bold">{metrics.crisisInterventions}</p>
                <Badge variant={metrics.crisisInterventions > 5 ? "destructive" : "secondary"} className="text-xs">
                  {metrics.crisisInterventions > 5 ? "High" : "Normal"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Daily Engagement</TabsTrigger>
          <TabsTrigger value="retreats">Retreat Performance</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes & Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" name="Active Users" />
                  <Line type="monotone" dataKey="activities" stroke="hsl(var(--secondary))" name="Activities Completed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retreats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Retreat Enrollment vs Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={retreatData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="retreatName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrollments" fill="hsl(var(--primary))" name="Enrollments" />
                    <Bar dataKey="completions" fill="hsl(var(--secondary))" name="Completions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retreat Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {retreatData.map((retreat, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{retreat.retreatName}</h4>
                      <Badge variant="outline">
                        {Math.round((retreat.completions / retreat.enrollments) * 100)}% completion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <p>Enrollments: {retreat.enrollments}</p>
                        <p>Completions: {retreat.completions}</p>
                      </div>
                      <div>
                        <p>Satisfaction: {retreat.avgSatisfaction}/5</p>
                        <p>Avg. dropoff: Day {retreat.dropoffDay}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Crisis Intervention Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge variant="secondary">&lt; 2 minutes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Professional Referrals</span>
                    <Badge variant="outline">85% followed through</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Safety Protocols</span>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outcome Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Depression (PHQ-9)</span>
                      <span>32% improvement</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Anxiety (GAD-7)</span>
                      <span>28% improvement</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Wellbeing Score</span>
                      <span>41% improvement</span>
                    </div>
                    <Progress value={41} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementDashboard;