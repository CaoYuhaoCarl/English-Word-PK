import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary-900 mb-2">出错了</h1>
            <p className="text-primary-600 mb-6">
              {this.state.error?.message || '应用程序遇到了一个错误'}
            </p>
            <Button onClick={this.handleRetry}>重试</Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}