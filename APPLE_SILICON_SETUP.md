# Apple Silicon (M4 Mac) Setup Guide

This guide will help you reinstall Node.js, Python, and other essentials for your M4 Mac.

## Current Status
- ✅ System: Apple Silicon (arm64) confirmed
- ❌ Node.js: Intel version (needs reinstall)
- ❌ Python: Intel version (needs reinstall)
- ❌ Homebrew: Intel version (needs reinstall)

## Quick Setup (Recommended)

### Step 1: Install Homebrew for Apple Silicon

Run this command in your terminal:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This will install Homebrew to `/opt/homebrew` (Apple Silicon location).

After installation, add Homebrew to your PATH by running:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

Or if you use bash:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile
source ~/.bash_profile
```

### Step 2: Install Node.js

```bash
brew install node@20
```

Verify installation:
```bash
node --version
node -p "process.arch"  # Should output: arm64
npm --version
```

### Step 3: Install Python 3

```bash
brew install python@3.12
```

Verify installation:
```bash
python3 --version
python3 -c "import platform; print(platform.machine())"  # Should output: arm64
```

### Step 4: Update Your PATH

Make sure Apple Silicon binaries are prioritized. Add to `~/.zshrc` (or `~/.bash_profile`):

```bash
# Homebrew for Apple Silicon
eval "$(/opt/homebrew/bin/brew shellenv)"

# Prioritize Apple Silicon binaries
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
```

Then restart your terminal or run:
```bash
source ~/.zshrc
```

### Step 5: Reinstall Project Dependencies

#### Frontend (Node.js)
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

#### Backend (Python)
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Alternative: Use the Automated Script

You can also run the provided script:
```bash
bash reinstall_for_apple_silicon.sh
```

Note: The script will guide you through the process, but Homebrew installation may require manual password entry.

## Cleanup (Optional - Do After Everything Works)

Once you've verified everything works, you can optionally remove old Intel-based installations:

```bash
# Remove Intel Homebrew (if you're sure you don't need it)
# sudo rm -rf /usr/local/Homebrew
# sudo rm -rf /usr/local/bin/brew

# Remove Intel Python (if you're sure you don't need it)
# sudo rm -rf /Library/Frameworks/Python.framework
```

⚠️ **Warning**: Only remove old installations after confirming everything works with the new Apple Silicon versions!

## Verification Checklist

After setup, verify everything:

- [ ] `uname -m` outputs `arm64`
- [ ] `node -p "process.arch"` outputs `arm64`
- [ ] `python3 -c "import platform; print(platform.machine())"` outputs `arm64`
- [ ] `which node` points to `/opt/homebrew/bin/node`
- [ ] `which python3` points to `/opt/homebrew/bin/python3`
- [ ] `npm install` works in `client/` directory
- [ ] `pip install -r requirements.txt` works in `server/` directory

## Troubleshooting

### "Bad CPU type in executable" errors
- This means you're trying to run an Intel binary on Apple Silicon
- Make sure your PATH prioritizes `/opt/homebrew/bin` over `/usr/local/bin`

### Homebrew not found after installation
- Run: `eval "$(/opt/homebrew/bin/brew shellenv)"`
- Add it to your shell config file (`.zshrc` or `.bash_profile`)

### Wrong architecture detected
- Check: `which node` and `which python3` - they should point to `/opt/homebrew/bin/`
- Your PATH should have `/opt/homebrew/bin` before `/usr/local/bin`

### Node modules need rebuilding
- After switching architectures, you may need to rebuild native modules:
  ```bash
  cd client
  rm -rf node_modules
  npm install
  ```

