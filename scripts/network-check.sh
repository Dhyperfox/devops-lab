

#!/usr/bin/env bash

set -euo pipefail
echo "Network Diagnostics"
echo "======================="
echo ""
echo "Ip Adresses:"
ip -br addr
echo ""
echo "Default route:"
ip route
echo""
echo "Internal connectivity:"
if ping -c 1 -w 3 1.1.1.1 > /dev/null 2>&1; then
	echo "internet connection OK"
else
	echo "internet connection: Failed"
fi

echo""
echo "DNS resolution:" 
if getent hosts google.com > /dev/null 2>&1; then
	echo "DNS resolution: OK"
else
	echo"DNS resolution: failed"
fi

echo ""
echo "Listening ports:"
ss -tulpn
