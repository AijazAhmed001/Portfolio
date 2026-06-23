import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio Error Boundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: '#0F172A' }}
        >
          <div className="text-center px-6 max-w-md">
            {/* Animated error icon */}
            <div className="text-7xl mb-6 animate-bounce">⚠️</div>
            <h1 className="text-3xl font-display font-bold text-white mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
              An unexpected error occurred. Please refresh the page — your data is safe.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                🔄 Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-outline"
              >
                Try Again
              </button>
            </div>
            {/* Error details in dev mode */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-slate-500 text-sm cursor-pointer hover:text-slate-300 transition-colors">
                  Developer details
                </summary>
                <pre className="mt-3 p-4 rounded-xl text-xs text-red-400 overflow-auto max-h-40"
                  style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
