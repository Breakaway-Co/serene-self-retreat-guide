import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Phone, 
  ExternalLink,
  Shield,
  Heart,
  Brain
} from 'lucide-react';
import { ScreeningSession } from '@/types/screening';

interface ScreeningResultsProps {
  session: ScreeningSession;
  onProceed: () => void;
  onRetake?: () => void;
}

export function ScreeningResults({ session, onProceed, onRetake }: ScreeningResultsProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'severe': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'moderate': return <Info className="h-5 w-5 text-yellow-600" />;
      case 'high': case 'severe': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getToolIcon = (toolId: string) => {
    switch (toolId) {
      case 'AUDIT-C': case 'DAST-10': return <Shield className="h-5 w-5" />;
      case 'GAD-7': case 'PHQ-9': return <Brain className="h-5 w-5" />;
      case 'WHO-5': return <Heart className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  // Crisis resources for immediate help
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 crisis support'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: '24/7 text-based crisis support'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information service'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              session.crisisFlags ? 'bg-red-100' : 
              session.overallRiskLevel === 'high' ? 'bg-orange-100' :
              session.overallRiskLevel === 'moderate' ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              {session.crisisFlags ? <AlertTriangle className="h-6 w-6 text-red-600" /> :
               session.overallRiskLevel === 'high' ? <AlertTriangle className="h-6 w-6 text-orange-600" /> :
               session.overallRiskLevel === 'moderate' ? <Info className="h-6 w-6 text-yellow-600" /> :
               <CheckCircle className="h-6 w-6 text-green-600" />}
            </div>
            Assessment Complete
          </CardTitle>
          <p className="text-muted-foreground">
            Your wellbeing assessment has been completed. Here are your results and personalized recommendations.
          </p>
        </CardHeader>
      </Card>

      {/* Crisis Alert */}
      {session.crisisFlags && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="space-y-3">
              <p className="font-medium">Immediate Support Recommended</p>
              <p>Your responses indicate you may be experiencing distress that requires immediate attention. 
                 Please consider reaching out for support right away.</p>
              
              <div className="space-y-2">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                    <div>
                      <p className="font-medium text-red-900">{resource.name}</p>
                      <p className="text-sm text-red-700">{resource.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-200">
                      <Phone className="h-4 w-4 mr-1" />
                      {resource.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Individual Tool Results */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Assessment Results</h3>
        {session.tools.map((result) => (
          <Card key={result.toolId} className={`border-l-4 ${getLevelColor(result.level)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getToolIcon(result.toolId)}
                  <div>
                    <CardTitle className="text-base">{result.toolId}</CardTitle>
                    <p className="text-sm text-muted-foreground">{result.interpretation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {getLevelIcon(result.level)}
                    <Badge variant="outline" className={getLevelColor(result.level)}>
                      {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Score: {result.score}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            {result.recommendations.length > 0 && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recommendations:</h4>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Overall Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Retreat Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session.overallRiskLevel === 'high' || session.crisisFlags ? (
            <div className="space-y-3">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Based on your assessment, we recommend seeking professional support before beginning a retreat program.
                  Your wellbeing is our priority, and we want to ensure you receive the most appropriate care.
                </AlertDescription>
              </Alert>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Recommended Next Steps:</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Consult with a healthcare provider or mental health professional</li>
                  <li>• Consider professional therapy or counseling</li>
                  <li>• Once stabilized, our retreat programs can provide valuable support</li>
                  <li>• We're here when you're ready for additional wellness support</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Based on your assessment, you're a good candidate for our Addictions Recovery Program. 
                  This comprehensive retreat is specifically designed to support your healing journey.
                </AlertDescription>
              </Alert>
              
              <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-medium text-primary mb-2">Addictions Recovery Program Features:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Evidence-based addiction recovery techniques</li>
                  <li>• Craving management and urge surfing practices</li>
                  <li>• Nutritional rehabilitation for healing</li>
                  <li>• Trauma-informed somatic practices</li>
                  <li>• Relapse prevention planning</li>
                  <li>• 21-day comprehensive program</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        {onRetake && (
          <Button variant="outline" onClick={onRetake}>
            Retake Assessment
          </Button>
        )}
        
        {!session.crisisFlags && session.overallRiskLevel !== 'high' ? (
          <Button onClick={onProceed} className="bg-primary hover:bg-primary/90">
            Start Recovery Program
          </Button>
        ) : (
          <Button variant="outline" onClick={onProceed}>
            Find Professional Support
          </Button>
        )}
      </div>

      {/* Disclaimer */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only and is not a substitute 
          for professional medical advice, diagnosis, or treatment. If you are experiencing a medical emergency or are 
          in active withdrawal, please seek immediate medical attention.
        </AlertDescription>
      </Alert>
    </div>
  );
}