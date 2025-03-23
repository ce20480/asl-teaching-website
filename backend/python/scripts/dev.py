import uvicorn
import signal
import sys
import socket

def is_port_in_use(port: int) -> bool:
    """Check if port is already in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            # Try to bind to the port
            s.bind(('127.0.0.1', port))
            return False
        except socket.error:
            return True

def main():
    """Development server entry point"""
    PORT = 8000
    
    # Check if port is already in use
    if is_port_in_use(PORT):
        print(f"\nPort {PORT} is already in use!")
        print("Please stop any running servers and try again.")
        sys.exit(1)
    
    print(f"\nStarting FastAPI server on port {PORT} with auto-reload enabled...")
    
    try:
        uvicorn.run(
            "src.main:app",
            host="127.0.0.1",
            port=PORT,
            reload=True,  # Enable auto-reload for development
            reload_dirs=["src"],  # Only watch the src directory
            workers=1,  # Use single worker to avoid port conflicts
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\nShutting down server gracefully...")
        sys.exit(0)
    except Exception as e:
        print(f"\nError starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, lambda s, f: sys.exit(0))
    signal.signal(signal.SIGTERM, lambda s, f: sys.exit(0))
    main()