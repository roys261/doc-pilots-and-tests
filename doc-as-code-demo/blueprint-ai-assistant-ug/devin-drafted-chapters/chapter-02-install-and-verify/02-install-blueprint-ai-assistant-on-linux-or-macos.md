---
title: "Install and verify"
chapter: 2
topic: "Install Blueprint AI Assistant  on Linux or macOS"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "8-8"
---

# Install Blueprint AI Assistant  on Linux or macOS

Complete the following steps to install and configure the tool in your Linux or macOS environment.
Prerequisites
Ensure that you have met all pre-requisites before beginnging installation.
Steps

1. Extract the archive.
unzip dap-*.zip cd dap-*

2. Run the installer.
./install.sh
This installs the binary to ~/.local/bin and adds the directory to your PATH.

3. Configure your environment.
bpa setup
> **NOTE:** Ensure that ~/.local/bin  is in your PATH before running the above input.
.
