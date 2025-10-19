import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground">Last Updated: October 2, 2025</p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6 pr-4">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By accessing or using the Healing Retreat Platform ("Service"), you agree to be bound by these Terms of Service 
                ("Terms"). If you do not agree to these Terms, please do not use our Service.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and Healing Journey regarding your use of the Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our Service provides digital, self-guided healing retreat programs focused on mental health, wellness, and personal growth. 
                The Service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Evidence-based retreat programs for various mental health concerns</li>
                <li>Guided activities, meditations, and therapeutic exercises</li>
                <li>Progress tracking and personalized recommendations</li>
                <li>Audio guidance and educational content</li>
                <li>Crisis resources and professional referrals</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NOT A Substitute for Professional Care</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold text-lg text-destructive">IMPORTANT DISCLAIMER:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>This Service is <strong>NOT therapy</strong> and <strong>NOT a substitute for professional mental health care</strong></li>
                <li>We do not provide crisis intervention services</li>
                <li>Our staff are not mental health professionals unless otherwise stated</li>
                <li>This is a self-guided wellness program, not medical treatment</li>
                <li>If you are experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately</li>
              </ul>
              <p className="mt-4 font-semibold">
                By using this Service, you acknowledge that it is for educational and wellness purposes only and should not replace 
                professional medical or mental health advice, diagnosis, or treatment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">To use this Service, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using the Service under applicable law</li>
                <li>Provide accurate and complete information during registration</li>
              </ul>
              <p className="mt-4">
                The Parent-Child Grief Retreat requires adult supervision for minors under 18.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>By using the Service, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Complete intake assessments honestly and accurately</li>
                <li>Use the Service for personal, non-commercial purposes only</li>
                <li>Keep your account credentials secure</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not share your account with others</li>
                <li>Not misuse or attempt to hack the Service</li>
                <li>Seek professional help if you experience a mental health crisis</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contraindications & Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">This Service may not be appropriate if you are experiencing:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Active suicidal ideation or plans</li>
                <li>Active psychosis or severe dissociation</li>
                <li>Recent severe trauma requiring immediate professional care</li>
                <li>Severe substance withdrawal requiring medical supervision</li>
                <li>Any condition requiring immediate medical or psychiatric intervention</li>
              </ul>
              <p className="mt-4 font-semibold text-destructive">
                If any of these apply to you, please seek immediate professional help. Contact emergency services (911 in the US) 
                or the National Suicide Prevention Lifeline: 988.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos, 
                audio files, and software, are the exclusive property of Healing Journey and are protected by copyright, 
                trademark, and other intellectual property laws.
              </p>
              <p>You may not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reproduce, distribute, or create derivative works from our content</li>
                <li>Use our content for commercial purposes without permission</li>
                <li>Remove copyright or proprietary notices</li>
                <li>Reverse engineer or decompile the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User-Generated Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You retain ownership of your personal reflections, journal entries, and other content you create using the Service. 
                However, by submitting content, you grant us a limited license to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Store and display your content to you</li>
                <li>Use anonymized, aggregated data for research and service improvement</li>
                <li>Process your content to provide personalized recommendations</li>
              </ul>
              <p className="mt-4">
                We will never share your identifiable personal content publicly or sell it to third parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment & Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                [Update this section based on your pricing model]
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All fees are stated in USD and are subject to change with notice</li>
                <li>Subscriptions automatically renew unless canceled</li>
                <li>Refunds are provided in accordance with our Refund Policy</li>
                <li>You are responsible for all charges incurred under your account</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cancellation & Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>By You:</strong> You may cancel your account at any time through account settings or by contacting us.
              </p>
              <p>
                <strong>By Us:</strong> We reserve the right to suspend or terminate your access if you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent or illegal activity</li>
                <li>Abuse or harass our staff or other users</li>
                <li>Pose a security risk to the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The Service is provided "AS IS" without warranties of any kind</li>
                <li>We do not guarantee specific health outcomes or results</li>
                <li>We are not liable for any damages arising from use of the Service</li>
                <li>We are not liable for interruptions, errors, or data loss</li>
                <li>Our total liability shall not exceed the amount you paid for the Service in the past 12 months</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indemnification</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                You agree to indemnify and hold harmless Healing Journey, its affiliates, and staff from any claims, damages, 
                or expenses arising from your use of the Service, violation of these Terms, or violation of any rights of another party.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law & Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These Terms are governed by the laws of the jurisdiction where Serene Self Retreat Guide operates.
              </p>
              <p>
                Any disputes will be resolved through binding arbitration in accordance with applicable arbitration rules, 
                except where prohibited by law. You may have rights in your jurisdiction that cannot be waived.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of material changes via email 
                or through the Service. Your continued use after changes constitutes acceptance of the modified Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">For questions about these Terms, please contact:</p>
              <div className="space-y-1">
                <p><strong>Email:</strong> legal@sereneselfretreat.com</p>
                <p><strong>Support:</strong> support@sereneselfretreat.com</p>
                <p><strong>Website:</strong> www.sereneselfretreat.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Emergency Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
                <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                <p><strong>Emergency Services:</strong> 911</p>
                <p><strong>SAMHSA National Helpline:</strong> 1-800-662-4357</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TermsOfService;
