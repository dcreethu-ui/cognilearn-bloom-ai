import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI component:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-rose-100">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-6">
              An unexpected error occurred in this view. Your session and saved data are safe.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left bg-slate-100 text-slate-700 p-3 rounded-lg overflow-x-auto mb-6">
                {this.state.error.message}
              </pre>
            )}
            <Button onClick={this.handleReset} leftIcon={<RefreshCw className="w-4 h-4" />}>
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
