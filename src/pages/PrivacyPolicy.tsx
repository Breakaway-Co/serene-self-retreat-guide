import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground">Last Updated: October 2, 2025</p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6 pr-4">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to our Healing Retreat Platform. We are committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our digital healing retreat services.
              </p>
              <p>
                We understand the sensitive nature of mental health and wellness information, and we take our responsibility 
                to protect your privacy very seriously.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address</li>
                  <li>Name (if provided)</li>
                  <li>Password (encrypted)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Health & Wellness Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Intake assessment responses</li>
                  <li>Screening tool results (PHQ-9, GAD-7, etc.)</li>
                  <li>Retreat progress and activity completion</li>
                  <li>Daily check-in responses</li>
                  <li>Activity reflections and journal entries</li>
                  <li>Risk assessment data</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Pages visited and features used</li>
                  <li>Time spent on activities</li>
                  <li>Device and browser information</li>
                  <li>IP address</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and personalize retreat programs based on your needs</li>
                <li>To track your progress and provide appropriate support</li>
                <li>To identify crisis situations and provide appropriate referrals</li>
                <li>To generate personalized audio guidance and recommendations</li>
                <li>To improve our services and develop new features</li>
                <li>To communicate with you about your retreat experience</li>
                <li>To ensure platform security and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We implement robust security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure cloud storage with access controls</li>
                <li>Row-level security (RLS) to isolate user data</li>
                <li>Regular security audits and updates</li>
                <li>Limited staff access on a need-to-know basis</li>
                <li>Encrypted data transmission (SSL/TLS)</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                While we strive to protect your information, no method of transmission over the internet is 100% secure. 
                We cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">We do NOT sell your personal information to third parties.</p>
              
              <p>We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Crisis Situations:</strong> If we identify imminent risk of harm, we may contact emergency services or mental health professionals</li>
                <li><strong>Service Providers:</strong> With trusted third-party services (audio generation, hosting) under strict confidentiality agreements</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or legal process</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (with continued protection of your data)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Request a portable copy of your data</li>
                <li><strong>Withdraw Consent:</strong> Opt out of non-essential data collection</li>
                <li><strong>Object:</strong> Object to certain data processing activities</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@healingjourney.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
              <p className="mt-4">
                When you delete your account, we will delete or anonymize your personal information within 30 days, 
                except where we are required to retain it for legal purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our services are designed for adults 18 years and older. The Parent-Child Grief Retreat is intended 
                for parents to complete with their children under parental supervision. We do not knowingly collect 
                personal information from children under 13 without parental consent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by 
                email or through a prominent notice on our platform. Your continued use of our services after changes 
                constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-1">
                <p><strong>Email:</strong> privacy@healingjourney.com</p>
                <p><strong>Address:</strong> [Your Business Address]</p>
                <p><strong>Data Protection Officer:</strong> dpo@healingjourney.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PrivacyPolicy;
