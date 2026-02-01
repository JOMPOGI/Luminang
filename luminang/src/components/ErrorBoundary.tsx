'use client';

import { Component, ReactNode } from 'react';
import { Button } from './ui';
// Replaced logger with standard console for cleanup


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-900 border-2 border-red-600/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">⚠️</span>
            </div>
            <h1 className="text-amber-400 font-serif text-3xl mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-300 mb-6">
              The spirits have encountered an error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-amber-500 cursor-pointer text-sm mb-2">
                  Technical Details
                </summary>
                <pre className="text-xs text-gray-400 bg-black p-3 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
            >
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}