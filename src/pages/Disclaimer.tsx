import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Phone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h1 className="text-4xl font-bold">Medical & Professional Disclaimer</h1>
        </div>
        <p className="text-muted-foreground">Last Updated: October 2, 2025</p>
      </div>

      <Alert variant="destructive" className="mb-6">
        <Phone className="h-4 w-4" />
        <AlertTitle>In Case of Emergency</AlertTitle>
        <AlertDescription>
          If you are experiencing a mental health crisis or emergency, please contact:
          <div className="mt-2 space-y-1 font-semibold">
            <p>• Emergency Services: 911</p>
            <p>• National Suicide Prevention Lifeline: 988</p>
            <p>• Crisis Text Line: Text HOME to 741741</p>
          </div>
        </AlertDescription>
      </Alert>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6 pr-4">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">NOT Medical or Mental Health Treatment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold text-lg">
                THIS SERVICE DOES NOT PROVIDE MEDICAL ADVICE, MENTAL HEALTH TREATMENT, THERAPY, OR CRISIS INTERVENTION.
              </p>
              
              <div className="space-y-3">
                <p>The Healing Retreat Platform is a <strong>self-guided wellness and educational resource</strong> only. It is:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>NOT</strong> a substitute for professional medical or mental health care</li>
                  <li><strong>NOT</strong> therapy, counseling, or psychotherapy</li>
                  <li><strong>NOT</strong> intended to diagnose, treat, cure, or prevent any disease or mental health condition</li>
                  <li><strong>NOT</strong> a crisis intervention service</li>
                  <li><strong>NOT</strong> monitored by mental health professionals 24/7</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What This Service Is</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our platform provides evidence-based wellness programs designed to support your mental health and personal growth 
                journey through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Educational content about mental health and wellness</li>
                <li>Guided self-care activities and practices</li>
                <li>Mindfulness and meditation exercises</li>
                <li>Journaling and reflection prompts</li>
                <li>Progress tracking and goal setting</li>
                <li>Resources for professional help when needed</li>
              </ul>
              <p className="mt-4 font-semibold">
                This is a complementary wellness tool that works best alongside professional care, not as a replacement for it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Consultation Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">
                Always consult with qualified healthcare professionals before:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Starting any new mental health or wellness program</li>
                <li>Making changes to your current treatment plan</li>
                <li>Stopping or reducing medication</li>
                <li>Making major life decisions based on program insights</li>
              </ul>
              
              <p className="mt-4">
                If you are currently in treatment or taking medication, please discuss this program with your healthcare provider 
                to ensure it is appropriate for your situation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trauma-Informed Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While our programs are designed with trauma-informed principles, working with traumatic material can be triggering. 
                We strongly recommend:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Working with a qualified trauma therapist alongside this program</li>
                <li>Ensuring you have adequate support systems in place</li>
                <li>Stopping any activity that feels overwhelming</li>
                <li>Seeking professional help if trauma symptoms intensify</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screening Tools Are Informational Only</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The screening tools and assessments provided (PHQ-9, GAD-7, etc.) are:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>For educational and awareness purposes only</li>
                <li>NOT diagnostic tools</li>
                <li>NOT interpreted by qualified professionals</li>
                <li>NOT a substitute for professional assessment</li>
              </ul>
              
              <p className="mt-4 font-semibold">
                Only qualified mental health professionals can diagnose mental health conditions. If screening results indicate 
                concern, please consult a healthcare provider.
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">When to Seek Immediate Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold">Seek immediate professional help if you experience:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Thoughts of harming yourself or others</li>
                <li>Suicidal thoughts or plans</li>
                <li>Severe anxiety or panic attacks</li>
                <li>Hallucinations or delusions</li>
                <li>Inability to care for yourself</li>
                <li>Substance abuse requiring intervention</li>
                <li>Any mental health crisis</li>
              </ul>

              <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
                <p className="font-bold mb-2">Emergency Resources:</p>
                <div className="space-y-1">
                  <p>• <strong>Emergency Services:</strong> 911</p>
                  <p>• <strong>National Suicide Prevention Lifeline:</strong> 988 or 1-800-273-8255</p>
                  <p>• <strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                  <p>• <strong>SAMHSA National Helpline:</strong> 1-800-662-4357 (24/7 treatment referral)</p>
                  <p>• <strong>Veterans Crisis Line:</strong> 988, then press 1</p>
                  <p>• <strong>Disaster Distress Helpline:</strong> 1-800-985-5990</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contraindications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">
                This service may not be appropriate for individuals with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Active psychosis</li>
                <li>Severe dissociative disorders without professional support</li>
                <li>Active suicidal ideation requiring immediate intervention</li>
                <li>Recent severe trauma requiring intensive professional care</li>
                <li>Severe substance withdrawal requiring medical supervision</li>
                <li>Eating disorders requiring specialized treatment</li>
              </ul>
              
              <p className="mt-4">
                Each retreat program lists specific contraindications. Please review them carefully before beginning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>No Professional-Client Relationship</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Use of this Service does not create a doctor-patient, therapist-client, or any other professional-client relationship. 
                Our staff and content creators are not your healthcare providers unless explicitly stated and agreed upon in writing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence-Based But Not Guaranteed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While our programs are based on evidence-based therapeutic approaches (CBT, ACT, DBT, MBSR, etc.), we make no 
                guarantees about:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Specific outcomes or results</li>
                <li>Symptom reduction or improvement</li>
                <li>Recovery timelines</li>
                <li>Prevention of relapse or crisis</li>
              </ul>
              
              <p className="mt-4">
                Individual results vary. What works for one person may not work for another.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To the fullest extent permitted by law, Healing Journey and its staff are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any harm resulting from use or inability to use the Service</li>
                <li>Decisions made based on program content</li>
                <li>Worsening of symptoms or new symptoms</li>
                <li>Self-harm or harm to others</li>
                <li>Reliance on automated assessments or recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Responsibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>By using this Service, you acknowledge and agree that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are responsible for your own mental health and wellbeing</li>
                <li>You will seek professional help when needed</li>
                <li>You will be honest in assessments and self-reporting</li>
                <li>You will stop any activity that feels harmful or overwhelming</li>
                <li>You understand the limitations of self-guided programs</li>
                <li>You will not rely solely on this Service for mental health support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referrals & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                When our screening tools or your responses indicate you may benefit from professional care, we provide referrals 
                and resources. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We do not endorse specific providers</li>
                <li>We are not responsible for the quality of care you receive</li>
                <li>Referrals are informational only</li>
                <li>You are responsible for verifying provider credentials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We reserve the right to update this disclaimer at any time. Continued use of the Service after changes constitutes 
                acceptance of the updated disclaimer.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For questions about this disclaimer, contact legal@healingjourney.com</p>
            </CardContent>
          </Card>

          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Final Reminder</AlertTitle>
            <AlertDescription>
              This is a wellness and educational platform, not medical treatment. Always consult qualified healthcare 
              professionals for medical advice, diagnosis, and treatment. In emergencies, call 911 or contact the 
              National Suicide Prevention Lifeline at 988.
            </AlertDescription>
          </Alert>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Disclaimer;
