#!/bin/bash

# Script to reinstall essential tools for Apple Silicon (M4 Mac)
# Run this script: bash reinstall_for_apple_silicon.sh

set -e

echo "🍎 Reinstalling tools for Apple Silicon (M4 Mac)..."
echo ""

# Check if we're on Apple Silicon
ARCH=$(uname -m)
if [ "$ARCH" != "arm64" ]; then
    echo "⚠️  Warning: This script is for Apple Silicon (arm64). Your architecture is: $ARCH"
    exit 1
fi

echo "✅ Confirmed: Running on Apple Silicon (arm64)"
echo ""

# Step 1: Install Homebrew for Apple Silicon
echo "📦 Step 1: Installing Homebrew for Apple Silicon..."
if [ -f "/opt/homebrew/bin/brew" ]; then
    echo "   Homebrew already installed at /opt/homebrew"
else
    echo "   Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for this session
    if [ -f "/opt/homebrew/bin/brew" ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
        echo "   ✅ Homebrew installed successfully"
    else
        echo "   ⚠️  Homebrew installation may need manual setup"
        echo "   Run: eval \"\$(/opt/homebrew/bin/brew shellenv)\""
    fi
fi

# Ensure Homebrew is in PATH
if ! command -v brew &> /dev/null; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

echo ""

# Step 2: Install Node.js (LTS version)
echo "📦 Step 2: Installing Node.js for Apple Silicon..."
if command -v node &> /dev/null && node -p "process.arch" | grep -q "arm64"; then
    echo "   Node.js (ARM64) already installed: $(node --version)"
else
    echo "   Installing Node.js..."
    brew install node@20
    echo "   ✅ Node.js installed"
fi

echo ""

# Step 3: Install Python 3
echo "📦 Step 3: Installing Python 3 for Apple Silicon..."
if command -v python3 &> /dev/null && python3 -c "import platform; print(platform.machine())" 2>/dev/null | grep -q "arm64"; then
    echo "   Python 3 (ARM64) already installed: $(python3 --version)"
else
    echo "   Installing Python 3..."
    brew install python@3.12
    echo "   ✅ Python 3 installed"
fi

echo ""

# Step 4: Verify installations
echo "🔍 Step 4: Verifying installations..."
echo ""

if command -v node &> /dev/null; then
    NODE_ARCH=$(node -p "process.arch")
    echo "   Node.js: $(node --version) ($NODE_ARCH)"
    echo "   npm: $(npm --version)"
    if [ "$NODE_ARCH" != "arm64" ]; then
        echo "   ⚠️  Warning: Node.js is not ARM64!"
    fi
else
    echo "   ❌ Node.js not found"
fi

echo ""

if command -v python3 &> /dev/null; then
    PYTHON_ARCH=$(python3 -c "import platform; print(platform.machine())" 2>/dev/null || echo "unknown")
    echo "   Python: $(python3 --version) ($PYTHON_ARCH)"
    if [ "$PYTHON_ARCH" != "arm64" ]; then
        echo "   ⚠️  Warning: Python is not ARM64!"
    fi
else
    echo "   ❌ Python 3 not found"
fi

echo ""

# Step 5: Update PATH instructions
echo "📝 Step 5: PATH Configuration"
echo ""
echo "   Add these lines to your ~/.zshrc or ~/.bash_profile:"
echo ""
echo "   # Homebrew for Apple Silicon"
echo "   eval \"\$(/opt/homebrew/bin/brew shellenv)\""
echo ""
echo "   # Prioritize Apple Silicon binaries"
echo "   export PATH=\"/opt/homebrew/bin:/opt/homebrew/sbin:\$PATH\""
echo ""

# Step 6: Clean up old Intel versions (optional)
echo "🧹 Step 6: Cleanup (Optional)"
echo ""
echo "   You may want to remove old Intel-based installations:"
echo "   - /usr/local/bin (Intel Homebrew location)"
echo "   - /Library/Frameworks/Python.framework (Intel Python)"
echo "   - Old Node.js installations"
echo ""
echo "   ⚠️  Only do this after verifying everything works!"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add Homebrew to your PATH (see Step 5 above)"
echo "2. Restart your terminal or run: source ~/.zshrc"
echo "3. Navigate to your project and run: npm install (in client/)"
echo "4. Set up Python virtual environment: python3 -m venv venv (in server/)"

