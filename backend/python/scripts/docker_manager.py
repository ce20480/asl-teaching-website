import os
import subprocess
from dotenv import load_dotenv
from pathlib import Path
import sys

class AkaveLinkManager:
    def __init__(self):
        # Load environment variables
        env_path = Path(__file__).parent.parent / '.env'
        load_dotenv(env_path)
        
        self.node_address = os.getenv('NODE_ADDRESS', 'connect.akave.ai:5500')
        self.private_key = os.getenv('WEB3_PRIVATE_KEY')
        self.container_name = 'akavelink'
        self.image = 'akave/akavelink:latest'
        # Use port 4000 to avoid conflicts with Express (3000) and FastAPI (8000)
        self.port = 4000

    def is_container_running(self) -> bool:
        """Check if AkaveLink container is running"""
        try:
            result = subprocess.run(
                ['docker', 'ps', '--filter', f'name={self.container_name}', '--format', '{{.Names}}'],
                capture_output=True,
                text=True
            )
            return self.container_name in result.stdout
        except subprocess.CalledProcessError as e:
            print(f"Error checking container status: {e}")
            return False

    def start(self) -> None:
        """Start AkaveLink container"""
        if not self.private_key:
            raise ValueError("WEB3_PRIVATE_KEY not set in environment")

        if self.is_container_running():
            print("AkaveLink container is already running")
            return

        try:
            # Pull latest image
            subprocess.run(['docker', 'pull', self.image], check=True)
            
            # Start container
            cmd = [
                'docker', 'run',
                '-d',
                '--name', self.container_name,
                '-p', f'{self.port}:3000',
                '-e', f'NODE_ADDRESS={self.node_address}',
                '-e', f'PRIVATE_KEY={self.private_key}',
                self.image
            ]
            
            subprocess.run(cmd, check=True)
            print(f"AkaveLink container started on port {self.port}")
            
        except subprocess.CalledProcessError as e:
            print(f"Error starting container: {e}")
            raise

    def stop(self) -> None:
        """Stop and remove AkaveLink container"""
        try:
            if self.is_container_running():
                subprocess.run(['docker', 'stop', self.container_name], check=True)
                subprocess.run(['docker', 'rm', self.container_name], check=True)
                print("AkaveLink container stopped and removed")
        except subprocess.CalledProcessError as e:
            print(f"Error stopping container: {e}")
            raise

def main():
    """Entry point for Poetry script"""
    manager = AkaveLinkManager()
    
    # Get command from command line arguments
    if len(sys.argv) < 2:
        print("Usage: poetry run akave [start|stop|restart]")
        sys.exit(1)
        
    command = sys.argv[1]
    
    if command not in ['start', 'stop', 'restart']:
        print("Invalid command. Use: start, stop, or restart")
        sys.exit(1)
    
    try:
        if command == 'start':
            manager.start()
        elif command == 'stop':
            manager.stop()
        else:  # restart
            manager.stop()
            manager.start()
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
