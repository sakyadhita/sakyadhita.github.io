import { Component, type ReactNode, type ReactElement } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactElement
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="
              rounded-lg border border-brand-red/30 bg-brand-red/10 p-6
              text-center
            "
          >
            <h2 className="mb-2 text-xl font-bold text-brand-red">Something went wrong</h2>
            <p className="text-gray-700">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className="
                mt-4 rounded-sm bg-brand-orange px-4 py-2 text-white
                hover:bg-brand-dark-orange
              "
            >
              Reload Page
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
