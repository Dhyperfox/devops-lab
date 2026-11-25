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
echo "Avarage Load:"
top -bn1 | grep "Cpu(s)" | awk '{u+=$2; s+=$4} END {print "Average CPU usage:", u/NR + s/NR, "%"}'

echo "Top 5 process by cpu usage:"
ps aux --sort=-%cpu | head -n 6
echo ""

echo "Top 5 process by memory usage:"
ps aux --sort=-%mem | head -n 6
echo ""
echo "Memory:"
free -m | awk '/Mem:/ {total=$2; used=$3; free=$4; pct=(used/total)*100; printf "Total: %d MB | Used: %d MB (%.1f%%) | Free: %d MB (%.1f%%)\n", total, used, pct, free, (free/total)*100}'
echo ""
echo "Disk usage:"
df -m -x tmpfs -x devtmpfs | awk 'NR>1 {total+=$2; used+=$3; free+=$4} END {printf "Total: %d MB | Used: %d MB (%.1f%%) | Free: %d MB (%.1f%%)\n", total, used, (used/total)*100, free, (free/total)*100}'
echo ""
echo "Network:"
ip -br addr

echo ""
echo "======================"
echo "	Report Completed"
echo "======================"
