import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Users, Shield, TestTube, Eye, EyeOff } from 'lucide-react';

interface TestAccount {
  email: string;
  password: string;
  role: string;
  description: string;
  success: boolean;
  userId?: string;
}

const TestAccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<TestAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const { toast } = useToast();

  const createTestAccounts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-test-accounts');
      
      if (error) throw error;
      
      if (data.success) {
        setAccounts(data.accounts);
        toast({
          title: 'Test Accounts Created',
          description: 'All test accounts have been successfully created and configured.'
        });
      } else {
        throw new Error(data.error || 'Failed to create test accounts');
      }
    } catch (error: any) {
      console.error('Error creating test accounts:', error);
      toast({
        title: 'Creation Failed',
        description: error.message || 'Failed to create test accounts',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied!',
        description: `${type} copied to clipboard`
      });
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'destructive' : 'secondary';
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <Shield className="h-4 w-4" /> : <Users className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TestTube className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Test Account Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Generate pre-configured test accounts with different access levels to test all retreat features
          </p>
        </div>

        {/* Create Accounts Button */}
        {accounts.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Generate Test Accounts
              </CardTitle>
              <CardDescription>
                Create a complete set of test accounts with admin and user access levels,
                including sample retreat enrollments and intake assessments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={createTestAccounts} 
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Creating Accounts...' : 'Create Test Accounts'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Account List */}
        {accounts.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Test Account Credentials</h2>
              <Button
                variant="outline"
                onClick={() => setShowPasswords(!showPasswords)}
                className="flex items-center gap-2"
              >
                {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPasswords ? 'Hide' : 'Show'} Passwords
              </Button>
            </div>

            <Alert>
              <TestTube className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> These are test accounts for development and QA purposes only. 
                Use these credentials to test different user roles and retreat functionalities.
                All test users have completed intake assessments and are enrolled in specific retreats.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {accounts.map((account, index) => (
                <Card key={index} className={`${account.success ? '' : 'border-destructive'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getRoleIcon(account.role)}
                        {account.email}
                      </CardTitle>
                      <Badge variant={getRoleBadgeVariant(account.role)}>
                        {account.role.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>
                      {account.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {account.success ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 p-2 bg-muted rounded text-sm">
                                {account.email}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(account.email, 'Email')}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 p-2 bg-muted rounded text-sm">
                                {showPasswords ? account.password : '••••••••••••'}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(account.password, 'Password')}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {account.role === 'admin' && (
                          <Alert>
                            <Shield className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Admin Access:</strong> This account has full access to retreat management, 
                              user data, analytics, content library, and system administration features.
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        {account.role === 'user' && (
                          <Alert>
                            <Users className="h-4 w-4" />
                            <AlertDescription>
                              <strong>User Access:</strong> This account is enrolled in a specific retreat program 
                              with completed intake assessment and personalized recommendations.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ) : (
                      <Alert variant="destructive">
                        <AlertDescription>
                          Failed to create this account. Please check the logs for details.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <strong>Admin Accounts:</strong> Full platform access with retreat management, user oversight, and analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <strong>User Accounts:</strong> Completed intake assessments with personalized retreat enrollments
                  </li>
                  <li className="flex items-center gap-2">
                    <TestTube className="h-4 w-4 text-primary" />
                    <strong>Test Data:</strong> Sample progress tracking, wellness scores, and retreat activity completion
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setAccounts([])}
                className="flex-1"
              >
                Reset & Create New Accounts
              </Button>
              <Button 
                onClick={createTestAccounts} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Recreating...' : 'Recreate Accounts'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestAccountsPage;