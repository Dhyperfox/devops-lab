#!/usr/bin/env bash

set -euo pipefail

echo "=========================="
echo "	Server Health Report"
echo "=========================="

echo ""
echo "Date:"
date

echo ""
echo "Hostname:"
hostname

echo ""
echo "Operating system:"
cat /etc/os-release |grep PRETTY_NAME

echo ""
echo "Kernel:"
uname -r
echo""
eecho "CPU:"
lscpu | grep -E "^CPU\(s\):"

echo ""
echo "Memory:"
free -n

echo ""
echo "Disk:"
ip -br addr

echo ""
echo "======================"
echo "	Report Completed"
echo "======================"
