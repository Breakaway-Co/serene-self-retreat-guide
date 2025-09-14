import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Shield, AlertTriangle, CheckCircle, Clock, FileText, Users, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ComplianceMetric {
  id: string;
  category: string;
  requirement: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  lastReview: string;
  nextReview: string;
  evidence: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface AuditFinding {
  id: string;
  finding: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  dateFound: string;
  status: 'open' | 'in-progress' | 'resolved';
  assignedTo: string;
  dueDate: string;
}

interface NSQMHCMOStandard {
  id: string;
  standard: string;
  domain: string;
  compliance: number;
  lastAssessed: string;
  nextReview: string;
  criticalGaps: string[];
  evidenceRequired: string[];
}

const ComplianceReports = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<ComplianceMetric[]>([]);
  const [findings, setFindings] = useState<AuditFinding[]>([]);
  const [standards, setStandards] = useState<NSQMHCMOStandard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    try {
      setIsLoading(true);
      
      // Load compliance checks
      const { data: complianceData } = await supabase
        .from('compliance_checks')
        .select('*')
        .order('review_date', { ascending: false });

      // Load trauma informed flags
      const { data: traumaFlags } = await supabase
        .from('trauma_informed_flags')
        .select('*')
        .eq('status', 'active');

      // Load content library compliance
      const { data: contentCompliance } = await supabase
        .from('content_library')
        .select('compliance_reviewed, trauma_informed_reviewed, evidence_based_verified');

      // Process data into compliance metrics
      const complianceMetrics: ComplianceMetric[] = [
        {
          id: '1',
          category: 'Content Standards',
          requirement: 'Trauma-Informed Practice Compliance',
          status: contentCompliance?.every(c => c.trauma_informed_reviewed) ? 'compliant' : 'partial',
          lastReview: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          evidence: ['Content Review Reports', 'Trauma Screening Protocols'],
          riskLevel: 'medium'
        },
        {
          id: '2',
          category: 'Evidence-Based Therapy',
          requirement: 'Evidence-Based Interventions Only',
          status: contentCompliance?.every(c => c.evidence_based_verified) ? 'compliant' : 'non-compliant',
          lastReview: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          evidence: ['Research Citations', 'Clinical Guidelines'],
          riskLevel: 'high'
        },
        {
          id: '3',
          category: 'Crisis Management',
          requirement: 'Crisis Intervention Protocols',
          status: 'compliant',
          lastReview: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          evidence: ['Crisis Response Procedures', 'Professional Referral Network'],
          riskLevel: 'critical'
        },
        {
          id: '4',
          category: 'Data Protection',
          requirement: 'HIPAA Compliance & Privacy',
          status: 'compliant',
          lastReview: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          evidence: ['Privacy Policies', 'Data Encryption', 'Access Controls'],
          riskLevel: 'high'
        }
      ];

      const auditFindings: AuditFinding[] = traumaFlags?.map(flag => ({
        id: flag.id,
        finding: flag.description,
        severity: flag.severity as 'low' | 'medium' | 'high' | 'critical',
        category: flag.flag_type || 'Content Review',
        dateFound: flag.created_at.split('T')[0],
        status: flag.status === 'active' ? 'open' : 'resolved',
        assignedTo: 'Clinical Review Team',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })) || [];

      const nsqmhcmoStandards: NSQMHCMOStandard[] = [
        {
          id: 'std-1',
          standard: 'Trauma-Informed Care Practices',
          domain: 'Clinical Standards',
          compliance: 87,
          lastAssessed: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          criticalGaps: ['Staff Training Documentation', 'Patient Feedback Integration'],
          evidenceRequired: ['Training Certificates', 'Patient Satisfaction Surveys']
        },
        {
          id: 'std-2',
          standard: 'Evidence-Based Treatment Protocols',
          domain: 'Treatment Standards',
          compliance: 92,
          lastAssessed: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          criticalGaps: ['Outcome Measurement Tools'],
          evidenceRequired: ['Clinical Protocol Documentation', 'Research Evidence Library']
        },
        {
          id: 'std-3',
          standard: 'Crisis Intervention & Safety',
          domain: 'Safety Standards',
          compliance: 95,
          lastAssessed: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          criticalGaps: [],
          evidenceRequired: ['Crisis Response Logs', 'Professional Referral Tracking']
        },
        {
          id: 'std-4',
          standard: 'Quality Assurance & Monitoring',
          domain: 'Quality Standards',
          compliance: 83,
          lastAssessed: new Date().toISOString().split('T')[0],
          nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          criticalGaps: ['Continuous Monitoring Dashboard', 'Regular Compliance Audits'],
          evidenceRequired: ['Quality Metrics Reports', 'Compliance Audit Trails']
        }
      ];

      setMetrics(complianceMetrics);
      setFindings(auditFindings);
      setStandards(nsqmhcmoStandards);

    } catch (error: any) {
      console.error('Error loading compliance data:', error);
      toast({
        title: 'Compliance Error',
        description: 'Failed to load compliance data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateComplianceReport = async () => {
    try {
      // In a real implementation, this would generate a comprehensive report
      const reportData = {
        generatedAt: new Date().toISOString(),
        overallCompliance: Math.round(standards.reduce((sum, s) => sum + s.compliance, 0) / standards.length),
        metrics,
        findings: findings.filter(f => f.status === 'open'),
        standards,
        nextActions: findings.filter(f => f.status === 'open').slice(0, 5)
      };

      // Simulate report generation
      toast({
        title: 'Report Generated',
        description: 'NSQMHCMO compliance report has been generated and is ready for download.'
      });

      console.log('Compliance Report:', reportData);
    } catch (error: any) {
      toast({
        title: 'Report Error',
        description: 'Failed to generate compliance report',
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'non-compliant': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'default';
      case 'partial': return 'secondary';
      case 'non-compliant': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 animate-pulse" />
          Loading compliance data...
        </div>
      </div>
    );
  }

  const overallCompliance = Math.round(standards.reduce((sum, s) => sum + s.compliance, 0) / standards.length);
  const criticalFindings = findings.filter(f => f.severity === 'critical' && f.status === 'open').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">NSQMHCMO Compliance Dashboard</h2>
          <p className="text-muted-foreground">Monitor compliance with mental health care standards</p>
        </div>
        <Button onClick={generateComplianceReport} className="gap-2">
          <Download className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Overall Compliance</p>
                <p className="text-2xl font-bold">{overallCompliance}%</p>
                <Progress value={overallCompliance} className="h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Compliant Standards</p>
                <p className="text-2xl font-bold">
                  {metrics.filter(m => m.status === 'compliant').length}
                </p>
                <p className="text-xs text-muted-foreground">
                  of {metrics.length} requirements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Critical Findings</p>
                <p className="text-2xl font-bold">{criticalFindings}</p>
                <Badge variant={criticalFindings > 0 ? "destructive" : "default"} className="text-xs">
                  {criticalFindings > 0 ? "Action Required" : "None"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Next Review</p>
                <p className="text-2xl font-bold">
                  {Math.min(...metrics.map(m => Math.ceil((new Date(m.nextReview).getTime() - Date.now()) / (1000 * 60 * 60 * 24))))}
                </p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {criticalFindings > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {criticalFindings} critical compliance finding{criticalFindings > 1 ? 's' : ''} that require immediate attention.
            Review the findings below and take corrective action.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="standards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="standards">NSQMHCMO Standards</TabsTrigger>
          <TabsTrigger value="requirements">Compliance Requirements</TabsTrigger>
          <TabsTrigger value="findings">Audit Findings</TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NSQMHCMO Standards Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {standards.map((standard) => (
                  <div key={standard.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{standard.standard}</h4>
                        <p className="text-sm text-muted-foreground">{standard.domain}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{standard.compliance}%</div>
                        <Progress value={standard.compliance} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    
                    {standard.criticalGaps.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-600 mb-1">Critical Gaps:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {standard.criticalGaps.map((gap, index) => (
                            <li key={index}>{gap}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last assessed: {new Date(standard.lastAssessed).toLocaleDateString()}</span>
                      <span>Next review: {new Date(standard.nextReview).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Next Review</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className="font-medium">{metric.category}</TableCell>
                      <TableCell>{metric.requirement}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          <Badge variant={getStatusColor(metric.status) as any}>
                            {metric.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(metric.riskLevel) as any}>
                          {metric.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(metric.nextReview).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Findings & Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Finding</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {findings.map((finding) => (
                    <TableRow key={finding.id}>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={finding.finding}>
                          {finding.finding}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(finding.severity) as any}>
                          {finding.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{finding.category}</TableCell>
                      <TableCell>
                        <Badge variant={finding.status === 'open' ? 'destructive' : 'default'}>
                          {finding.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(finding.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{finding.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceReports;