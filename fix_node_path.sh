#!/bin/bash
# Quick fix script to ensure ARM64 Node.js is used

# Source the updated .zshrc
source ~/.zshrc

# Verify Node.js architecture
echo "Checking Node.js installation..."
NODE_PATH=$(which node)
NODE_ARCH=$(node -p "process.arch" 2>/dev/null)

if [ "$NODE_ARCH" = "arm64" ]; then
    echo "✅ Node.js is ARM64: $NODE_PATH"
    echo "✅ Architecture: $NODE_ARCH"
    echo ""
    echo "You can now run: npm run dev"
else
    echo "❌ Node.js is not ARM64! Current: $NODE_ARCH"
    echo "Path: $NODE_PATH"
    echo ""
    echo "Try restarting your terminal or running: source ~/.zshrc"
fi

